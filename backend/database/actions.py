from backend.database.connection import get_connection

from backend.models.UserModels import CreateUserRequest, GetUserResponse
from backend.models.TreeModels import CreateTreeRequest, GetTreeResponse

connection = get_connection()

def create_user(user:CreateUserRequest):
    with connection.cursor() as cursor:
        cursor.execute(
            f'''
            INSERT INTO user (username, user_password, verified, user_desc)
            VALUES ({user.username}, {user.password}, {user.verified}, {user.description});
            '''
        )

def delete_user_by_username(username:str):
    with connection.cursor() as cursor:
        cursor.execute(
            f'''
            DELETE FROM user WHERE username='{username}';
            '''
        )

def get_user_by_username(username:str) -> GetUserResponse:
    with connection.cursor() as cursor:
        cursor.execute(
            f'''
            SELECT * FROM user WHERE username='{username}';
            '''
        )

        username, password, verified, description = cursor.fetchall()
        return (GetUserResponse(username, password, verified, description))


def create_tree(tree:CreateTreeRequest):
    with connection.cursor() as cursor:
        cursor.execute(
            f'''
            INSERT INTO skilltree (username, skill, description, tree)
            VALUES ({tree.username}, {tree.skill}, {tree.description}, {tree.tree});
            '''
        )

def delete_tree_by_id(skilltree_id:int):
    with connection.cursor() as cursor:
        cursor.execute(
            f'''
            DELETE FROM skilltree WHERE skilltree_id='{skilltree_id}';
            '''
        )

def get_tree_by_id(skilltree_id) -> GetTreeResponse:
    with connection.cursor() as cursor:
        cursor.execute(
            f'''
            SELECT * FROM skilltree WHERE skilltree_id='{skilltree_id}';
            '''
        )

        _, username, skill, description, tree = cursor.fetchall()
        return (GetTreeResponse(username, skill, description, tree))


