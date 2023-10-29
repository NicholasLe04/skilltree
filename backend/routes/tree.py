import database.actions as Actions
from fastapi import APIRouter, HTTPException
from fastapi.responses import JSONResponse
from models.TreeModels import CreateTreeRequest

router = APIRouter(
    prefix="/tree"
)


@router.get("/id/{skilltree_id}")
def get_tree_id(skilltree_id):
    try:
        tree = Actions.get_tree_by_id(skilltree_id)
        return tree
    except:
        return HTTPException(status_code=500, detail="SQL Error")


@router.post("/")
def create_tree(treeObj: CreateTreeRequest):
    try:
        Actions.create_tree(treeObj)
        return treeObj
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
    
@router.put("/upvote/{skilltree_id}")
def upvote_tree(skilltree_id):
    try:
        Actions.upvote_tree(skilltree_id)
        return skilltree_id
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
    
@router.put("/downvote/{skilltree_id}")
def upvote_tree(skilltree_id):
    try:
        Actions.downvote_tree(skilltree_id)
        return skilltree_id
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@router.delete("/{skilltree_id}")
def delete_tree(tree_id):
    try:
        Actions.delete_tree_by_id(tree_id)
        return JSONResponse(content={"treeid": tree_id})
    except:
        raise HTTPException(status_code=500, detail="SQL Error")

@router.get("/skill/{skill}")
def get_tree_skill(skill):
    try:
        tree = Actions.get_tree_by_skill(skill)
        return tree
    except Exception as e:
        return HTTPException(status_code=500, detail=str(e))
    
@router.get("/user/{username}")
def get_tree_user(username):
    try:
        tree = Actions.get_tree_by_username(username)
        return tree
    except Exception as e:
        return HTTPException(status_code=500, detail=str(e))
    