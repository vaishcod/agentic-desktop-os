import React from 'react';
import ReactFlow, { Background, Controls } from 'reactflow';
import 'reactflow/dist/style.css';
import { Zap, Play } from 'lucide-react';

const initialNodes = [
  { id: '1', position: { x: 100, y: 100 }, data: { label: 'Start Routine' }, type: 'input' },
  { id: '2', position: { x: 100, y: 200 }, data: { label: 'Open VS Code' } },
  { id: '3', position: { x: 300, y: 200 }, data: { label: 'Summarize Tasks' } },
];
const initialEdges = [
  { id: 'e1-2', source: '1', target: '2' },
  { id: 'e1-3', source: '1', target: '3' },
];

export const AutomationBuilder = () => {
  return (
    <div className="flex flex-col gap-6 h-full">
      <div className="glass-card flex-1 p-0 relative overflow-hidden">
        <div className="absolute top-4 left-4 z-10 flex gap-2">
           <button className="glass-button flex items-center gap-2 text-xs">
             <Zap size={14} className="text-primary" />
             Add Node
           </button>
           <button className="glass-button flex items-center gap-2 text-xs bg-accent/20 text-accent border-accent/20">
             <Play size={14} />
             Run Workflow
           </button>
        </div>
        <ReactFlow
          initialNodes={initialNodes}
          initialEdges={initialEdges}
          fitView
          style={{ background: 'transparent' }}
        >
          <Background color="#333" gap={16} />
          <Controls />
        </ReactFlow>
      </div>
    </div>
  );
};
