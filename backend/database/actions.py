import json
import uuid
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
        cursor.execute(
            f'''
            INSERT INTO skilltree (skilltree_id, username, skill, description, tags, tree)
            VALUES ('{uuid.uuid4()}', '{tree.username}', '{tree.skill}', '{tree.description}', {tags_str}, '{json_str}') RETURNING skilltree_id;
            '''
        )

        print(f'Just inserted a skilltree with id = {cursor.fetchone()}')

def upvote_tree(skilltree_id: int):
    with connection.cursor() as cursor:
        cursor.execute(
            f'''
            UPDATE skilltree SET upvotes = upvotes + 1 WHERE skilltree_id='{skilltree_id}';
            '''
        )

def downvote_tree(skilltree_id: int):
    with connection.cursor() as cursor:
        cursor.execute(
            f'''
            UPDATE skilltree SET downvotes = downvotes + 1 WHERE skilltree_id='{skilltree_id}';
            '''
        )

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
        skilltree_id, username, skill, description, tags, upvotes, downvotes, tree = cursor.fetchall()[0]
        return GetTreeResponse(skilltree_id=skilltree_id, username=username, skill=skill, tags=tags, description=description, upvotes=upvotes, downvotes=downvotes, tree=tree)


def get_tree_by_skill(skill: str):
    with connection.cursor() as cursor:
        cursor.execute(
            f'''
            SELECT * FROM skilltree WHERE skill LIKE '%{skill}%';
            '''
        )
        res = []
        for treeObj in cursor.fetchall():
            skilltree_id, username, skill, description, tags, upvotes, downvotes, tree = treeObj
            res.append(GetTreeResponse(skilltree_id=skilltree_id, username=username, skill=skill, tags=tags, description=description, upvotes=upvotes, downvotes=downvotes, tree=tree))
        return res
    
def get_tree_by_username(username: str):
    with connection.cursor() as cursor:
        cursor.execute(
            f'''
            SELECT * FROM skilltree WHERE username='{username}';
            '''
        )
        res = []
        for treeObj in cursor.fetchall():
            skilltree_id, username, skill, description, tags, upvotes, downvotes, tree = treeObj
            res.append(GetTreeResponse(skilltree_id=skilltree_id, username=username, skill=skill, tags=tags, description=description, upvotes=upvotes, downvotes=downvotes, tree=tree))
        return res
    
def get_tree_by_tag(tag: str):
    with connection.cursor() as cursor:
        cursor.execute(
            f'''
            SELECT * FROM skilltree WHERE '{tag}'=ANY(tags);
            '''
        )
        res = []
        for treeObj in cursor.fetchall():
            skilltree_id, username, skill, description, tags, upvotes, downvotes, tree = treeObj
            res.append(GetTreeResponse(skilltree_id=skilltree_id, username=username, skill=skill, tags=tags, description=description, upvotes=upvotes, downvotes=downvotes, tree=tree))
        return res