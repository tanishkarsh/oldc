import os

from dotenv import load_dotenv
from qdrant_client import QdrantClient

from embed import get_embedding

# ==========================================
# Load Environment Variables
# ==========================================

load_dotenv()

# ==========================================
# Connect to Qdrant Cloud
# ==========================================

client = QdrantClient(
    url=os.getenv("QDRANT_URL"),
    api_key=os.getenv("QDRANT_API_KEY")
)

# ==========================================
# Collection Name
# ==========================================

COLLECTION_NAME = "du_sol"

# ==========================================
# Search Function
# ==========================================

def search(query, limit=3):

    # Create embedding for user query
    vector = get_embedding(query)

    # Search Qdrant
    results = client.query_points(
        collection_name=COLLECTION_NAME,
        query=vector,
        limit=limit
    )

    # Return top matching chunks
    return results.points