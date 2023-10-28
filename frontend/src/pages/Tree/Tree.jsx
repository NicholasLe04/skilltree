import { useState, useEffect, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import ReactFlow, { Controls, Background } from 'reactflow';
import Navbar from '../components/Navbar';
import './Tree.css';
import React from 'react';
import 'reactflow/dist/style.css';



function Tree() {

    const { treeID } = useParams();
    const [selectedNode, setSelectedNode] = useState();
    const [nodes, setNodes] = useState([]);
    const [edges, setEdges] = useState([]);

    useEffect(() => {
        setEdges([{ id: '1-2', source: '1', target: '2', type: 'straight', style: { stroke: '#000' } }, { id: '1-3', source: '1', target: '3', type: 'straight', style: { stroke: '#000' } }]);

        setNodes([
            {
                id: '1',
                data: { label: 'Hello' },
                position: { x: 200, y: 300 },
                style: { width: '50px', height: '50px', borderRadius: '25px', lineHeight: '25px', fontSize: '10px' },
                targetPosition: 'bottom',
                sourcePosition: 'top',
                description: 'bruh'
            },
            {
                id: '2',
                data: { label: 'World' },
                position: { x: 300, y: 200 },
                style: { width: '50px', height: '50px', borderRadius: '25px', lineHeight: '25px', fontSize: '10px' },
                targetPosition: 'bottom',
                sourcePosition: 'top',
                description: 'bruh2'
            },
            {
                id: '3',
                data: { label: 'World' },
                position: { x: 100, y: 200 },
                style: { width: '50px', height: '50px', borderRadius: '25px', lineHeight: '25px', fontSize: '10px' },
                targetPosition: 'bottom',
                sourcePosition: 'top',
                description: 'bruh3'
            },
        ])
    })




    return (
        <>
            <Navbar />
            <div className='main-content' style={{ display: 'flex', flexDirection: 'column' }}>
                <div className='main-content' style={{ display: 'flex' }}>
                    <div className='content'>

                        <ReactFlow nodes={nodes} edges={edges} fitView onNodeClick={(_, node) => setSelectedNode(node)} click>
                            <Background />
                            <Controls />
                        </ReactFlow>

                    </div>
                    <div className='sidebar-container'>
                        {
                            selectedNode &&
                            <>
                                <h1>{selectedNode.data.label}</h1>
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