import React, { useState } from 'react';
import { Search, Database, Calendar, Tag, HardDrive, Cpu, Layers } from 'lucide-react';
import { KnowledgeGraph } from '../components/dashboard/KnowledgeGraph';

export const MemoryExplorer = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const memories = [
    { title: "Project Layout: Antigravity OS", date: "2 hours ago", type: "Codebase", size: "24 vectors", hash: "0x8F9aC" },
    { title: "Meeting Notes: Multi-Agent Coordination Design", date: "Yesterday", type: "Document", size: "128 vectors", hash: "0x3A2bF" },
    { title: "User Preference: Glassmorphism Theme", date: "3 days ago", type: "Preference", size: "4 vectors", hash: "0x9E7cD" },
    { title: "API Authentication Key Schema", date: "1 week ago", type: "Security", size: "16 vectors", hash: "0x5C8dE" },
    { title: "Docker Container Setup & nixpacks configuration", date: "2 weeks ago", type: "Deployment", size: "64 vectors", hash: "0x2F1aB" },
  ];

  const filteredMemories = memories.filter(item => 
    item.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
    item.type.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6 h-full flex flex-col">
      {/* Header */}
      <div>
        <h2 className="text-3xl font-black text-white tracking-tight flex items-center gap-3">
          <Database className="text-primary" />
          Memory Explorer
        </h2>
        <p className="text-sm text-slate-400 mt-1">Explore vectors, long-term context stores, and relationships in semantic memory.</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="glass-card p-4 flex items-center justify-between border border-white/5">
          <div className="space-y-1">
            <span className="text-[10px] text-slate-500 uppercase tracking-wider font-semibold">Total Embedded Cards</span>
            <div className="text-xl font-bold text-white">6,242</div>
          </div>
          <Layers className="text-primary/70" size={24} />
        </div>
        <div className="glass-card p-4 flex items-center justify-between border border-white/5">
          <div className="space-y-1">
            <span className="text-[10px] text-slate-500 uppercase tracking-wider font-semibold">Dimension Space</span>
            <div className="text-xl font-bold text-white">1536 (Cosine)</div>
          </div>
          <Cpu className="text-accent/70" size={24} />
        </div>
        <div className="glass-card p-4 flex items-center justify-between border border-white/5">
          <div className="space-y-1">
            <span className="text-[10px] text-slate-500 uppercase tracking-wider font-semibold">Memory Index</span>
            <div className="text-xl font-bold text-white">Qdrant DB (Local)</div>
          </div>
          <HardDrive className="text-indigo-400/70" size={24} />
        </div>
      </div>

      {/* Knowledge Graph Rendering */}
      <div className="glass-card p-0 overflow-hidden border border-white/5">
        <div className="p-4 border-b border-white/5 flex items-center justify-between">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Semantic Entity Relationships</span>
          <span className="text-[10px] px-2 py-0.5 rounded bg-primary/10 text-primary font-bold">Interactive Dynamic</span>
        </div>
        <KnowledgeGraph />
      </div>

      {/* Vector Store List */}
      <div className="flex-1 glass-card p-5 overflow-hidden flex flex-col border border-white/5 min-h-[300px]">
        {/* Search Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4 pb-4 border-b border-white/5">
          <div className="flex items-center gap-3 bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 flex-1 max-w-md">
            <Search size={16} className="text-slate-500" />
            <input 
              type="text" 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search vector embeddings..." 
              className="bg-transparent border-none outline-none w-full text-xs text-slate-200"
            />
          </div>
          <span className="text-xs text-slate-500 font-bold">{filteredMemories.length} items found</span>
        </div>

        {/* Memories Stream */}
        <div className="flex-1 overflow-y-auto space-y-3 pr-1 select-text">
          {filteredMemories.map((item, i) => (
            <div 
              key={i} 
              className="p-4 rounded-xl bg-white/5 border border-white/5 hover:border-primary/30 hover:bg-white/10 transition-all cursor-pointer group flex flex-col sm:flex-row sm:items-center justify-between gap-3"
            >
              <div className="space-y-1">
                <div className="flex items-center gap-3">
                  <span className="text-xs font-bold text-white group-hover:text-primary transition-colors">{item.title}</span>
                  <span className="text-[9px] font-mono bg-white/5 px-1.5 py-0.5 rounded text-slate-500">{item.hash}</span>
                </div>
                <div className="flex flex-wrap items-center gap-4 text-[10px] text-slate-500">
                  <span className="flex items-center gap-1">
                    <Calendar size={10} />
                    {item.date}
                  </span>
                  <span className="flex items-center gap-1">
                    <Tag size={10} />
                    Vector Embedded ({item.size})
                  </span>
                </div>
              </div>

              <span className="text-[9px] px-2 py-1 rounded bg-primary/10 text-primary border border-primary/20 uppercase font-black tracking-wider self-start sm:self-center">
                {item.type}
              </span>
            </div>
          ))}

          {filteredMemories.length === 0 && (
            <div className="text-center py-12 text-slate-500 text-xs">
              No vector nodes found matching query.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
