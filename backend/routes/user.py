import backend.database.actions as Actions
from fastapi import APIRouter
from fastapi.responses import HTTPException, JSONResponse
import backend.models.UserModels as UserModels

router = APIRouter(
    prefix="/user"
)


@router.get("/{username}")
def get_user(username: str):
    user_data = Actions.get_user_by_username(username)
    del user_data["hashed_password"]
    return JSONResponse(content=user_data)


@router.post("/")
def create_user(userObj: UserModels.CreateUserRequest):
    try:
        Actions.create_user(userObj)
        return JSONResponse(content={"user": userObj})
    except:
        raise HTTPException(status_code=500, detail="SQL Error")


@router.delete("/")
def delete_user(username: str):
    try:
        Actions.delete_user_by_username(username)
        return JSONResponse(content={"username": username})
    except:
        raise HTTPException(status_code=500, detail="SQL Error")
