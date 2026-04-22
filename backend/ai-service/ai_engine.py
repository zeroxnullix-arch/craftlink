import json
from difflib import get_close_matches

with open("knowledge_base.json", "r", encoding="utf-8") as f:
    KB = json.load(f)

def find_answer(message):
    questions = [item["question"] for item in KB]

    match = get_close_matches(message, questions, n=1, cutoff=0.4)

    if match:
        for item in KB:
            if item["question"] == match[0]:
                return item["answer"], 0.9

    return None, 0.0