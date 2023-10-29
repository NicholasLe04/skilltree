import { useState } from 'react';
import Navbar from '../components/Navbar';
import './Create.css';
import React from 'react';
import 'reactflow/dist/style.css';
import Graph from "react-graph-vis";
import axios from 'axios';
import DimmedOverlay from '../components/DimmedOverlay';
import loadingGIF from "../../assets/images/loading.gif";
import Tag from '../components/Tag';
import MagicWand from '../../assets/images/magicwand.svg'

const options = {
    layout: {
        hierarchical: false
    },
    nodes: {
        borderWidth: 0
    },
    edges: {
        color: "#141414",
        width: 3
    },
    "physics": {
        "enabled": true,
        "barnesHut": {
            "gravitationalConstant": -10000,
            "centralGravity": 0.5,
            "springLength": 100
        },
    }
};



function Create() {

    const [reload, setReload] = useState(0);

    const createNode = () => {
        setSkills([...skills, {
            id: counter,
            label: 'New Skill',
            color: '#c9c9c9',
            x: Math.floor(Math.random() * 50) - 25,
            y: Math.floor(Math.random() * 50) - 25,
            heightConstraint: 100,
            widthConstraint: {
                maximum: 100
            },
            shape: 'circle'
        }]);
        setCounter(counter + 1)
    }

    const deleteNode = (node_id) => {
        setSkills(skills.filter(node => node.id !== node_id));
        setSelectedNode();
    }

    const handleCheckboxChange = (node, isChecked) => {
        if (!isChecked) {
            setEdges(edges.filter(edge => (edge.from !== selectedNode.id || edge.to !== node.id)))
        }
        else {
            setEdges([...edges, { from: selectedNode.id, to: node.id }]);
        }

    };

    const handleTitleChange = (e) => {
        let tempNode = skills.find(node => node.id === selectedNode.id);
        tempNode.label = e.target.value;
        setSkills((prev, props) => {
            setReload(reload + 1);
            return [...prev.filter(node => node.id !== selectedNode.id), tempNode]
        });
    }

    const handleDescriptionChange = (e) => {
        let tempNode = skills.find(node => node.id === selectedNode.id);
        tempNode.description = e.target.value;
        setSkills((prev, props) => {
            return [...prev.filter(node => node.id !== selectedNode.id), tempNode]
        });
    }

    const [counter, setCounter] = useState(1);
    const [skills, setSkills] = useState([]);
    const [edges, setEdges] = useState([]);
    const [topic, setTopic] = useState([]);
    const [tags, setTags] = useState([]);
    const [loading, setLoading] = useState(false);

    const events = {
        select: ({ nodes }) => {
            setSelectedNode(skills.find(node => node.id == nodes));
        }
    };

    const generateAITree = (skill) => {
        setLoading(true);
        axios.get("http://localhost:6969/tree/ai/" + (skill), {
            headers: {
                Accept: 'application/json'
            }
        })
            .then(response => {
                setSkills(response.data.nodes);
                setEdges(response.data.edges);
                setCounter(response.data.nodes.length + 1)
                setLoading(false);
            })
            .catch(error => {
                console.log(error)
            });
    }

    const saveTree = () => {
        skills.map((skill) => {
            if (typeof (skill.description) === 'string' && skill.description.includes("'")) {
                skill.description = skill.description.replace("'", "");
            }
        })

        axios.post("http://localhost:6969/tree/", {
            "username": "oscar",
            "skill": topic,
            "description": "",
            "tags": tags,
            "tree": {
                "nodes": skills,
                "edges": edges
            }
        })
            .then((response) => {
                console.log('Response:', response.data);
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    }

    const [selectedNode, setSelectedNode] = useState();

    return (
        <div style={{ overflowY: 'hidden' }}>
            {
                loading &&
                <>
                    <DimmedOverlay />
                    <img src={loadingGIF} style={{
                        position: 'fixed',
                        zIndex: '99999999999',
                        height: '30vh',
                        left: '50%',
                        top: '50%',
                        transform: 'translate(-50%, -50%)'
                    }} />
                </>
            }
            <Navbar />
            <div className='main-content' style={{ display: 'flex', flexDirection: 'column' }}>
                <div className='main-content' style={{ display: 'flex' }}>
                    <div className='content'>
                        <Graph
                            key={reload}
                            graph={{
                                "nodes": skills,
                                "edges": edges
                            }}
                            options={options}
                            events={events}
                        />
                        <button className='plusbutton' onClick={createNode}>+</button>
                    </div>
                    <div className='sidebar-container'>
                        {
                            selectedNode &&
                            <>
                                <input type='text' className='skill-title-editor' placeholder={selectedNode.label} onChange={(e) => { handleTitleChange(e) }} />
                                <h3 className='editor-header'>Description</h3>
                                <textarea type='text' className='description-editor' placeholder={selectedNode.description} onChange={(e) => { handleDescriptionChange(e) }} />
                                <h3 className='editor-header'>Connects to</h3>
                                <div>
                                    {
                                        skills.map((node) => {
                                            if (node.id != selectedNode.id) {
                                                return (
                                                    <div key ={node.id}>
                                                        <label className="checklist" >
                                                            <input
                                                                type="checkbox"
                                                                checked={edges.some(edge => edge.from === selectedNode.id && edge.to === node.id)}
                                                                onChange={(e) => handleCheckboxChange(node, e.target.checked)}
                                                            />
                                                            {node.label}
                                                        </label>
                                                    </div>
                                                )
                                            }
                                        })
                                    }
                                </div>
                                <button className="del" onClick={() => deleteNode(selectedNode.id)}>Delete</button>
                            </>
                        }
                    </div>
                </div>
                <div className='bottom-container'>
                    <button className='magicWand' onClick={() => {generateAITree(topic)}}><img src={MagicWand} width={40} height={35} /></button>
                    <input type="text" className="topic-editor" placeholder="topic" onChange={(e) => setTopic(e.target.value)} />
                    <div>
                        <div style={{ display: "flex" }} >
                            <div style={{ display: "flex", gap: "10px" }}>{tags.map((tag) => <Tag tag={tag} />)}</div>
                            <form onSubmit={(e) => {
                                e.preventDefault();
                                setTags([...tags, e.target.tag.value.toLowerCase()])
                                e.target.tag.value = "";
                            }}>
                                <input id="tag" type="text" placeholder='Add a tag'></input>
                                <button type="submit">Add</button>
                            </form>
                        </div>
                        <button className='createButton' onClick={() => { saveTree() }}>Publish</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Create