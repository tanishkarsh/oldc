def build_prompt(question, results):

    context = ""

    for point in results:

        context += f"""
Source:
{point.payload["source"]}

Content:
{point.payload["text"]}

----------------------------------------
"""

    prompt = f"""
You are the official DU SOL AI Assistant.

Answer the user's question using ONLY the context below.

Rules:

1. Use only the provided context.

2. If the answer is partially available, answer using the available information.

3. If multiple chunks contain related information, combine them into one complete answer.

4. Do NOT invent information.


5. Only reply with:

"I could not find this information in the official DU SOL documents."

if the provided context contains no relevant information.

If the question asks for fees, reproduce the fee table from the context exactly.

Do not summarize numerical values.

If multiple chunks contain the answer, combine them.

If the answer is not present, reply:
"I could not find this information in the official DU SOL documents."

Context:

{context}

Question:

{question}

Answer:
"""

    return prompt