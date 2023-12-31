import json
import random
import requests

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

@router.get("/ai/{skill}")
def generate_ai_tree(skill):
    root_skill = generate_root_skill(skill)
    subskills1, subskill1_edges = generate_subskills(skill, skill, 1, 2)
    subskills2, subskill2_edges = generate_subskills(skill, subskills1[0]['label'], 2, 5)
    subskills3, subskill3_edges = generate_subskills(skill, subskills1[1]['label'], 3, 8)
    subskills4, subskill4_edges = generate_subskills(skill, subskills1[2]['label'], 4, 11)
    
    return JSONResponse(content={
        "nodes": [root_skill] + subskills1 + subskills2 + subskills3 + subskills4, 
        "edges": subskill1_edges + subskill2_edges + subskill3_edges + subskill4_edges
    })
  
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
    
    
@router.get("/tag/{tag}")
def get_tree_tag(tag):
    try:
        tree = Actions.get_tree_by_tag(tag)
        return tree
    except Exception as e:
        return HTTPException(status_code=500, detail=str(e))

def generate_root_skill(skill:str):
    endpoint = 'https://api.together.xyz/inference'
    res = requests.post(endpoint, json={
        "model": "togethercomputer/llama-2-70b-chat",
        "max_tokens": 512,
        "prompt": "Give a 1 sentence description of \"" + skill + ".\"",
        "request_type": "language-model-inference",
        "temperature": 0.15,
        "top_p": 0.7,
        "top_k": 50,
        "repetition_penalty": 1,
        "stop": [
            "[/INST]",
            "</s>"
        ],
        "negative_prompt": "",
        "sessionKey": "2e59071178ae2b05e68015136fb8045df30c3680",
        "safety_model": "",
        "repetitive_penalty": 1,
        "update_at": "2023-10-28T20:07:51.077Z"
    }, headers={
        "Authorization": "Bearer f9f8c360ecd13b70905be90d2bbe6f2079f108718907f2d0884dbe8c9cfbd8a4",
    })
    description = res.json()['output']['choices'][0]['text']
    return ({
        "id": 1,
        "label": skill,
        "description": description,
        'color': '#c9c9c9',
        'x': (random.uniform(0,1) * 50) - 25,
        'y': (random.uniform(0,1) * 50) - 25,
        'heightConstraint': 100,
        'widthConstraint': {
            'maximum': 100,
        },
        'physics': True,
        'shape': 'circle'
    })

def generate_subskills(skill:str, subskill:str, skill_id:int, next_id:int) -> 'tuple[list[dict], list[dict]]':
    endpoint = 'https://api.together.xyz/inference'
    res = requests.post(endpoint, json={
        "model": "togethercomputer/llama-2-70b-chat",
        "max_tokens": 256,
        "prompt": f"Create three subskills for \"" + subskill + "\" in a \"" + skill + "\" skill tree. Please list their labels and descriptions. Give your response only in Python as a list of dict objects. Do not mention the parent skill and do not write code snippets.",
        "request_type": "language-model-inference",
        "temperature": 0.1,
        "top_p": 0.7,
        "top_k": 50,
        "repetition_penalty": 1,
        "stop": [
            "[/INST]",
            "</s>"
        ],
        "negative_prompt": "",
        "sessionKey": "2e59071178ae2b05e68015136fb8045df30c3680",
        "safety_model": "",
        "repetitive_penalty": 1,
        "update_at": "2023-10-28T20:04:26.259Z"
    }, headers={
        "Authorization": "Bearer f9f8c360ecd13b70905be90d2bbe6f2079f108718907f2d0884dbe8c9cfbd8a4",
    })
    result_str = res.json()['output']['choices'][0]['text']
    print('[' + result_str[result_str.index('{')-1:result_str.index(']')+1])
    subskill_list = json.loads('[' + result_str[result_str.index('{')-1:result_str.index(']')+1])
    id_counter = next_id

    for subskill in subskill_list:
        subskill['id'] = id_counter
        subskill['color'] = '#c9c9c9'
        subskill['x'] = (random.uniform(0,1) * 50) - 25
        subskill['y'] = (random.uniform(0,1) * 50) - 25
        subskill['heightConstraint'] = 100
        subskill['widthConstraint'] = { 'maximum': 100 }
        subskill['physics'] = True
        subskill['shape'] = 'circle'
        id_counter += 1

    edge_list = []
    for subskill in subskill_list:
        edge_list.append({
            'from': skill_id,
            'to': subskill['id']
        })

    return subskill_list, edge_list
