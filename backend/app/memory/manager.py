import redis
from qdrant_client import QdrantClient
from typing import List, Optional
from ..core.config import settings

class MemoryManager:
    def __init__(self):
        self.redis = redis.from_url(settings.REDIS_URL, decode_responses=True)
        self.qdrant = QdrantClient(url=settings.QDRANT_URL)
        self.long_term_collection = "long_term_memory"
        self._ensure_qdrant_collection()

    def _ensure_qdrant_collection(self):
        try:
            collections = self.qdrant.get_collections().collections
            exists = any(c.name == self.long_term_collection for c in collections)
            if not exists:
                # Basic initialization for student projects
                self.qdrant.create_collection(
                    collection_name=self.long_term_collection,
                    vectors_config={"size": 1536, "distance": "Cosine"} # Assuming default embeddings size
                )
        except Exception:
            print("Warning: Could not connect to Qdrant. Long-term memory might be disabled.")

    def store_short_term(self, key: str, value: str, expire: int = 3600):
        """Store in Redis"""
        self.redis.set(key, value, ex=expire)

    def get_short_term(self, key: str) -> Optional[str]:
        """Get from Redis"""
        return self.redis.get(key)

    def store_long_term(self, text: str, metadata: dict):
        """Store in Qdrant (Placeholder for vector embedding logic)"""
        # In a real project, we would embed the text here
        # For the student version, we'll keep it simple
        pass

    def search_long_term(self, query: str, limit: int = 5) -> List[dict]:
        """Search in Qdrant (Placeholder)"""
        return []

memory_manager = MemoryManager()
