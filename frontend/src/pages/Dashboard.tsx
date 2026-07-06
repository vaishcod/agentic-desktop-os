import React from 'react';
import { motion } from 'framer-motion';
import { Cpu, MemoryStick as Memory, Activity, Globe, FileText, Search } from 'lucide-react';

const StatCard = ({ icon: Icon, label, value, trend }: any) => (
  <div className="glass-card p-6 flex flex-col gap-2">
    <div className="flex items-center justify-between text-slate-500">
      <Icon size={20} />
      <span className="text-xs font-medium text-accent">{trend}</span>
    </div>
    <div className="text-2xl font-bold text-white mt-2">{value}</div>
    <div className="text-sm text-slate-400">{label}</div>
  </div>
);

export const Dashboard = () => {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard icon={Cpu} label="CPU Usage" value="12%" trend="+2%" />
        <StatCard icon={Memory} label="RAM Usage" value="4.2 GB" trend="Stable" />
        <StatCard icon={Activity} label="Active Tasks" value="8" trend="+1" />
        <StatCard icon={Globe} label="Network" value="24 MB/s" trend="Fast" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Activity Timeline */}
        <div className="lg:col-span-2 glass-card p-6">
          <h2 className="text-lg font-bold text-white mb-6">Recent Activity</h2>
          <div className="space-y-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex gap-4 relative">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                  <Activity size={18} className="text-primary" />
                </div>
                <div className="flex-1 pb-6 border-b border-white/5 last:border-0">
                  <div className="text-sm font-medium text-white">Commander Agent initialized task</div>
                  <div className="text-xs text-slate-500 mt-1">11:2{i} AM • Goal: Summarize project structure</div>
                  <div className="flex gap-2 mt-3">
                    <span className="text-[10px] px-2 py-1 rounded bg-white/5 border border-white/10 text-slate-400">Desktop Agent</span>
                    <span className="text-[10px] px-2 py-1 rounded bg-white/5 border border-white/10 text-slate-400">Vision Agent</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Actions / Status */}
        <div className="glass-card p-6">
          <h2 className="text-lg font-bold text-white mb-6">System Health</h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-3 rounded-lg bg-white/5">
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-accent" />
                <span className="text-sm font-medium">PostgreSQL</span>
              </div>
              <span className="text-xs text-slate-500">Connected</span>
            </div>
            <div className="flex items-center justify-between p-3 rounded-lg bg-white/5">
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-accent" />
                <span className="text-sm font-medium">Qdrant</span>
              </div>
              <span className="text-xs text-slate-500">6.2k Vectors</span>
            </div>
            <div className="flex items-center justify-between p-3 rounded-lg bg-white/5">
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-primary" />
                <span className="text-sm font-medium">Ollama</span>
              </div>
              <span className="text-xs text-slate-500">Llama3 Loaded</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
