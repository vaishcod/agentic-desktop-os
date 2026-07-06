import React from 'react';
import { useStore } from '../store/useStore';
import { Cpu, Shield, Zap } from 'lucide-react';

export const Settings = () => {
  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <h2 className="text-3xl font-bold text-white tracking-tight">System Settings</h2>
      
      {/* Model Selection */}
      <section className="glass-card p-8">
        <div className="flex items-center gap-3 mb-6">
          <Cpu className="text-primary" />
          <h3 className="text-xl font-bold text-white">Model Selection</h3>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-6 rounded-2xl bg-primary/10 border border-primary/30 cursor-pointer">
            <div className="flex justify-between items-center mb-4">
               <span className="font-bold text-white">Llama 3 (8B)</span>
               <div className="px-2 py-1 rounded bg-primary text-[10px] font-bold uppercase">Active</div>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">Fast, local execution. Ideal for most desktop automation tasks.</p>
          </div>
          
          <div className="p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-white/20 cursor-pointer transition-all">
            <div className="flex justify-between items-center mb-4">
               <span className="font-bold text-slate-300">GPT-4o Mini</span>
               <div className="px-2 py-1 rounded bg-white/10 text-[10px] font-bold uppercase text-slate-500">Cloud</div>
            </div>
            <p className="text-xs text-slate-500 leading-relaxed">High reasoning capabilities. Requires internet and API key.</p>
          </div>
        </div>
      </section>

      {/* Security & Permissions */}
      <section className="glass-card p-8">
        <div className="flex items-center gap-3 mb-6">
          <Shield className="text-accent" />
          <h3 className="text-xl font-bold text-white">Security & Permissions</h3>
        </div>
        
        <div className="space-y-4">
          {[
            { label: "File System Access", desc: "Allow AI to read and write files in your workspace", enabled: true },
            { label: "Browser Control", desc: "Allow AI to automate browser actions", enabled: false },
            { label: "Screen Capture", desc: "Allow AI to take screenshots for UI understanding", enabled: true },
          ].map((item, i) => (
            <div key={i} className="flex items-center justify-between p-4 rounded-xl bg-white/5 border border-white/10">
              <div>
                <div className="text-sm font-bold text-white">{item.label}</div>
                <div className="text-xs text-slate-500">{item.desc}</div>
              </div>
              <div className={`w-12 h-6 rounded-full p-1 transition-colors ${item.enabled ? 'bg-accent' : 'bg-slate-700'}`}>
                <div className={`w-4 h-4 bg-white rounded-full transition-transform ${item.enabled ? 'translate-x-6' : 'translate-x-0'}`} />
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
