import json
from database.connection import get_connection

from models.UserModels import CreateUserRequest, GetUserResponse
from models.TreeModels import CreateTreeRequest, GetTreeResponse

connection = get_connection()


def create_user(user: CreateUserRequest):
    with connection.cursor() as cursor:
        cursor.execute(
            f'''
            INSERT INTO users(username, password, verified, description)
            VALUES ('{user.username}', '{user.password}', {user.verified}, '{user.description}');
            '''
        )


def delete_user_by_username(username: str):
    with connection.cursor() as cursor:
        cursor.execute(
            f'''
            DELETE FROM users WHERE username='{username}';
            '''
        )


def get_user_by_username(username: str) -> GetUserResponse:
    with connection.cursor() as cursor:
        cursor.execute(
            f'''
            SELECT * FROM users WHERE username='{username}';
            '''
        )

        username, password, verified, description = cursor.fetchall()[0]
        return (GetUserResponse(username=username, password=password, verified=verified, description=description))


def create_tree(tree: CreateTreeRequest):
    with connection.cursor() as cursor:
        tags_str = "ARRAY" + str(tree.tags)
        json_str = json.dumps(tree.tree).replace("\'", '\"')
        print(f'''
            INSERT INTO skilltree (username, skill, description, tags, tree)
            VALUES ('{tree.username}', '{tree.skill}', '{tree.description}', {tags_str}, '{json_str}') RETURNING skilltree_id;
            ''')
        cursor.execute(
            f'''
            INSERT INTO skilltree (username, skill, description, tags, tree)
            VALUES ('{tree.username}', '{tree.skill}', '{tree.description}', {tags_str}, '{json_str}') RETURNING skilltree_id;
            '''
        )
        print(f'Just inserted a skilltree with id = {cursor.fetchone()}')


def delete_tree_by_id(skilltree_id: int):
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
        skilltree_id, username, skill, description, tags, tree = cursor.fetchall()[0]
        return (GetTreeResponse(skilltree_id=skilltree_id, username=username, skill=skill, tags=tags, description=description, tree=tree))

def get_tree_by_skill(skill: str):
    with connection.cursor() as cursor:
        cursor.execute(
            f'''
            SELECT * FROM skilltree WHERE skill LIKE '%{skill}%';
            '''
        )
        res = []
        for treeObj in cursor.fetchall():
            skilltree_id, username, skill, description, tags, tree = treeObj
            res.append(GetTreeResponse(skilltree_id=skilltree_id, username=username, skill=skill, tags=tags, description=description, tree=tree))
        return res