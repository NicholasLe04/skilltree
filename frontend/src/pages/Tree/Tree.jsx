import { useState } from 'react';
import { useParams } from 'react-router-dom';
import Navbar from '../components/Navbar';
import './Tree.css';
import React from 'react';
import 'reactflow/dist/style.css';
import Graph from "react-graph-vis";


const options = {
  layout: {
    hierarchical: false
  },
  edges: {
    color: "#000000"
  },
};



function Tree() {

    const [state, setState] = useState({
        counter: 5,
        graph: {
            nodes: [
            { id: 1, label: "Node 1", description: "sla;dfjdsa", color: "#c9c9c9", shape: "circle" },
            { id: 2, label: "Node 2", description: "sla;dfjdsa", color: "#c9c9c9", shape: "circle" },
            { id: 3, label: "Node 3", description: "sla;dfjdsa", color: "#c9c9c9", shape: "circle" },
            { id: 4, label: "Node 4", description: "sla;dfjdsa", color: "#c9c9c9", shape: "circle" },
            { id: 5, label: "Node 5", description: "sla;dfjdsa", color: "#c9c9c9", shape: "circle" }
            ],
            edges: [
            { from: 1, to: 2 },
            { from: 1, to: 3 },
            { from: 2, to: 4 },
            { from: 2, to: 5 }
            ]
        },
        events: {
            select: ({ nodes }) => {
                setSelectedNode(state.graph.nodes[nodes-1]);
            }
        }
    })
    const { graph, events } = state;

    const { treeID } = useParams();
    const [selectedNode, setSelectedNode] = useState();

    return (
        <>
            <Navbar />
            <div className='main-content' style={{display:'flex', flexDirection:'column'}}>
                <div className='main-content' style={{display:'flex'}}>
                    <div className='content'>

                        <Graph graph={graph} options={options} events={events}/>

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