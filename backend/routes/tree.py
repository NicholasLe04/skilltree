import backend.database.actions as Actions
from fastapi import APIRouter
from fastapi.responses import HTTPException, JSONResponse
import backend.models.TreeModels as TreeModels

router = APIRouter(
    prefix="/tree"
)


@router.get("/{skilltree_id}")
def get_tree(skilltree_id):
    try:
        tree = Actions.get_tree_by_id(skilltree_id)
        return JSONResponse(content=tree)
    except:
        return HTTPException(status_code=500, detail="SQL Error")


@router.post("/")
def create_tree(treeObj: TreeModels.CreateTreeRequest):
    try:
        Actions.create_tree(treeObj)
        return JSONResponse(content={"tree": treeObj})
    except:
        raise HTTPException(status_code=500, detail="SQL Error")


@router.delete("/")
def delete_tree(tree_id):
    try:
        Actions.delete_tree_by_id(tree_id)
        return JSONResponse(content={"treeid": tree_id})
    except:
        raise HTTPException(status_code=500, detail="SQL Error")
