import React from 'react';
import { LayoutDashboard, Brain, Database, Activity, Cpu, Settings, Zap, BarChart3 } from 'lucide-react';
import { motion } from 'framer-motion';
import { useStore } from '../../store/useStore';
import { VoiceControl } from './VoiceControl';

const SidebarItem = ({ icon: Icon, label, active, onClick }: any) => (
  <div 
    onClick={onClick}
    className={`flex items-center gap-3 px-4 py-3 rounded-xl cursor-pointer transition-all ${active ? 'bg-primary text-white glow-primary' : 'hover:bg-white/5 text-slate-400 hover:text-white'}`}
  >
    <Icon size={20} />
    <span className="font-medium">{label}</span>
  </div>
);

export const Shell: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { currentPage, setCurrentPage } = useStore();
    <div className="flex h-screen w-screen bg-background overflow-hidden p-4 gap-4">
      {/* Sidebar */}
      <motion.aside 
        initial={{ x: -100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        className="w-64 glass-card flex flex-col p-4"
      >
        <div className="flex items-center gap-3 px-4 mb-8">
          <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center glow-primary">
            <Zap size={20} className="text-white" />
          </div>
          <h1 className="text-xl font-bold tracking-tight text-white">Antigravity</h1>
        </div>

        <nav className="flex-1 space-y-2">
          <SidebarItem icon={LayoutDashboard} label="Dashboard" active={currentPage === 'dashboard'} onClick={() => setCurrentPage('dashboard')} />
          <SidebarItem icon={Brain} label="AI Workspace" active={currentPage === 'workspace'} onClick={() => setCurrentPage('workspace')} />
          <SidebarItem icon={Database} label="Memory" active={currentPage === 'memory'} onClick={() => setCurrentPage('memory')} />
          <SidebarItem icon={Activity} label="Timeline" active={currentPage === 'timeline'} onClick={() => setCurrentPage('timeline')} />
          <SidebarItem icon={BarChart3} label="Performance" active={currentPage === 'performance'} onClick={() => setCurrentPage('performance')} />
        </nav>

        <div className="mt-auto space-y-2">
          <SidebarItem 
            icon={Settings} 
            label="Settings" 
            active={currentPage === 'settings'} 
            onClick={() => setCurrentPage('settings')} 
          />
          <div className="p-4 rounded-xl bg-white/5 border border-white/5 mt-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs text-slate-500">System Status</span>
              <div className="w-2 h-2 rounded-full bg-accent animate-pulse" />
            </div>
            <div className="text-sm font-medium">Llama 3 Active</div>
          </div>
        </div>
      </motion.aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col gap-4 overflow-hidden">
        {/* Top Header/Command Bar */}
        <header className="h-16 glass-card flex items-center px-6 justify-between">
          <div className="flex-1 max-w-2xl bg-white/5 border border-white/10 rounded-full px-4 py-2 flex items-center gap-3">
            <Zap size={16} className="text-primary" />
            <input 
              type="text" 
              placeholder="Type a command or ask Antigravity..." 
              className="bg-transparent border-none outline-none w-full text-sm text-slate-200 placeholder:text-slate-500"
            />
          </div>
          <div className="flex items-center gap-4 ml-4">
             <VoiceControl />
             <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-primary to-accent border border-white/20" />
          </div>
        </header>

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto pr-2">
          {children}
        </div>
      </main>
    </div>
  );
};
