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
    <Icon size={18} className={active ? 'text-primary text-glow' : 'text-slate-400'} />
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

  // Periodically update system metrics to simulate a live OS
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
    <div className="grid grid-cols-[240px_1fr] grid-rows-[64px_1fr_56px] h-screen w-screen bg-background text-slate-200 overflow-hidden font-sans p-3 gap-3">

      {/* ── ROW 1: HEADER (spans both columns) ── */}
      <header className="col-span-2 glass-panel flex items-center px-5 justify-between relative z-20">
        {/* Top shine line */}
        <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent rounded-t-2xl pointer-events-none" />

        {/* Logo */}
        <div
          className="flex items-center gap-3 cursor-pointer select-none"
          onClick={() => setCurrentPage('dashboard')}
        >
          <div className="w-8 h-8 bg-gradient-to-tr from-primary to-accent rounded-xl flex items-center justify-center shadow-lg shadow-primary/30 btn-3d">
            <Zap size={16} className="text-white" fill="currentColor" />
          </div>
          <div>
            <h1 className="text-base font-black tracking-widest text-white leading-none">ANTIGRAVITY</h1>
            <p className="text-[9px] text-accent font-bold tracking-widest uppercase leading-none mt-0.5">Agentic OS</p>
          </div>
        </div>

        {/* AI Command Bar */}
        <form onSubmit={handleCommandSubmit} className="flex-1 max-w-2xl mx-6">
          <div className="relative flex items-center bg-white/5 border border-white/10 rounded-full px-4 py-2 transition-all focus-within:border-primary/50 focus-within:bg-white/[0.08] group">
            <Command size={14} className="text-primary mr-2.5 shrink-0 group-focus-within:animate-pulse" />
            <input
              type="text"
              value={commandInput}
              onChange={(e) => setCommandInput(e.target.value)}
              placeholder="Ask Antigravity AI or run a command..."
              className="bg-transparent border-none outline-none w-full text-sm text-slate-200 placeholder:text-slate-500 pr-8"
            />
            <button
              type="submit"
              className="absolute right-3 text-slate-500 hover:text-primary transition-colors"
            >
              <Send size={13} />
            </button>
          </div>
        </form>

        {/* Profile */}
        <div className="flex items-center gap-3 relative">
          <VoiceControl />
          <div
            onClick={() => setShowProfileMenu(!showProfileMenu)}
            className="flex items-center gap-2 cursor-pointer px-2 py-1 rounded-full hover:bg-white/5 border border-transparent hover:border-white/10 transition-all"
          >
            <div className="w-7 h-7 rounded-full bg-gradient-to-tr from-primary via-indigo-500 to-accent flex items-center justify-center text-white font-bold text-xs shadow-md">
              V
            </div>
            <span className="text-xs font-semibold text-slate-300 hidden md:inline">vaishcod</span>
          </div>

          <AnimatePresence>
            {showProfileMenu && (
              <motion.div
                initial={{ opacity: 0, y: 8, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 8, scale: 0.95 }}
                className="absolute top-11 right-0 w-52 glass-panel border border-white/10 p-2 shadow-2xl z-30"
              >
                <div className="px-3 py-2 border-b border-white/5 mb-1">
                  <p className="text-[10px] text-slate-500">Signed in as</p>
                  <p className="text-sm font-bold text-white">vaishcod</p>
                </div>
                <div
                  onClick={() => { setCurrentPage('settings'); setShowProfileMenu(false); }}
                  className="flex items-center gap-2 px-3 py-2 text-sm text-slate-300 hover:bg-white/5 hover:text-white rounded-lg cursor-pointer transition-all"
                >
                  <Settings size={14} /> Settings
                </div>
                <div
                  onClick={() => window.open('https://github.com/vaishcod/agentic-desktop-os', '_blank')}
                  className="flex items-center gap-2 px-3 py-2 text-sm text-slate-300 hover:bg-white/5 hover:text-white rounded-lg cursor-pointer transition-all"
                >
                  <User size={14} /> GitHub Repository
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </header>

      {/* ── ROW 2 LEFT: SIDEBAR NAVIGATION ── */}
      <motion.aside
        initial={{ x: -40, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        className="glass-panel flex flex-col p-3 overflow-y-auto relative"
      >
        <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent rounded-t-2xl pointer-events-none" />

        <div className="text-[9px] uppercase font-black tracking-widest text-slate-600 px-4 mb-3">
          Navigation
        </div>
        <nav className="flex-1 space-y-1">
          <SidebarItem icon={LayoutDashboard} label="Dashboard"   active={currentPage === 'dashboard'}   onClick={() => setCurrentPage('dashboard')} />
          <SidebarItem icon={Brain}           label="Workspace"   active={currentPage === 'workspace'}   onClick={() => setCurrentPage('workspace')} />
          <SidebarItem icon={Database}        label="Memory"      active={currentPage === 'memory'}      onClick={() => setCurrentPage('memory')} />
          <SidebarItem icon={Workflow}        label="Automation"  active={currentPage === 'automation'}  onClick={() => setCurrentPage('automation')} />
          <SidebarItem icon={Clock}           label="Timeline"    active={currentPage === 'timeline'}    onClick={() => setCurrentPage('timeline')} />
          <SidebarItem icon={BarChart3}       label="Performance" active={currentPage === 'performance'} onClick={() => setCurrentPage('performance')} />
          <SidebarItem icon={Settings}        label="Settings"    active={currentPage === 'settings'}    onClick={() => setCurrentPage('settings')} />
        </nav>
      </motion.aside>

      {/* ── ROW 2 RIGHT: MAIN CONTENT ── */}
      <main className="glass-panel overflow-hidden flex flex-col relative">
        <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent rounded-t-2xl pointer-events-none" />
        <div className="flex-1 overflow-y-auto p-5">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentPage}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.18 }}
              className="h-full"
            >
              {children}
            </motion.div>
          </AnimatePresence>
        </div>
      </main>

      {/* ── ROW 3 LEFT: SYSTEM TAG ── */}
      <div className="glass-panel flex items-center px-5 gap-3 relative">
        <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent rounded-t-2xl pointer-events-none" />
        <div className="w-6 h-6 rounded-lg bg-accent/20 border border-accent/20 flex items-center justify-center">
          <Server size={13} className="text-accent" />
        </div>
        <span className="text-xs font-black tracking-widest text-white uppercase">System</span>
        <span className="flex h-2 w-2 relative ml-auto">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75" />
          <span className="relative inline-flex rounded-full h-2 w-2 bg-accent" />
        </span>
      </div>

      {/* ── ROW 3 RIGHT: LIVE METRICS BAR ── */}
      <div className="glass-panel flex items-center px-5 justify-between text-xs text-slate-400 relative gap-2">
        <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent rounded-t-2xl pointer-events-none" />

        {/* Memory */}
        <div className="flex items-center gap-2.5">
          <Database size={13} className="text-primary shrink-0" />
          <div className="whitespace-nowrap">
            <span className="text-slate-500 font-medium">Memory </span>
            <span className="text-white font-bold">{systemMetrics.memory} GB</span>
          </div>
          <div className="w-14 h-1 bg-white/5 rounded-full overflow-hidden hidden sm:block">
            <div className="h-full bg-primary rounded-full transition-all duration-700" style={{ width: `${(systemMetrics.memory / 16) * 100}%` }} />
          </div>
        </div>

        <div className="h-3 w-px bg-white/10 shrink-0" />

        {/* CPU */}
        <div className="flex items-center gap-2.5">
          <Cpu size={13} className="text-accent shrink-0" />
          <div className="whitespace-nowrap">
            <span className="text-slate-500 font-medium">CPU </span>
            <span className="text-white font-bold">{systemMetrics.cpu}%</span>
          </div>
          <div className="w-14 h-1 bg-white/5 rounded-full overflow-hidden hidden sm:block">
            <div className="h-full bg-accent rounded-full transition-all duration-700" style={{ width: `${systemMetrics.cpu}%` }} />
          </div>
        </div>

        <div className="h-3 w-px bg-white/10 shrink-0" />

        {/* Agents */}
        <div className="flex items-center gap-2">
          <Microscope size={13} className="text-indigo-400 shrink-0" />
          <span className="whitespace-nowrap">
            <span className="text-slate-500 font-medium">Agents </span>
            <span className="text-white font-bold">{systemMetrics.agents} Active</span>
          </span>
        </div>

        <div className="h-3 w-px bg-white/10 shrink-0" />

        {/* Activity */}
        <div className="flex items-center gap-2 min-w-0 flex-1">
          <CircleDot size={11} className="text-accent animate-pulse shrink-0" />
          <span className="text-[10px] text-slate-500 uppercase tracking-widest font-bold shrink-0">Activity</span>
          <span className="text-white font-mono text-[10px] truncate">{systemMetrics.activity}</span>
        </div>
      </div>

    </div>
  );
};
