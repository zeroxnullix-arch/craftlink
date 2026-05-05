from flask import Flask, request, jsonify
from flask_cors import CORS
from ai_engine import find_answer
from utils import load_memory, save_memory

from sentence_transformers import SentenceTransformer, util

app = Flask(__name__)
CORS(app)

# =========================
# 🤖 CHAT
# =========================
@app.route("/chat", methods=["POST"])
def chat():
    data = request.json
    user_id = data.get("user_id", "guest")
    message = data.get("message")
    memory = load_memory()
    if user_id not in memory:
        memory[user_id] = []
    memory[user_id].append(message)
    save_memory(memory)
    answer, confidence = find_answer(message)
    if not answer:
        answer = "ممكن توضح أكتر؟ 👌"
    return jsonify({
        "reply": answer,
        "confidence": confidence
    })
# =========================
# 🧠 MODEL
# =========================
model = SentenceTransformer("paraphrase-multilingual-MiniLM-L12-v2")
course_embeddings = {}
category_embeddings = {}
def embed(text):
    return model.encode(text, convert_to_tensor=True, normalize_embeddings=True)
# =========================
# 📦 COURSE EMBEDDING
# =========================
def get_course_embedding(course):
    cid = str(course.get("_id"))
    if cid not in course_embeddings:
        text = " ".join([
            course.get("title", ""),
            course.get("description", ""),
            course.get("category", "")
        ])
        course_embeddings[cid] = embed(text)
    return course_embeddings[cid]
# =========================
# 📦 CATEGORY EMBEDDING (FIXED)
# =========================
def get_category_embedding(category):
    if category not in category_embeddings:
        # أهم تحسين هنا: category مش مجرد كلمة
        category_embeddings[category] = embed(f"course category: {category}")
    return category_embeddings[category]
# =========================
# 🔍 SEARCH ENGINE (HIGH ACCURACY)
# =========================
@app.route("/search", methods=["POST"])
def search():
    data = request.json
    query = data.get("query", "")
    courses = data.get("courses", [])
    if not query.strip():
        return jsonify(courses[:10])
    query_emb = embed(query)
    scored = []
    for course in courses:
        course_emb = get_course_embedding(course)
        # 🧠 semantic match
        semantic = util.cos_sim(query_emb, course_emb).item()
        # 🧠 category guidance (light weight)
        cat = course.get("category", "Other")
        cat_emb = get_category_embedding(cat)
        category_score = util.cos_sim(query_emb, cat_emb).item()
        # =========================
        # 🎯 NORMALIZED FINAL SCORE
        # =========================
        final_score = (semantic * 0.85) + (category_score * 0.15)
        scored.append({
            "course": course,
            "score": final_score
        })
    # =========================
    # 🔥 SORT
    # =========================
    scored.sort(key=lambda x: x["score"], reverse=True)
    # =========================
    # 🎯 SMART FILTER (IMPORTANT FIX)
    # =========================
    if scored:
        top = scored[0]["score"]
        threshold = max(top * 0.75, 0.50)
        filtered = [x for x in scored if x["score"] >= threshold]
    else:
        filtered = []
    # fallback
    if not filtered:
        filtered = scored[:5]
    return jsonify(filtered[:10])
# =========================
# 🚀 RUN
# =========================
if __name__ == "__main__":
    app.run(debug=True, port=5000)