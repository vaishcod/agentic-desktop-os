import { Search, Database, Calendar, Tag, Share2 } from 'lucide-react';
import { KnowledgeGraph } from '../components/dashboard/KnowledgeGraph';

export const MemoryExplorer = () => {
  return (
    <div className="flex flex-col gap-6 h-full">
      <div className="glass-card p-6">
        <div className="flex items-center gap-4 bg-white/5 border border-white/10 rounded-xl px-4 py-3">
          <Search size={20} className="text-slate-500" />
          <input 
            type="text" 
            placeholder="Search through long-term memory..." 
            className="bg-transparent border-none outline-none w-full text-slate-200"
          />
        </div>
      </div>

      <KnowledgeGraph />

      <div className="flex-1 glass-card p-6 overflow-hidden flex flex-col">
        <h2 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
          <Database size={20} className="text-primary" />
          Knowledge Base
        </h2>
        
        <div className="flex-1 overflow-y-auto space-y-4">
          {[
            { title: "Project: Antigravity OS", date: "2 hours ago", type: "Codebase" },
            { title: "Meeting Notes: AI Architecture", date: "Yesterday", type: "Document" },
            { title: "User Preference: Dark Mode", date: "3 days ago", type: "Setting" },
          ].map((item, i) => (
            <div key={i} className="p-4 rounded-xl bg-white/5 border border-white/10 hover:border-primary/30 transition-all cursor-pointer group">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-bold text-white group-hover:text-primary transition-colors">{item.title}</span>
                <span className="text-[10px] px-2 py-1 rounded bg-primary/10 text-primary">{item.type}</span>
              </div>
              <div className="flex items-center gap-4 text-xs text-slate-500">
                <div className="flex items-center gap-1">
                  <Calendar size={12} />
                  {item.date}
                </div>
                <div className="flex items-center gap-1">
                  <Tag size={12} />
                  Vector Embedded
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
