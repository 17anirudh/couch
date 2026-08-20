from typing import Annotated

from pydantic import BaseModel, EmailStr, StringConstraints


class RegisterRequest(BaseModel):
    password: Annotated[str, StringConstraints(min_length=10, max_length=255)]
    username: Annotated[str, StringConstraints(min_length=3, max_length=50)]
    email: Annotated[str, EmailStr]

class LoginRequest(BaseModel):
    identifier: Annotated[str, StringConstraints(min_length=10, max_length=255)]
    password: Annotated[str, StringConstraints(min_length=10, max_length=255)]
