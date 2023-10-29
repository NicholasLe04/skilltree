import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Navbar from '../components/Navbar';
import './Tree.css';
import React from 'react';
import 'reactflow/dist/style.css';

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


    useEffect(() => {
        axios.get("http://localhost:6969/tree/id/" + (treeID), {
            headers: {
            Accept: 'application/json'
            }
        })
        .then(response => {
            setNodes(response.data.tree.nodes);
            setEdges(response.data.tree.edges);
            console.log(skills);
            console.log(edges);
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
            <div className='main-content' style={{display:'flex', flexDirection:'column'}}>
                <div className='main-content' style={{display:'flex'}}>
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
                <div className='bottom-container'>bruh</div>
            </div>
        </>
    )
}

export default Tree