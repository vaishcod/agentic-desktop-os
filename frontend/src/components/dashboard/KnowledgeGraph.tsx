import React from 'react';
import { motion } from 'framer-motion';

export const KnowledgeGraph = () => {
  return (
    <div className="glass-card p-8 h-[300px] relative overflow-hidden flex items-center justify-center">
      <div className="absolute inset-0 bg-primary/5 blur-3xl rounded-full" />
      
      <svg className="w-full h-full relative z-10" viewBox="0 0 400 300">
        {/* Connection Lines */}
        <line x1="200" y1="150" x2="100" y2="80" stroke="#6366f1" strokeWidth="1" strokeDasharray="4" />
        <line x1="200" y1="150" x2="300" y2="80" stroke="#6366f1" strokeWidth="1" strokeDasharray="4" />
        <line x1="200" y1="150" x2="200" y2="250" stroke="#6366f1" strokeWidth="1" strokeDasharray="4" />
        
        {/* Nodes */}
        <motion.circle 
          animate={{ r: [10, 12, 10] }} 
          transition={{ repeat: Infinity, duration: 2 }}
          cx="200" cy="150" r="10" fill="#6366f1" 
        />
        <motion.circle cx="100" cy="80" r="6" fill="#10b981" />
        <motion.circle cx="300" cy="80" r="6" fill="#10b981" />
        <motion.circle cx="200" cy="250" r="6" fill="#10b981" />
        
        {/* Labels */}
        <text x="215" y="155" fill="white" fontSize="10" fontWeight="bold">User Persona</text>
        <text x="115" y="85" fill="#94a3b8" fontSize="8">Active Projects</text>
        <text x="315" y="85" fill="#94a3b8" fontSize="8">Tool Preferences</text>
        <text x="215" y="255" fill="#94a3b8" fontSize="8">Recent History</text>
      </svg>
      
      <div className="absolute bottom-4 right-4 text-[10px] text-slate-500 font-medium">
        Knowledge Graph Visualization v0.1
      </div>
    </div>
  );
};
