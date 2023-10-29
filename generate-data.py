import json
import requests
import threading


def generate_tree(topic:str, tags:list[str]):
    print(f'generating {topic} tree with tags = {tags}')
    res = requests.get('http://localhost:6969/tree/ai/' + topic)
    result = res.json()
    for skill in result['nodes']:
        if "'" in skill['description']:
            skill['description'] = skill['description'].replace("'", "")
    result = json.loads(json.dumps(result))

    requests.post('http://localhost:6969/tree/', json={
        "username": "oscar",
        "skill": topic,
        "description": "",
        "tags": tags,
        "tree": result
    })

trees = {
    'sports': ['volleyball', 'basketball', 'baseball', 'football', 'soccer', 'badminton'],
    'tech': ['pc building', 'programming', 'gaming', 'video editing', 'soldering', 'networking'],
    'creative': ['painting', 'drawing', 'animation', 'dancing', 'singing', 'filmmaking'],
    'academic': ['calculus', 'writing', 'physics', 'studying', 'biology', 'history'],
}


for tag, topics in trees.items():
    for topic in topics:
        generate_tree(topic, [tag])
