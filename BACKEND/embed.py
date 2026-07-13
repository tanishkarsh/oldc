from fastembed import TextEmbedding

# Load embedding model once
embedding_model = TextEmbedding(
    model_name="BAAI/bge-small-en-v1.5"
)

def get_embedding(text):
    embedding = next(embedding_model.embed([text]))
    return embedding.tolist()