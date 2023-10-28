import { useEffect, useState } from 'react';
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

    // useEffect(() => {
        
    // }, [skills]);

    const createNode = () => {
        setSkills([...skills, { 
                id: counter, 
                label: 'New Skill', 
                color: '#c9c9c9', 
                x: Math.floor(Math.random() * 500)-250, 
                y: Math.floor(Math.random() * 400)-200, 
                heightConstraint: 100,
                physics: true,
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
            setEdges([...edges, {from: selectedNode.id, to: node.id}]);
        }

    };

    const handleTitleChange = (e) => {
        let tempNode = skills.find(node => node.id === selectedNode.id);
        tempNode.label = e.target.value;
        setSkills([...skills.filter(node => node.id !== selectedNode.id), tempNode]);
        setTrigger(!trigger);
    }

    const [counter, setCounter] = useState(1);
    const [skills, setSkills] = useState([]);
    const [edges, setEdges] = useState([]);
    const [trigger, setTrigger] = useState(true);

    
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
                            <Graph 
                                graph={{
                                    "nodes": skills,
                                    "edges": edges
                                }} 
                                options={options} 
                                events={events}
                                trigger={trigger}
                            />
                        <button style={{height: '50px', width: '50px', borderRadius: '25px'}} onClick={createNode}>+</button>
                    </div>
                    <div className='sidebar-container'>
                        { 
                            selectedNode && 
                            <>
                                <input type='text' className='skill-title-editor' placeholder={selectedNode.label} onChange={(e) => {handleTitleChange(e)}}/>
                                <h3>Description</h3>
                                <textarea type='text' className='description-editor' defaultValue={selectedNode.description} />
                                <h3>Connects to</h3>
                                <div>
                                    {
                                        skills.map((node) => {
                                            if (node.id != selectedNode.id) {
                                                return (
                                                    <div key={node.id}>
                                                        <label>
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