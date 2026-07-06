import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Zap, Clock, CheckCircle, Search, FileText, Monitor, Undo } from 'lucide-react';
import { AgentCollaboration } from '../components/agents/AgentCollaboration';

const ThinkingStep = ({ label, status }: { label: string, status: 'pending' | 'active' | 'completed' }) => (
  <div className="flex items-center gap-3 py-2">
    <div className={`w-2 h-2 rounded-full ${
      status === 'completed' ? 'bg-accent' : 
      status === 'active' ? 'bg-primary animate-pulse' : 
      'bg-slate-700'
    }`} />
    <span className={`text-sm ${status === 'pending' ? 'text-slate-500' : 'text-slate-200'}`}>
      {label}
    </span>
  </div>
);

export const AIWorkspace = () => {
  const [query, setQuery] = useState('');
  const [isExecuting, setIsExecuting] = useState(false);
  const [steps, setSteps] = useState([
    { label: 'Analyzing user goal...', status: 'completed' },
    { label: 'Gathering context...', status: 'completed' },
    { label: 'Planning execution sequence...', status: 'active' },
    { label: 'Calling Vision Agent...', status: 'pending' },
    { label: 'Verifying results...', status: 'pending' },
  ]);

  const handleSend = () => {
    if (!query) return;
    setIsExecuting(true);
    // Simulate execution flow
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-full">
      {/* Workspace Area */}
      <div className="lg:col-span-2 flex flex-col gap-4">
        <div className="glass-card flex-1 p-6 flex flex-col">
          <div className="flex-1 overflow-y-auto space-y-6">
            {/* AI Response Example */}
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex gap-4"
            >
              <div className="w-8 h-8 rounded-lg bg-primary/20 flex items-center justify-center shrink-0">
                <Zap size={16} className="text-primary" />
              </div>
              <div className="space-y-3">
                <p className="text-sm leading-relaxed text-slate-300">
                  I've analyzed your request to "Review my recent changes in VS Code". 
                  I've identified the following steps:
                </p>
                <div className="grid grid-cols-2 gap-3">
                  <div className="p-3 rounded-xl bg-white/5 border border-white/10 flex items-center gap-3">
                    <Monitor size={14} className="text-slate-400" />
                    <span className="text-xs">Capture Screenshot</span>
                  </div>
                  <div className="p-3 rounded-xl bg-white/5 border border-white/10 flex items-center gap-3">
                    <FileText size={14} className="text-slate-400" />
                    <span className="text-xs">Parse recent files</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Input Bar */}
          <div className="mt-6 relative">
            <input 
              type="text" 
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSend()}
              placeholder="What should I do next?" 
              className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 outline-none focus:border-primary/50 transition-colors pr-16"
            />
            <button 
              onClick={handleSend}
              className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 bg-primary rounded-xl flex items-center justify-center text-white glow-primary hover:bg-primary-hover transition-colors"
            >
              <Send size={18} />
            </button>
          </div>
        </div>
      </div>

      {/* Execution Monitor */}
      <div className="flex flex-col gap-4">
        <AgentCollaboration />
        <div className="glass-card p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="font-bold text-white flex items-center gap-2">
              <Clock size={16} className="text-primary" />
              Execution Flow
            </h3>
            <span className="text-[10px] uppercase tracking-wider text-slate-500 font-bold">In Progress</span>
          </div>
          <div className="space-y-1">
            {steps.map((step, i) => (
              <ThinkingStep key={i} label={step.label} status={step.status as any} />
            ))}
          </div>
        </div>

        <div className="glass-card p-6 flex-1">
          <h3 className="font-bold text-white mb-4 flex items-center gap-2">
            <CheckCircle size={16} className="text-accent" />
            Verification
          </h3>
          <div className="p-4 rounded-xl bg-accent/5 border border-accent/10 text-xs text-accent/80 leading-relaxed">
            Goal: "Review VS Code"
            Status: Verifying interface elements...
            Confidence: 94%
          </div>
        </div>
      </div>
    </div>
  );
};
