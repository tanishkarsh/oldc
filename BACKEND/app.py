from flask import Flask, request, jsonify
from flask_cors import CORS
import os
import re

from services.rag_service import ask_question

# ==========================================
# Flask App
# ==========================================

app = Flask(__name__)
CORS(app)

# ==========================================
# Home Route
# ==========================================

@app.route("/")
def home():
    return "DU SOL AI Assistant API is running with Groq."

# ==========================================
# Health Check
# ==========================================

@app.route("/health")
def health():
    return jsonify({
        "status": "ok"
    })

# ==========================================
# Chat API
# ==========================================

@app.route("/api/chat", methods=["POST"])
def chat():

    data = request.get_json()

    user_message = data.get("message", "").strip()

    if not user_message:
        return jsonify({
            "error": "Message cannot be empty."
        }), 400

    try:

        # Ask RAG Service
        result = ask_question(user_message)

        # Clean reply
        reply = result["reply"]

        # Remove markdown code fences
        reply = reply.replace("```", "")

        # Convert plain sol.du.ac.in into clickable URL
        reply = re.sub(
            r'(?<!https://)(?<!http://)\b(sol\.du\.ac\.in)\b',
            r'https://\1',
            reply,
            flags=re.IGNORECASE
        )

        # Remove extra blank lines
        while "\n\n\n" in reply:
            reply = reply.replace("\n\n\n", "\n\n")

        result["reply"] = reply

        return jsonify(result)

    except Exception as e:

        print("ERROR:", e)

        return jsonify({
            "error": str(e)
        }), 500


# ==========================================
# Run Flask
# ==========================================

if __name__ == "__main__":
    app.run(
        host="0.0.0.0",
        port=int(os.environ.get("PORT", 5000)),
        debug=True
    )