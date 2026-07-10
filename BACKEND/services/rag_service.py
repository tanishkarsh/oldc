from rag import search
from llm.prompt import build_prompt
from llm.ollama_client import generate_response


def ask_question(question):

    # Retrieve relevant chunks
    results = search(question, limit=5)

    # Build prompt
    prompt = build_prompt(question, results)

    # Generate response using Ollama
    answer = generate_response(prompt)

    # Extract top unique source documents
    sources = []

    for point in results:
        source = point.payload.get("source", "Unknown")

        if source not in sources:
            sources.append(source)

        # Show only the top 3 unique sources
        if len(sources) == 3:
            break

    return {
        "reply": answer,
        "sources": sources
    }