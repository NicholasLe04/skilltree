import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Navbar from '../components/Navbar';
import Tag from './Tag';
import './Tree.css';
import React from 'react';
import 'reactflow/dist/style.css';
import downArrow from '../../assets/images/arrow_down_white.svg';
import upArrow from '../../assets/images/arrow_up_white.svg';

import Graph from "react-graph-vis";


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




function Tree() {

    const { treeID } = useParams();
    const [skills, setNodes] = useState([])
    const [edges, setEdges] = useState([])
    const [treeData, setTreeData] = useState({})
    const [upvotesLocal, setUpvotes] = useState("")
    const [downvotesLocal, setDownvotes] = useState("")
    const [loaded, setLoaded] = useState(false)

    useEffect(() => {
        axios.get(`http://localhost:6969/tree/id/${treeID}`)
            .then(response => {
                setNodes(response.data.tree.nodes);
                setEdges(response.data.tree.edges);
                setUpvotes(response.data.upvotes);
                setDownvotes(response.data.downvotes);
                setTreeData(response.data);
                setLoaded(true);
                console.log(skills);
            })
            .catch(error => {
                console.log(error)
            });
    }, []);


    const events = {
        select: ({ nodes }) => {
            setSelectedNode(skills.find(node => node.id == nodes));
        }
    };

    const [selectedNode, setSelectedNode] = useState();

    return (
        <>
            <Navbar />
            {loaded ?
                <div className='main-content' style={{ display: 'flex', flexDirection: 'column' }}>
                    <div className='main-content' style={{ display: 'flex' }}>
                        <div className='content'>

                            {skills && edges && <Graph
                                graph={{
                                    "nodes": skills,
                                    "edges": edges
                                }}
                                options={options}
                                events={events}
                            />}

                        </div>
                        <div className='sidebar-container'>
                            {
                                selectedNode &&
                                <>
                                    <h1>{selectedNode.label}</h1>
                                    <h3>Description</h3>
                                    <p>{selectedNode.description}</p>
                                </>
                            }
                        </div>
                    </div>
                    <div className='bottom-container'>
                        <div className='side'>
                            <div className='tree-title'>{treeData.skill}</div>
                            <div className='author-pane'>
                                <div className='author'>by {treeData.username}</div>
                                <div className='ratings'>
                                    <div className='upvotes'>
                                        <div>{treeData.upvotes}</div>
                                        <img src={upArrow} onClick={(e) => {
                                            e.stopPropagation()
                                            axios.put(`/tree/upvote/${id}`)
                                            setDownvotes(upvotesLocal + 1)
                                        }}
                                            style={{ display: "block" }
                                            } />
                                    </div>
                                    <div className='downvotes'>
                                        <div>{treeData.downvotes}</div>
                                        <img src={downArrow} onClick={(e) => {
                                            e.stopPropagation()
                                            axios.put(`/tree/downvote/${id}`)
                                            setDownvotes(downvotesLocal + 1)
                                        }}
                                            style={{ display: "block" }
                                            } />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='side'>
                            <div className='tags'>
                                {(treeData.tags).map((tag) => <Tag tag={tag} />)}
                            </div>
                        </div>
                    </div>
                </div> : <div />
            }
        </>
    )
}

export default Tree