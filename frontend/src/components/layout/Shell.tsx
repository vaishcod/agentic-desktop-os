import React, { useEffect, useState } from 'react';
import { 
  LayoutDashboard, 
  Brain, 
  Database, 
  Workflow, 
  Clock, 
  BarChart3, 
  Settings, 
  Zap, 
  User, 
  Server, 
  Cpu, 
  Microscope,
  Send,
  Sparkles,
  Command,
  CircleDot
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useStore } from '../../store/useStore';
import { VoiceControl } from './VoiceControl';

const SidebarItem = ({ icon: Icon, label, active, onClick }: any) => (
  <div 
    onClick={onClick}
    className={`flex items-center gap-3 px-4 py-3.5 rounded-xl cursor-pointer transition-all ${
      active 
        ? 'bg-gradient-to-tr from-primary/20 to-indigo-500/10 border border-primary/30 text-white shadow-lg shadow-primary/5 btn-3d' 
        : 'hover:bg-white/5 border border-transparent text-slate-400 hover:text-white hover:border-white/10'
    }`}
  >
    <Icon size={18} className={active ? 'text-primary text-glow animate-pulse' : 'text-slate-400'} />
    <span className="font-semibold text-sm">{label}</span>
  </div>
);

export const Shell: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { 
    currentPage, 
    setCurrentPage, 
    systemMetrics, 
    updateSystemMetrics,
    addChatMessage,
    addTask
  } = useStore();

  const [commandInput, setCommandInput] = useState('');
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  // Periodically update system metrics to simulate a live operating system
  useEffect(() => {
    const interval = setInterval(() => {
      updateSystemMetrics();
    }, 4000);
    return () => clearInterval(interval);
  }, [updateSystemMetrics]);

  const handleCommandSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!commandInput.trim()) return;

    const userText = commandInput.trim();
    addChatMessage('user', userText);
    setCommandInput('');

    // Simulate AI response based on typed command
    setTimeout(() => {
      let aiResponse = '';
      const lowercaseCmd = userText.toLowerCase();

      if (lowercaseCmd.includes('scan') || lowercaseCmd.includes('status')) {
        aiResponse = "Running diagnostic suite... CPU is stable. Memory is optimal. 3 active agents (Desktop, Vision, File) are fully operational.";
        addTask('Run system diagnostics', 'Commander Agent');
      } else if (lowercaseCmd.includes('deploy') || lowercaseCmd.includes('github') || lowercaseCmd.includes('pages')) {
        aiResponse = "Preparing GitHub Pages deployment bundle. Verifying local build artifact and pushing to remote branch 'main'.";
        addTask('GitHub Pages deployment bundle compilation', 'File Agent');
      } else if (lowercaseCmd.includes('clear') || lowercaseCmd.includes('optimize') || lowercaseCmd.includes('memory')) {
        aiResponse = "Triggering memory garbage collection. Released unused agent contexts. Saved ~400MB.";
        addTask('Optimize local vector memory store', 'Commander Agent');
      } else {
        aiResponse = `Command received: "${userText}". Delegating task to sub-agents. Desktop Agent is monitoring screen context; File Agent is verifying file paths.`;
        addTask(userText, 'Commander Agent');
      }

      addChatMessage('ai', aiResponse);
    }, 1000);
  };

  return (
    <div className="grid grid-cols-[260px_1fr] grid-rows-[70px_1fr_64px] h-screen w-screen bg-background text-slate-200 overflow-hidden font-sans p-4 gap-4">
      
      {/* 1. HEADER (Top Span 2 Columns) */}
      <header className="col-span-2 glass-card flex items-center px-6 justify-between border border-white/5 relative z-20">
        {/* Logo and Brand */}
        <div className="flex items-center gap-3 cursor-pointer" onClick={() => setCurrentPage('landing')}>
          <div className="w-9 h-9 bg-gradient-to-tr from-primary to-accent rounded-xl flex items-center justify-center shadow-lg shadow-primary/20">
            <Zap size={18} className="text-white" fill="currentColor" />
          </div>
          <div>
            <h1 className="text-lg font-black tracking-wider text-white">ANTIGRAVITY</h1>
            <p className="text-[10px] text-accent font-bold tracking-widest uppercase">Agentic OS</p>
          </div>
        </div>

        {/* AI Command Bar */}
        <form onSubmit={handleCommandSubmit} className="flex-1 max-w-2xl mx-8 relative">
          <div className="relative flex items-center bg-white/5 border border-white/10 rounded-full px-5 py-2.5 transition-all focus-within:border-primary/50 focus-within:bg-white/10 group">
            <Command size={16} className="text-primary mr-3 group-focus-within:animate-pulse" />
            <input 
              type="text" 
              value={commandInput}
              onChange={(e) => setCommandInput(e.target.value)}
              placeholder="Ask Antigravity AI or run a shell command..." 
              className="bg-transparent border-none outline-none w-full text-sm text-slate-200 placeholder:text-slate-500 pr-10"
            />
            <button type="submit" className="absolute right-4 hover:text-white text-slate-400 transition-colors">
              <Send size={14} className="hover:text-primary transition-colors" />
            </button>
          </div>
        </form>

        {/* Profile and Quick Actions */}
        <div className="flex items-center gap-4 relative">
          <VoiceControl />
          <div 
            onClick={() => setShowProfileMenu(!showProfileMenu)}
            className="flex items-center gap-2 cursor-pointer p-1.5 rounded-full hover:bg-white/5 transition-all border border-white/10"
          >
            <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-primary via-indigo-600 to-accent flex items-center justify-center text-white font-bold text-sm shadow-md">
              V
            </div>
            <span className="text-xs font-semibold pr-2 text-slate-300 hidden md:inline">vaishcod</span>
          </div>

          {/* Profile Dropdown Menu */}
          <AnimatePresence>
            {showProfileMenu && (
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                className="absolute top-12 right-0 w-56 glass-card border border-white/10 p-2 shadow-2xl z-30"
              >
                <div className="px-4 py-2 border-b border-white/5 mb-2">
                  <p className="text-xs text-slate-500">Logged in as</p>
                  <p className="text-sm font-bold text-white">vaishcod</p>
                </div>
                <div 
                  onClick={() => { setCurrentPage('settings'); setShowProfileMenu(false); }}
                  className="flex items-center gap-2 px-4 py-2 text-sm text-slate-300 hover:bg-white/5 hover:text-white rounded-lg cursor-pointer transition-all"
                >
                  <Settings size={16} />
                  Settings
                </div>
                <div 
                  onClick={() => window.open('https://github.com/vaishcod/agentic-desktop-os', '_blank')}
                  className="flex items-center gap-2 px-4 py-2 text-sm text-slate-300 hover:bg-white/5 hover:text-white rounded-lg cursor-pointer transition-all"
                >
                  <User size={16} />
                  GitHub Repository
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </header>

      {/* 2. SIDEBAR NAVIGATION */}
      <motion.aside 
        initial={{ x: -50, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        className="glass-card flex flex-col p-4 overflow-y-auto border border-white/5"
      >
        <div className="text-[10px] uppercase font-bold tracking-widest text-slate-500 px-4 mb-4">
          Navigation
        </div>
        <nav className="flex-1 space-y-1">
          <SidebarItem icon={LayoutDashboard} label="Dashboard" active={currentPage === 'dashboard'} onClick={() => setCurrentPage('dashboard')} />
          <SidebarItem icon={Brain} label="Workspace" active={currentPage === 'workspace'} onClick={() => setCurrentPage('workspace')} />
          <SidebarItem icon={Database} label="Memory" active={currentPage === 'memory'} onClick={() => setCurrentPage('memory')} />
          <SidebarItem icon={Workflow} label="Automation" active={currentPage === 'automation'} onClick={() => setCurrentPage('automation')} />
          <SidebarItem icon={Clock} label="Timeline" active={currentPage === 'timeline'} onClick={() => setCurrentPage('timeline')} />
          <SidebarItem icon={BarChart3} label="Performance" active={currentPage === 'performance'} onClick={() => setCurrentPage('performance')} />
          <SidebarItem icon={Settings} label="Settings" active={currentPage === 'settings'} onClick={() => setCurrentPage('settings')} />
        </nav>
      </motion.aside>

      {/* 3. MAIN CONTENT AREA */}
      <main className="glass-card overflow-hidden flex flex-col p-6 border border-white/5">
        <div className="flex-1 overflow-y-auto pr-1">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentPage}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.2 }}
              className="h-full"
            >
              {children}
            </motion.div>
          </AnimatePresence>
        </div>
      </main>

      {/* 4. SYSTEM BAR (BOTTOM ROW) */}
      {/* Bottom Left: System Sidebar Tag */}
      <div className="glass-card flex items-center px-6 gap-3 border border-white/5">
        <div className="w-6 h-6 rounded-lg bg-accent/20 flex items-center justify-center">
          <Server size={14} className="text-accent animate-pulse" />
        </div>
        <span className="text-sm font-bold tracking-wider text-white">SYSTEM</span>
        <span className="flex h-2 w-2 relative">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-accent"></span>
        </span>
      </div>

      {/* Bottom Right: Real-time System Metrics Bar */}
      <div className="glass-card flex items-center px-6 justify-between border border-white/5 text-xs text-slate-400">
        
        {/* RAM Metric */}
        <div className="flex items-center gap-3">
          <Database size={14} className="text-primary" />
          <div>
            <span className="text-slate-500 font-medium">Memory: </span>
            <span className="text-white font-bold">{systemMetrics.memory} GB</span>
            <span className="text-slate-600 text-[10px] ml-1">/ 16.0 GB</span>
          </div>
          <div className="w-16 h-1.5 bg-white/5 rounded-full overflow-hidden hidden sm:block">
            <div className="h-full bg-primary" style={{ width: `${(systemMetrics.memory / 16) * 100}%` }} />
          </div>
        </div>

        <div className="h-4 w-[1px] bg-white/10" />

        {/* CPU Metric */}
        <div className="flex items-center gap-3">
          <Cpu size={14} className="text-accent" />
          <div>
            <span className="text-slate-500 font-medium">CPU: </span>
            <span className="text-white font-bold">{systemMetrics.cpu}%</span>
          </div>
          <div className="w-16 h-1.5 bg-white/5 rounded-full overflow-hidden hidden sm:block">
            <div className="h-full bg-accent" style={{ width: `${systemMetrics.cpu}%` }} />
          </div>
        </div>

        <div className="h-4 w-[1px] bg-white/10" />

        {/* Active Agents */}
        <div className="flex items-center gap-2">
          <Microscope size={14} className="text-indigo-400" />
          <div>
            <span className="text-slate-500 font-medium">Agents: </span>
            <span className="text-white font-bold">{systemMetrics.agents} Active</span>
          </div>
        </div>

        <div className="h-4 w-[1px] bg-white/10" />

        {/* Live Activity Feed */}
        <div className="flex items-center gap-2 max-w-xs truncate">
          <CircleDot size={12} className="text-accent animate-ping" />
          <span className="text-[10px] text-slate-500 uppercase tracking-widest font-bold">Activity:</span>
          <span className="text-white font-mono text-[11px] truncate">{systemMetrics.activity}</span>
        </div>

      </div>

    </div>
  );
};
