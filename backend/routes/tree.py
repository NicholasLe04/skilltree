import json
import requests

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

@router.get("/ai/{skill}")
def generate_ai_tree(skill):
    root_skill = _generate_root_skill(skill)
    subskills1, subskill1_edges = _generate_subskills(skill, root_skill, 1, 2)
    subskills2, subskill2_edges = _generate_subskills(skill, subskills1[0], 2, 5)
    subskills3, subskill3_edges = _generate_subskills(skill, subskills1[1], 3, 8)
    subskills3, subskill3_edges = _generate_subskills(skill, subskills1[2], 4, 11)

    return JSONResponse(content={
        "nodes": [root_skill] + subskills1 + subskills2 + subskills3, 
        "edges": subskill1_edges + subskill2_edges + subskill3_edges
    })


def _generate_root_skill(skill:str):
    endpoint = 'https://api.together.xyz/inference'
    res = requests.post(endpoint, json={
        "model": "togethercomputer/llama-2-70b-chat",
        "max_tokens": 512,
        "prompt": "What would be the root skill in a skill tree for \"" + skill + "\"? Give a label and description in JSON format. Do not mention any subskills.",
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
    result_str = res.json()['output']['choices'][0]['text']
    root_node_dict = json.loads(result_str[result_str.index('{'):result_str.index('}')+1])
    root_node_dict['id'] = 1
    return root_node_dict

def _generate_subskills(skill, subskill, skill_id, next_id) -> tuple[list[dict], list[dict]]:
    endpoint = 'https://api.together.xyz/inference'
    res = requests.post(endpoint, json={
        "model": "togethercomputer/llama-2-70b-chat",
        "max_tokens": 256,
        "prompt": f"Create three subskills for \"" + subskill + "\" in a \"" + skill + "\" skill tree. Please list their labels and descriptions. Give your response only in Python as a list of dict objects.",
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
    subskill_list = json.loads('[' + result_str[result_str.index('{')-1:result_str.index(']')+1])
    id_counter = next_id

    for subskill in subskill_list:
        subskill['id'] = id_counter
        id_counter += 1

    edge_list = []
    for subskill in subskill_list:
        edge_list.append({
            'from': skill_id,
            'to': subskill['id']
        })

    return subskill_list, edge_list