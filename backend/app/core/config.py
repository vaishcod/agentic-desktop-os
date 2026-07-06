import os
from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    PROJECT_NAME: str = "Antigravity AI OS"
    VERSION: str = "0.1.0"
    API_V1_STR: str = "/api/v1"
    
    # Database
    DATABASE_URL: str = os.getenv("DATABASE_URL", "postgresql://antigravity:password@localhost:5432/antigravity_db")
    REDIS_URL: str = os.getenv("REDIS_URL", "redis://localhost:6379")
    QDRANT_URL: str = os.getenv("QDRANT_URL", "http://localhost:6333")
    
    # LLM
    OLLAMA_BASE_URL: str = os.getenv("OLLAMA_BASE_URL", "http://localhost:11434")
    DEFAULT_MODEL: str = "llama3"

    class Config:
        case_sensitive = True

settings = Settings()
