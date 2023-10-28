class CreateTreeRequest:

    def __init__(self, username, skill, description, tree) -> None:
        self.username = username
        self.skill = skill
        self.description = description
        self.tree = tree

    def toDict(self) -> dict:
        return({
            "username": self.username,
            "skill": self.skill,
            "description": self.description,
            "tree": self.tree
        })
    
class GetTreeResponse:

    def __init__(self, username, skill, description, tree) -> None:
        self.username = username
        self.skill = skill
        self.description = description
        self.tree = tree
