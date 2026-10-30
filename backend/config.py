import os
from pathlib import Path
from dotenv import load_dotenv

# Automatically load .env from backend directory or project root
_BACKEND_DIR = Path(__file__).resolve().parent
_ROOT_DIR = _BACKEND_DIR.parent
if (_BACKEND_DIR / ".env").exists():
    load_dotenv(_BACKEND_DIR / ".env")
elif (_ROOT_DIR / ".env").exists():
    load_dotenv(_ROOT_DIR / ".env")
else:
    load_dotenv()

class Config:
    _origins = os.getenv("CORS_ORIGINS")
    if _origins:
        CORS_ORIGINS = [o.strip() for o in _origins.split(",") if o.strip()]
    else:
        CORS_ORIGINS = [
            "http://localhost:5173","http://127.0.0.1:5173",
            "http://localhost:5174","http://127.0.0.1:5174",
        ]

    SQLALCHEMY_DATABASE_URI = os.getenv("DATABASE_URL", "sqlite:///agrivision.db")
    MAX_CONTENT_LENGTH = int(os.getenv("MAX_CONTENT_LENGTH", 8 * 1024 * 1024))
