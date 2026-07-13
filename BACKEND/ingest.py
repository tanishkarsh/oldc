import os
from dotenv import load_dotenv

from qdrant_client import QdrantClient
from qdrant_client.models import (
    PointStruct,
    VectorParams,
    Distance
)

from utils.pdf_loader import load_pdf
from utils.splitter import split_text
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
# Configuration
# ==========================================

COLLECTION_NAME = "du_sol"
DATA_FOLDER = "data"

# ==========================================
# Delete Old Collection (if exists)
# ==========================================

collections = client.get_collections().collections
collection_names = [c.name for c in collections]

if COLLECTION_NAME in collection_names:
    print(f"Deleting existing collection '{COLLECTION_NAME}'...")
    client.delete_collection(COLLECTION_NAME)

# ==========================================
# Create Fresh Collection
# ==========================================

client.create_collection(
    collection_name=COLLECTION_NAME,
    vectors_config=VectorParams(
        size=384,
        distance=Distance.COSINE
    )
)

print(f"✅ Fresh collection '{COLLECTION_NAME}' created!")

# ==========================================
# Read PDFs and Generate Embeddings
# ==========================================

points = []
point_id = 1

for filename in os.listdir(DATA_FOLDER):

    if not filename.lower().endswith(".pdf"):
        continue

    filepath = os.path.join(DATA_FOLDER, filename)

    print(f"\n📄 Reading {filename}...")

    text = load_pdf(filepath)

    chunks = split_text(text)

    print(f"Found {len(chunks)} chunks")

    for chunk in chunks:

        vector = get_embedding(chunk)

        points.append(
            PointStruct(
                id=point_id,
                vector=vector,
                payload={
                    "text": chunk,
                    "source": filename
                }
            )
        )

        point_id += 1

# ==========================================
# Upload to Qdrant
# ==========================================

print("\nUploading vectors to Qdrant Cloud...")

client.upsert(
    collection_name=COLLECTION_NAME,
    points=points,
    wait=True
)

print(f"\n✅ Successfully uploaded {len(points)} chunks!")