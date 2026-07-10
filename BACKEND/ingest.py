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
    api_key=os.getenv("QDRANT_API_KEY"),
    check_compatibility=False
)

# ==========================================
# Configuration
# ==========================================

COLLECTION_NAME = "du_sol"

DATA_FOLDER = "data"

# ==========================================
# Create Collection (if it doesn't exist)
# ==========================================

collections = client.get_collections().collections

collection_names = [c.name for c in collections]

if COLLECTION_NAME not in collection_names:

    client.create_collection(
        collection_name=COLLECTION_NAME,
        vectors_config=VectorParams(
            size=384,
            distance=Distance.COSINE
        )
    )

    print("✅ Collection created successfully!")

else:

    print("✅ Collection already exists!")

# ==========================================
# Read PDFs
# ==========================================

points = []

point_id = 1

for filename in os.listdir(DATA_FOLDER):

    if not filename.endswith(".pdf"):
        continue

    filepath = os.path.join(DATA_FOLDER, filename)

    print(f"\nReading {filename}...")

    text = load_pdf(filepath)

    chunks = split_text(text)

    print(f"{len(chunks)} chunks found")

    # ======================================
    # Generate Embeddings
    # ======================================

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
    points=points
)

print(f"\n✅ Successfully uploaded {len(points)} chunks!")