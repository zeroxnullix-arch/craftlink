from flask import Flask, request, jsonify
from flask_cors import CORS
from ai_engine import find_answer
from utils import load_memory, save_memory

app = Flask(__name__)
CORS(app)

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
        answer = "ممكن توضح أكتر عشان أساعدك؟ 👌"

    return jsonify({
        "reply": answer,
        "confidence": confidence
    })

if __name__ == "__main__":
    app.run(debug=True)