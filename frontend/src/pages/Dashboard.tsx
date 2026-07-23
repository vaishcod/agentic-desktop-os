import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Send, 
  Sparkles, 
  Terminal, 
  Layers, 
  TrendingUp, 
  CheckCircle2, 
  Play, 
  Loader2, 
  Info,
  ChevronRight,
  Command,
  Zap,
  Activity,
  Cpu
} from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { useStore } from '../store/useStore';

// Simulated chart data
const chartData = [
  { time: '11:00', cpu: 15, mem: 4.1 },
  { time: '11:05', cpu: 22, mem: 4.2 },
  { time: '11:10', cpu: 12, mem: 4.2 },
  { time: '11:15', cpu: 28, mem: 4.3 },
  { time: '11:20', cpu: 18, mem: 4.2 },
  { time: '11:25', cpu: 32, mem: 4.4 },
  { time: '11:30', cpu: 24, mem: 4.3 },
];

export const Dashboard = () => {
  const { 
    chatMessages, 
    addChatMessage, 
    tasks, 
    addTask,
    updateTaskStatus
  } = useStore();

  const [chatInput, setChatInput] = useState('');
  const chatEndRef = useRef<HTMLDivElement>(null);

  // Auto scroll chat to bottom
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatMessages]);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatInput.trim()) return;

    const userText = chatInput.trim();
    addChatMessage('user', userText);
    setChatInput('');

    // Simulate AI response
    setTimeout(() => {
      let aiResponse = '';
      const lowercaseText = userText.toLowerCase();

      if (lowercaseText.includes('performance') || lowercaseText.includes('chart') || lowercaseText.includes('cpu')) {
        aiResponse = "Telemetry charts updated. CPU load has stabilized. Core temperatures are optimal at 42°C.";
        addTask('Generate performance analytics', 'Commander Agent');
      } else if (lowercaseText.includes('task') || lowercaseText.includes('work')) {
        aiResponse = "I've added the task request to the active Agent Queue. Sub-agents are standing by.";
        addTask('Audit local configuration files', 'File Agent');
      } else if (lowercaseText.includes('deploy')) {
        aiResponse = "Compiling build artifacts. Pushing git commit for 'vaishcod' remote GitHub repository.";
        addTask('Push project build to GitHub Pages', 'System Manager');
      } else {
        aiResponse = `Analyzing desktop viewport and context. Task added to queue: "${userText}"`;
        addTask(userText, 'Desktop Agent');
      }

      addChatMessage('ai', aiResponse);
    }, 1000);
  };

  const handleTriggerTask = (taskId: string, currentStatus: string) => {
    if (currentStatus === 'completed') {
      updateTaskStatus(taskId, 'pending');
      setTimeout(() => updateTaskStatus(taskId, 'running'), 1000);
      setTimeout(() => updateTaskStatus(taskId, 'completed'), 4000);
    } else if (currentStatus === 'pending') {
      updateTaskStatus(taskId, 'running');
      setTimeout(() => updateTaskStatus(taskId, 'completed'), 3000);
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-full flex-col p-1">
      
      {/* LEFT COLUMN: AI Chat & Charts */}
      <div className="lg:col-span-2 flex flex-col gap-6 h-full">
        
        {/* 1. AI CHAT PANEL */}
        <div className="glass-panel card-3d flex-1 p-5 flex flex-col h-[380px] border border-white/5 relative overflow-hidden">
          {/* Subtle top reflection overlay */}
          <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent" />
          
          <div className="flex items-center justify-between pb-3 border-b border-white/5 mb-4">
            <div className="flex items-center gap-2">
              <Sparkles size={16} className="text-primary animate-pulse text-glow" />
              <h2 className="text-sm font-bold text-white uppercase tracking-wider font-sans">Antigravity AI Chat</h2>
            </div>
            <span className="text-[10px] bg-accent/10 border border-accent/20 text-accent font-bold px-2 py-0.5 rounded-full flex items-center gap-1 glow-accent">
              <span className="w-1 h-1 rounded-full bg-accent animate-ping" />
              Active Context
            </span>
          </div>

          {/* Messages Stream */}
          <div className="flex-1 overflow-y-auto space-y-4 pr-1 mb-4 select-text">
            {chatMessages.map((msg) => (
              <div 
                key={msg.id} 
                className={`flex gap-3 max-w-[85%] ${msg.sender === 'user' ? 'ml-auto flex-row-reverse' : 'mr-auto'}`}
              >
                <div className={`w-7 h-7 rounded-lg shrink-0 flex items-center justify-center text-xs font-bold ${
                  msg.sender === 'user' ? 'bg-accent/20 text-accent border border-accent/30 shadow-[0_0_10px_rgba(16,185,129,0.2)]' : 'bg-primary/20 text-primary border border-primary/30 shadow-[0_0_10px_rgba(99,102,241,0.2)]'
                }`}>
                  {msg.sender === 'user' ? 'U' : 'A'}
                </div>
                <div>
                  <div className={`p-3.5 rounded-2xl text-xs leading-relaxed ${
                    msg.sender === 'user' 
                      ? 'bg-gradient-to-tr from-accent/25 to-accent/10 text-white rounded-tr-none border border-accent/20' 
                      : 'bg-white/5 text-slate-200 rounded-tl-none border border-white/5 shadow-inner'
                  }`}>
                    {msg.text}
                  </div>
                  <span className="text-[9px] text-slate-600 mt-1 block px-1">{msg.timestamp}</span>
                </div>
              </div>
            ))}
            <div ref={chatEndRef} />
          </div>

          {/* Message Input Form */}
          <form onSubmit={handleSendMessage} className="relative mt-auto">
            <input 
              type="text" 
              value={chatInput}
              onChange={(e) => setChatInput(e.target.value)}
              placeholder="Message your desktop operating assistant..." 
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3.5 outline-none text-xs focus:border-primary/50 transition-colors pr-12 text-slate-200"
            />
            <button 
              type="submit" 
              className="absolute right-2 top-1/2 -translate-y-1/2 w-9 h-9 bg-primary rounded-lg flex items-center justify-center text-white btn-3d"
            >
              <Send size={14} />
            </button>
          </form>
        </div>

        {/* 2. CHARTS PANEL */}
        <div className="glass-panel card-3d p-5 border border-white/5 relative">
          <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent" />
          
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <TrendingUp size={16} className="text-primary text-glow" />
              <h2 className="text-sm font-bold text-white uppercase tracking-wider">Telemetry Charts</h2>
            </div>
            <div className="flex gap-4 text-[10px] text-slate-500 font-semibold">
              <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-primary" />
                CPU load
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-accent" />
                VRAM Cache
              </div>
            </div>
          </div>

          <div className="h-[180px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData} margin={{ top: 0, right: 0, left: -25, bottom: 0 }}>
                <defs>
                  <linearGradient id="chartCpu" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#6366f1" stopOpacity={0.25}/>
                    <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="chartMem" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.25}/>
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#222" vertical={false} />
                <XAxis dataKey="time" stroke="#555" fontSize={10} tickLine={false} axisLine={false} />
                <YAxis stroke="#555" fontSize={10} tickLine={false} axisLine={false} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#111', border: '1px solid #222', borderRadius: '8px' }}
                  itemStyle={{ fontSize: '10px' }}
                />
                <Area 
                  type="monotone" 
                  dataKey="cpu" 
                  stroke="#6366f1" 
                  fillOpacity={1} 
                  fill="url(#chartCpu)" 
                  strokeWidth={2}
                />
                <Area 
                  type="monotone" 
                  dataKey="mem" 
                  stroke="#10b981" 
                  fillOpacity={1} 
                  fill="url(#chartMem)" 
                  strokeWidth={2}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

      </div>

      {/* RIGHT COLUMN: TASK CARDS QUEUE */}
      <div className="flex flex-col gap-6 h-full">
        
        {/* TASK CARDS */}
        <div className="glass-panel card-3d flex-1 p-5 border border-white/5 flex flex-col h-full overflow-hidden relative">
          <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent" />
          
          <div className="flex items-center justify-between pb-3 border-b border-white/5 mb-4">
            <div className="flex items-center gap-2">
              <Layers size={16} className="text-primary text-glow" />
              <h2 className="text-sm font-bold text-white uppercase tracking-wider">Agent Tasks</h2>
            </div>
            <span className="text-[10px] text-slate-500 font-bold">{tasks.length} Queue</span>
          </div>

          {/* Cards List */}
          <div className="flex-1 overflow-y-auto space-y-3 pr-1 select-text">
            {tasks.map((task) => (
              <div 
                key={task.id}
                className="p-4 rounded-xl bg-white/5 border border-white/5 hover:border-white/10 transition-all flex flex-col justify-between gap-3 group relative overflow-hidden"
              >
                {/* Active glow pulse */}
                {task.status === 'running' && (
                  <div className="absolute inset-0 bg-primary/[0.04] border border-primary/30 animate-pulse rounded-xl" />
                )}

                <div className="flex justify-between items-start gap-2 relative z-10">
                  <div className="space-y-1 flex-1">
                    <h3 className="text-xs font-bold text-white leading-snug group-hover:text-primary transition-colors">
                      {task.title}
                    </h3>
                    <div className="flex items-center gap-2 text-[10px] text-slate-500">
                      <span className="font-bold text-slate-400">{task.agent}</span>
                      <span>•</span>
                      <span>{task.timestamp}</span>
                    </div>
                  </div>

                  {/* Icon Status */}
                  <div className="shrink-0">
                    {task.status === 'completed' && <CheckCircle2 size={16} className="text-accent" />}
                    {task.status === 'running' && <Loader2 size={16} className="text-primary animate-spin" />}
                    {task.status === 'pending' && <Info size={16} className="text-slate-500" />}
                  </div>
                </div>

                <div className="flex justify-between items-center mt-1 relative z-10">
                  <span className={`text-[9px] font-extrabold uppercase px-1.5 py-0.5 rounded border ${
                    task.status === 'completed' ? 'bg-accent/10 text-accent border-accent/20 glow-accent' :
                    task.status === 'running' ? 'bg-primary/10 text-primary border-primary/20' :
                    'bg-white/5 text-slate-500 border-white/10'
                  }`}>
                    {task.status}
                  </span>

                  <button 
                    onClick={() => handleTriggerTask(task.id, task.status)}
                    className="opacity-0 group-hover:opacity-100 flex items-center gap-1 text-[9px] font-bold text-slate-300 hover:text-white transition-opacity bg-white/5 border border-white/10 px-2.5 py-1 rounded btn-3d"
                  >
                    {task.status === 'completed' ? 'Redo' : 'Run'}
                    <ChevronRight size={10} />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Quick Stats Summary */}
          <div className="mt-4 pt-4 border-t border-white/5 grid grid-cols-2 gap-2 text-center text-xs">
            <div className="p-2.5 rounded-lg bg-white/5 border border-white/5">
              <span className="text-[10px] text-slate-500 uppercase tracking-widest block font-medium">Completed</span>
              <span className="text-base font-bold text-accent">{tasks.filter(t => t.status === 'completed').length}</span>
            </div>
            <div className="p-2.5 rounded-lg bg-white/5 border border-white/5">
              <span className="text-[10px] text-slate-500 uppercase tracking-widest block font-medium">Active Tasks</span>
              <span className="text-base font-bold text-primary">{tasks.filter(t => t.status !== 'completed').length}</span>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
};
