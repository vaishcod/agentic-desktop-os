import React, { useState } from 'react';
import ReactFlow, { Background, Controls, Edge, Node } from 'reactflow';
import 'reactflow/dist/style.css';
import { Zap, Play, Plus, Trash2, Check, RefreshCw } from 'lucide-react';
import { motion } from 'framer-motion';

const initialNodes: Node[] = [
  { id: '1', position: { x: 150, y: 50 }, data: { label: 'Trigger: System Boot' }, type: 'input', style: { background: 'rgba(99, 102, 241, 0.25)', color: 'white', border: '1px solid rgba(99, 102, 241, 0.4)', borderRadius: '12px', padding: '10px' } },
  { id: '2', position: { x: 50, y: 180 }, data: { label: 'Desktop Agent: Open IDE' }, style: { background: 'rgba(255, 255, 255, 0.05)', color: 'white', border: '1px solid rgba(255, 255, 255, 0.1)', borderRadius: '12px', padding: '10px' } },
  { id: '3', position: { x: 280, y: 180 }, data: { label: 'File Agent: Scan nixpacks.toml' }, style: { background: 'rgba(255, 255, 255, 0.05)', color: 'white', border: '1px solid rgba(255, 255, 255, 0.1)', borderRadius: '12px', padding: '10px' } },
  { id: '4', position: { x: 160, y: 300 }, data: { label: 'Commander Agent: Run Diagnostics' }, type: 'output', style: { background: 'rgba(16, 185, 129, 0.25)', color: 'white', border: '1px solid rgba(16, 185, 129, 0.4)', borderRadius: '12px', padding: '10px' } },
];

const initialEdges: Edge[] = [
  { id: 'e1-2', source: '1', target: '2', animated: true, style: { stroke: '#6366f1' } },
  { id: 'e1-3', source: '1', target: '3', animated: true, style: { stroke: '#6366f1' } },
  { id: 'e2-4', source: '2', target: '4', animated: true, style: { stroke: '#10b981' } },
  { id: 'e3-4', source: '3', target: '4', animated: true, style: { stroke: '#10b981' } },
];

export const AutomationBuilder = () => {
  const [nodes, setNodes] = useState<Node[]>(initialNodes);
  const [edges, setEdges] = useState<Edge[]>(initialEdges);
  const [isRunning, setIsRunning] = useState(false);

  const handleRunWorkflow = () => {
    setIsRunning(true);
    setTimeout(() => {
      setIsRunning(false);
      alert("Workflow executed successfully by sub-agents!");
    }, 3000);
  };

  const handleResetWorkflow = () => {
    setNodes(initialNodes);
    setEdges(initialEdges);
  };

  const handleAddNode = () => {
    const newId = (nodes.length + 1).toString();
    const newNode: Node = {
      id: newId,
      position: { x: Math.random() * 200 + 100, y: Math.random() * 150 + 100 },
      data: { label: `Sub-agent Task #${newId}` },
      style: { background: 'rgba(255, 255, 255, 0.05)', color: 'white', border: '1px solid rgba(255, 255, 255, 0.1)', borderRadius: '12px', padding: '10px' }
    };
    setNodes([...nodes, newNode]);
    
    // Connect to commander output (node 4) if present
    const newEdge: Edge = {
      id: `e${newId}-4`,
      source: newId,
      target: '4',
      animated: true,
      style: { stroke: '#6366f1' }
    };
    setEdges([...edges, newEdge]);
  };

  return (
    <div className="space-y-6 h-full flex flex-col">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-black text-white tracking-tight flex items-center gap-3">
            <Zap className="text-primary animate-pulse" />
            Automation Builder
          </h2>
          <p className="text-sm text-slate-400 mt-1">Visually design node-based routines and triggers executed by Antigravity Agents.</p>
        </div>

        <div className="flex items-center gap-2">
          <button 
            onClick={handleAddNode}
            className="glass-button flex items-center gap-2 text-xs"
          >
            <Plus size={14} className="text-primary" />
            Add Custom Node
          </button>
          
          <button 
            onClick={handleResetWorkflow}
            className="glass-button flex items-center gap-2 text-xs"
          >
            <RefreshCw size={14} className="text-slate-400" />
            Reset Canvas
          </button>

          <button 
            onClick={handleRunWorkflow}
            disabled={isRunning}
            className={`glass-button flex items-center gap-2 text-xs ${
              isRunning ? 'bg-primary/20 text-primary border-primary/20' : 'bg-accent/20 text-accent border-accent/20 hover:bg-accent/30'
            }`}
          >
            {isRunning ? (
              <>
                <LoaderIcon /> Running...
              </>
            ) : (
              <>
                <Play size={14} /> Run Routine
              </>
            )}
          </button>
        </div>
      </div>

      {/* ReactFlow Canvas container */}
      <div className="glass-card flex-1 p-0 relative overflow-hidden border border-white/5 min-h-[400px]">
        {isRunning && (
          <div className="absolute top-4 right-4 z-10 bg-primary/20 text-primary border border-primary/30 rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-wider animate-pulse flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-primary animate-ping" />
            Agent Executing Workflow
          </div>
        )}
        <ReactFlow
          nodes={nodes}
          edges={edges}
          fitView
          style={{ background: 'transparent' }}
          className="select-none"
        >
          <Background color="rgba(255,255,255,0.05)" gap={16} size={1} />
          <Controls className="bg-neutral-900 border border-white/10 text-white rounded-lg overflow-hidden [&_button]:bg-neutral-900 [&_button]:border-white/5 [&_button]:text-white" />
        </ReactFlow>
      </div>
    </div>
  );
};

const LoaderIcon = () => (
  <svg className="animate-spin h-3 w-3 text-primary" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
  </svg>
);
