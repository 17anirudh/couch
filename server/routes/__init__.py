from fastapi import APIRouter
from .auth import register_router
from .test import test_router

router = APIRouter()
router.include_router(register_router)
router.include_router(test_router)