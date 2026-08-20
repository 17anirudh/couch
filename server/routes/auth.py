from fastapi import APIRouter
from fastapi.responses import JSONResponse

from dto.auth import RegisterRequest
from services.register import RegisterService

auth_router = APIRouter(prefix="/auth")

@auth_router.post("/register", response_class=JSONResponse)
async def register(req: RegisterRequest) -> JSONResponse:
    res = RegisterService(req)
    return await res.create_user()
