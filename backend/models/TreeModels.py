from pydantic import BaseModel


class CreateTreeRequest(BaseModel):
    username: str
    skill: str
    description: str
    tags: list[str]
    tree: dict


class GetTreeResponse(BaseModel):
    skilltree_id: str
    username: str
    skill: str
    description: str
    tags: list[str]
    tree: dict
