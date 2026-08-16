from fastapi import APIRouter
import logging

logger = logging.getLogger(__name__)

router = APIRouter(prefix="/auth", tags=["Auth"])

@router.post("/register")
async def register():
    logger.info("User registered successfully")
    return {"message": "User registered successfully"}