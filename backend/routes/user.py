import database.actions as Actions
from fastapi import APIRouter, HTTPException, Response
from fastapi.responses import JSONResponse
import models.UserModels as UserModels

router = APIRouter(
    prefix="/user"
)


@router.get("/{username}")
def get_user(username: str):
    user_data = Actions.get_user_by_username(username)
    return user_data


@router.post("/")
def create_user(userObj: UserModels.CreateUserRequest):
    try:
        Actions.create_user(userObj)
        return userObj
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@router.delete("/{username}")
def delete_user(username: str):
    try:
        Actions.delete_user_by_username(username)
        return JSONResponse(content={"username": username})
    except:
        raise HTTPException(status_code=500, detail="SQL Error")
