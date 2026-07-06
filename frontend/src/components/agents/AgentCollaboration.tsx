import React from 'react';
import { motion } from 'framer-motion';
import { Brain, Monitor, FileText, Search, Zap } from 'lucide-react';

const AgentNode = ({ icon: Icon, label, color, isActive }: any) => (
  <div className="flex flex-col items-center gap-2">
    <motion.div 
      animate={isActive ? { scale: [1, 1.2, 1], rotate: [0, 10, -10, 0] } : {}}
      transition={{ repeat: Infinity, duration: 2 }}
      className={`w-12 h-12 rounded-2xl flex items-center justify-center ${color} border border-white/10 shadow-lg`}
    >
      <Icon size={24} className="text-white" />
    </motion.div>
    <span className="text-[10px] font-bold uppercase tracking-tighter text-slate-500">{label}</span>
  </div>
);

export const AgentCollaboration = () => {
  return (
    <div className="glass-card p-6 flex flex-col items-center justify-center gap-8 relative overflow-hidden h-48">
      <div className="absolute inset-0 bg-primary/5 blur-3xl rounded-full" />
      
      <div className="flex items-center justify-between w-full max-w-xs relative z-10">
        <AgentNode icon={Monitor} label="Desktop" color="bg-blue-500/20" />
        
        <div className="flex-1 h-[1px] bg-gradient-to-r from-blue-500/50 via-primary to-emerald-500/50 relative">
          <motion.div 
            animate={{ x: [-20, 120] }}
            transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
            className="absolute top-1/2 -translate-y-1/2 w-2 h-2 bg-white rounded-full shadow-[0_0_10px_white]"
          />
        </div>

        <AgentNode icon={Brain} label="Commander" color="bg-primary/20" isActive />

        <div className="flex-1 h-[1px] bg-gradient-to-r from-primary to-emerald-500/50 relative">
           <motion.div 
            animate={{ x: [-20, 120] }}
            transition={{ repeat: Infinity, duration: 2, ease: "linear", delay: 0.5 }}
            className="absolute top-1/2 -translate-y-1/2 w-1.5 h-1.5 bg-primary rounded-full"
          />
        </div>

        <AgentNode icon={FileText} label="File" color="bg-emerald-500/20" />
      </div>

      <div className="text-[10px] text-slate-400 font-medium animate-pulse">
        Commander Agent delegating tasks to sub-agents...
      </div>
    </div>
  );
};
