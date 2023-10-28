import { useState } from 'react';
import Navbar from '../components/Navbar';
import './Create.css';
import React from 'react';
import 'reactflow/dist/style.css';
import Graph from "react-graph-vis";


const options = {
  layout: {
    hierarchical: false
  },
  edges: {
    color: "#000000"
  }
};



function Create() {

    const createNode = () => {
        setState(({ graph: { nodes, edges }, counter }) => {
            const id = counter + 1;
            const newNode = { 
                id, 
                label: `Node ${id}`, 
                color: '#c9c9c9', 
                x: Math.floor(Math.random() * 500)-250, 
                y: Math.floor(Math.random() * 400)-200, 
                heightConstraint: 100,
                physics: false,
                shape: 'circle'
            };
            return {
                graph: {
                    nodes: [
                        ...nodes,
                        newNode
                    ],
                    edges: edges
                },
                counter: id,
                events: {
                    select: ({ nodes }) => {
                        setSelectedNode([...graph.nodes, newNode].find(node => node.id == nodes));
                    }
                }
            }
        });
    }

    const deleteNode = (node_id) => {
        setSelectedNode();
        setState(({ graph: { nodes, edges }, counter }) => {
            return {
                graph: {
                    nodes: nodes.filter(node => node.id != node_id),
                    edges: edges
                },
                counter: counter,
                events: {
                    select: ({ nodes }) => {
                        setSelectedNode([...graph.nodes].find(node => node.id == nodes));
                    }
                }
            }
        });
    }

    const handleCheckboxChange = (node, isChecked) => {
        if (!isChecked) {
            setState(({ graph: { nodes, edges }, counter, events}) => {
                return {
                    graph: {
                            nodes: nodes,
                            edges: edges.filter(edge => (edge.from !== selectedNode.id || edge.to !== node.id))
                    },
                    counter: counter,
                    events: events
                }
            })
        }
        else {
            setState(({ graph: { nodes, edges }, counter, events}) => {
                return {
                    graph: {
                            nodes: nodes,
                            edges: [...edges, {from: selectedNode.id, to: node.id}]
                    },
                    counter: counter,
                    events: events
                }
            })
        }

        console.log(state.graph.edges)
    };

    const [state, setState] = useState({
        counter: 0,
        graph: {
            nodes: [],
            edges: []
        },
        events: {}
    })
    const { graph, events } = state;

    const [selectedNode, setSelectedNode] = useState();

    return (
        <>
            <Navbar />
            <div className='main-content' style={{display:'flex', flexDirection:'column'}}>
                <div className='main-content' style={{display:'flex'}}>
                    <div className='content'>
                        <Graph graph={graph} options={options} events={events}/>
                        <button style={{height: '50px', width: '50px', borderRadius: '25px'}} onClick={createNode}>+</button>
                    </div>
                    <div className='sidebar-container'>
                        { 
                            selectedNode && 
                            <>
                                <input type='text' className='skill-title-editor' placeholder={selectedNode.label} onChange={(e) => {
                                   console.log("ashglkasjglksjgl")
                                }}/>
                                <h3>Description</h3>
                                <textarea type='text' className='description-editor' defaultValue={selectedNode.description} />
                                <h3>Connects to</h3>
                                <div>
                                    {
                                        state.graph.nodes.map((node) => {
                                            if (node.id != selectedNode.id) {
                                                return (
                                                    <div key={node.id}>
                                                        <label>
                                                            <input
                                                            type="checkbox"
                                                            checked={state.graph.edges.some(edge => edge.from === selectedNode.id && edge.to === node.id)}
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
                                <button onClick={() => deleteNode(selectedNode.id)}>DELETE</button>
                            </>
                        }
                    </div>
                </div>
                <div className='bottom-container'>
                        <button>POST</button>
                </div>
            </div>
        </>
    )
}

export default Create