from datetime import UTC, datetime, timedelta

import jwt
from fastapi import status
from fastapi.responses import JSONResponse
from pwdlib import PasswordHash

from config.const import (
    ACCESS_TOKEN_EXPIRE_SECONDS,
    ALGORITHM,
    REFRESH_TOKEN_EXPIRE_SECONDS,
    SECRET_KEY,
)
from dto.auth import RegisterRequest

password_hash = PasswordHash.recommended()

class RegisterService:
    def __init__(self, content: RegisterRequest) -> None:
        self._content = content

    def __create_tokens(self, to_encode: dict, expires_delta: timedelta) -> str:
        payload = to_encode.copy()
        payload["exp"] = datetime.now(UTC) + expires_delta
        return jwt.encode(payload, key=SECRET_KEY, algorithm=ALGORITHM)

    async def create_user(self) -> JSONResponse:
        """Creates both access and refresh tokens for the given input"""
        # _password = password_hash.hash(content.password)
        jwt_claims = {
            "sub": self._content.username,
            "email": self._content.email
        }

        response = JSONResponse(
            content={"status": "success", "message": "User created successfully"},
            status_code=status.HTTP_201_CREATED,
        )
        response.set_cookie(
            key="access_token",
            value=self.__create_tokens(jwt_claims, timedelta(seconds=ACCESS_TOKEN_EXPIRE_SECONDS)),
            httponly=True,
            secure=True,
            samesite="lax",
            max_age=ACCESS_TOKEN_EXPIRE_SECONDS,
        )
        response.set_cookie(
            key="refresh_token",
            value=self.__create_tokens(jwt_claims, timedelta(seconds=REFRESH_TOKEN_EXPIRE_SECONDS)),
            httponly=True,
            secure=True,
            samesite="lax",
            max_age=REFRESH_TOKEN_EXPIRE_SECONDS,
        )
        return response
