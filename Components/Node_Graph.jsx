import { useState, useCallback } from 'react';
import ReactFlow, { 
    Controls, 
    Background, 
    applyNodeChanges, 
    applyEdgeChanges,
    MiniMap,
    useNodesState,
    useEdgesState,
    addEdge } from 'reactflow';
import 'reactflow/dist/style.css';

const initialNodes = [
    {
        id: '1',
        data: { label: 'current wallet' },
        position: { x: 400, y: 225 },
    },
    {
        id: '2',
        data: { label: 'Wallet 1' },
        position: { x: 100, y: 100 },
    },
    {
        id: '3',
        data: { label: 'Wallet 2' },
        position: { x: 100, y: 200 },
    },
    {
        id: '4',
        data: { label: 'Wallet 3' },
        position: { x: 100, y: 300 },
    },
    {
        id: '5',
        data: { label: 'Wallet 4' },
        position: { x: 100, y: 400 },
    },
    {
        id: '6',
        data: { label: 'Wallet 5' },
        position: { x: 100, y: 500 },
    },
    {
        id: '7',
        data: { label: 'Wallet 6' },
        position: { x: 700, y: 100 },
    },
    {
        id: '8',
        data: { label: 'Wallet 7' },
        position: { x: 700, y: 200 },
    },
    {
        id: '9',
        data: { label: 'Wallet 8' },
        position: { x: 700, y: 300 },
    },
    {
        id: '10',
        data: { label: 'Wallet 9' },
        position: { x: 700, y: 400 },
    },
    {
        id: '11',
        data: { label: 'Wallet 10' },
        position: { x: 700, y: 500 },
    },
    {
        id: '12',
        data: { label: 'Wallet 11' },
        position: { x: 400, y: 400 },
    },
];

const initialEdges = [
    { id: '1-2', source: '1', target: '2', label: 'Block 768464' },
    { id: '1-3', source: '1', target: '3', label: 'Block 768465' },
    { id: '1-4', source: '1', target: '4', label: 'Block 775836' },
    { id: '1-5', source: '1', target: '5', label: 'Block 775837' },
    { id: '1-6', source: '1', target: '6', label: 'Block 781226' },
    { id: '1-7', source: '1', target: '7', label: 'Block 781621' },
    { id: '1-8', source: '1', target: '8', label: 'Block 786002' },
    { id: '1-9', source: '1', target: '9', label: 'Block 794199' },
    { id: '1-10', source: '1', target: '10', label: 'Block 794639' },
    { id: '1-11', source: '1', target: '11', label: 'Block 795293' },
    { id: '1-12', source: '1', target: '12', label: 'Block 796156' },
];

function Flow() {
    const [nodes, setNodes] = useState(initialNodes);
    const [edges, setEdges] = useState(initialEdges);

    const onNodesChange = useCallback(
        (changes) => setNodes((nds) => applyNodeChanges(changes, nds)),
        []
    );
    const onEdgesChange = useCallback(
        (changes) => setEdges((eds) => applyEdgeChanges(changes, eds)),
        []
    );

    return (
        <div style={{ height: '40vh' }}>
            <ReactFlow
                nodes={nodes}
                onNodesChange={onNodesChange}
                edges={edges}
                onEdgesChange={onEdgesChange}
                fitView
            >
                <Background />
                <Controls />
            </ReactFlow>
        </div>
    );
}

export default Flow;