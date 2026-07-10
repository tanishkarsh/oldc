import os

from dotenv import load_dotenv
from groq import Groq

# ==========================================
# Load Environment Variables
# ==========================================

load_dotenv()

# ==========================================
# Create Groq Client
# ==========================================

client = Groq(
    api_key=os.getenv("GROQ_API_KEY")
)

# ==========================================
# Model
# ==========================================

MODEL_NAME = "llama-3.3-70b-versatile"

# ==========================================
# Generate Response
# ==========================================

def generate_response(prompt):

    completion = client.chat.completions.create(
        model=MODEL_NAME,
        messages=[
            {
                "role": "user",
                "content": prompt
            }
        ],
        temperature=0.2,
    )

    return completion.choices[0].message.content