from fastapi import APIRouter
import logging

logger = logging.getLogger(__name__)

router = APIRouter(prefix="/test", tags=["Test"])

@router.get("/hello")
async def hello():
    logger.info("Hello endpoint called")
    return {"message": "Hello from test route"}