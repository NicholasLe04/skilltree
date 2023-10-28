import database.actions as Actions
from fastapi import APIRouter, HTTPException
from fastapi.responses import JSONResponse
from models.TreeModels import CreateTreeRequest

router = APIRouter(
    prefix="/tree"
)


@router.get("/{skilltree_id}")
def get_tree(skilltree_id):
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


@router.delete("/{skilltree_id}")
def delete_tree(tree_id):
    try:
        Actions.delete_tree_by_id(tree_id)
        return JSONResponse(content={"treeid": tree_id})
    except:
        raise HTTPException(status_code=500, detail="SQL Error")