import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Clock, 
  Search, 
  Terminal, 
  CheckCircle, 
  Play, 
  AlertCircle, 
  Cpu, 
  Brain, 
  Monitor, 
  FileText 
} from 'lucide-react';
import { useStore } from '../store/useStore';

export const Timeline = () => {
  const { tasks } = useStore();
  const [filterAgent, setFilterAgent] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');

  const timelineEvents = [
    {
      id: '1',
      time: '11:20 AM',
      agent: 'Commander Agent',
      status: 'success',
      title: 'Analyze User Query & Decompose Goals',
      desc: 'Parsed request: "Review recent changes in VS Code and optimize local settings". Created execution graph.',
      icon: Brain,
      color: 'bg-primary/20 text-primary border-primary/30'
    },
    {
      id: '2',
      time: '11:22 AM',
      agent: 'File Agent',
      status: 'success',
      title: 'Scan Workspace Files',
      desc: 'Read backend nixpacks.toml, render.yaml, and runtime.txt to gather structural context.',
      icon: FileText,
      color: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30'
    },
    {
      id: '3',
      time: '11:25 AM',
      agent: 'Desktop Agent',
      status: 'pending',
      title: 'Analyze VS Code Interface Layout',
      desc: 'Capturing active screen viewport. Performing OCR & element detection to locate editor files.',
      icon: Monitor,
      color: 'bg-blue-500/20 text-blue-400 border-blue-500/30'
    },
    {
      id: '4',
      time: '11:28 AM',
      agent: 'System Manager',
      status: 'warning',
      title: 'Memory Utilization Spike Alert',
      desc: 'RAM exceeded 80% threshold during local LLM model initialization. Automatically scaling model weights down.',
      icon: Cpu,
      color: 'bg-amber-500/20 text-amber-400 border-amber-500/30'
    }
  ];

  const filteredEvents = timelineEvents.filter(event => {
    const matchesAgent = filterAgent === 'All' || event.agent === filterAgent;
    const matchesSearch = event.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          event.desc.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesAgent && matchesSearch;
  });

  return (
    <div className="space-y-6 h-full flex flex-col">
      {/* Header and Controls */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-black text-white tracking-tight flex items-center gap-3">
            <Clock className="text-primary animate-pulse" />
            Activity Timeline
          </h2>
          <p className="text-sm text-slate-400 mt-1">Audit log of system actions, agent behaviors, and autonomous workflows.</p>
        </div>

        {/* Filter Controls */}
        <div className="flex flex-wrap items-center gap-2">
          {['All', 'Commander Agent', 'Desktop Agent', 'File Agent'].map(agent => (
            <button
              key={agent}
              onClick={() => setFilterAgent(agent)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all ${
                filterAgent === agent 
                  ? 'bg-primary text-white border-primary glow-primary' 
                  : 'bg-white/5 border-white/10 text-slate-400 hover:text-white'
              }`}
            >
              {agent.replace(' Agent', '')}
            </button>
          ))}
        </div>
      </div>

      {/* Search Input */}
      <div className="glass-card p-4 flex items-center gap-3 border border-white/5">
        <Search size={18} className="text-slate-500" />
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Filter logs by title, description or tag..."
          className="bg-transparent border-none outline-none w-full text-sm text-slate-200 placeholder:text-slate-500"
        />
      </div>

      {/* Timeline Stream */}
      <div className="flex-1 glass-card p-6 overflow-y-auto border border-white/5 relative">
        {/* Timeline Connecting Line */}
        <div className="absolute left-12 top-6 bottom-6 w-0.5 bg-gradient-to-b from-primary via-indigo-500/50 to-white/5 hidden md:block" />

        <div className="space-y-8 relative z-10">
          {filteredEvents.map((event, index) => (
            <motion.div
              key={event.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="flex flex-col md:flex-row gap-6 relative"
            >
              {/* Event Badge / Time */}
              <div className="flex items-center md:flex-col md:items-end justify-between md:justify-start w-full md:w-24 shrink-0">
                <span className="text-xs font-bold text-slate-500 md:text-right">{event.time}</span>
                <span className="text-[10px] px-2 py-0.5 rounded bg-white/5 border border-white/10 text-slate-400 mt-1 md:text-right font-mono truncate max-w-full">
                  {event.agent}
                </span>
              </div>

              {/* Central Node Icon */}
              <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 border ${event.color} shadow-lg shadow-black/40 hidden md:flex`}>
                <event.icon size={18} />
              </div>

              {/* Event Details Card */}
              <div className="flex-1 p-5 rounded-2xl bg-white/5 border border-white/5 hover:border-white/10 transition-all hover:bg-white/10 flex flex-col md:flex-row md:items-start justify-between gap-4">
                <div className="space-y-1">
                  <h3 className="text-sm font-bold text-white flex items-center gap-2">
                    {event.title}
                    {event.status === 'success' && <CheckCircle size={14} className="text-accent" />}
                    {event.status === 'pending' && <Play size={14} className="text-blue-400 animate-spin" />}
                    {event.status === 'warning' && <AlertCircle size={14} className="text-amber-400" />}
                  </h3>
                  <p className="text-xs text-slate-400 leading-relaxed max-w-2xl">{event.desc}</p>
                </div>
                
                <div className="flex items-center gap-2 shrink-0">
                  <span className={`text-[10px] uppercase font-black px-2 py-1 rounded ${
                    event.status === 'success' ? 'bg-accent/10 text-accent' :
                    event.status === 'pending' ? 'bg-blue-400/10 text-blue-400' :
                    'bg-amber-400/10 text-amber-400'
                  }`}>
                    {event.status}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}

          {filteredEvents.length === 0 && (
            <div className="flex flex-col items-center justify-center py-12 text-slate-500 gap-2">
              <Terminal size={32} className="text-slate-600" />
              <p className="text-sm">No activity events matching filters.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
