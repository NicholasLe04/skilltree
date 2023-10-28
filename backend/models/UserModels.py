from pydantic import BaseModel


class CreateUserRequest(BaseModel):
    username: str
    password: str
    verified: str
    description: str

class GetUserResponse(BaseModel):
    username: str
    password: str
    verified: bool
    description: str