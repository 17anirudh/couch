import os

from dotenv import load_dotenv

load_dotenv()

CORS_ORIGINS = [os.getenv("LOCAL_FRONTEND_URL") or "", os.getenv("CROSS_FRONTEND_URL") or ""]
SECRET_KEY = os.getenv("JWT_SECRET")
ALGORITHM: str = "HS256"
ACCESS_TOKEN_EXPIRE_SECONDS: int = 3600
REFRESH_TOKEN_EXPIRE_SECONDS: int = 2592000
