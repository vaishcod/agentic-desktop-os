import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Zap, Clock, Cpu, BarChart3 } from 'lucide-react';

const data = [
  { time: '10:00', latency: 400, tokens: 2400 },
  { time: '10:15', latency: 300, tokens: 1398 },
  { time: '10:30', latency: 200, tokens: 9800 },
  { time: '10:45', latency: 278, tokens: 3908 },
  { time: '11:00', latency: 189, tokens: 4800 },
  { time: '11:15', latency: 239, tokens: 3800 },
  { time: '11:30', latency: 349, tokens: 4300 },
];

export const PerformanceDashboard = () => {
  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold text-white tracking-tight">Performance Analytics</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="glass-card p-6">
          <div className="flex items-center gap-3 text-slate-500 mb-2">
            <Clock size={18} />
            <span className="text-xs font-bold uppercase tracking-wider">Avg Latency</span>
          </div>
          <div className="text-2xl font-bold text-white">245ms</div>
        </div>
        <div className="glass-card p-6">
          <div className="flex items-center gap-3 text-slate-500 mb-2">
            <Zap size={18} />
            <span className="text-xs font-bold uppercase tracking-wider">Token Throughput</span>
          </div>
          <div className="text-2xl font-bold text-white">12.4k / min</div>
        </div>
        <div className="glass-card p-6">
          <div className="flex items-center gap-3 text-slate-500 mb-2">
            <Cpu size={18} />
            <span className="text-xs font-bold uppercase tracking-wider">Model Load</span>
          </div>
          <div className="text-2xl font-bold text-white">Llama 3 @ 84%</div>
        </div>
      </div>

      <div className="glass-card p-8">
        <div className="flex items-center gap-3 mb-8">
          <BarChart3 className="text-primary" />
          <h3 className="text-xl font-bold text-white">Execution Metrics</h3>
        </div>
        
        <div className="h-[400px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data}>
              <defs>
                <linearGradient id="colorLatency" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
                </linearGradient>
                <linearGradient id="colorTokens" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#222" vertical={false} />
              <XAxis dataKey="time" stroke="#555" fontSize={12} tickLine={false} axisLine={false} />
              <YAxis stroke="#555" fontSize={12} tickLine={false} axisLine={false} />
              <Tooltip 
                contentStyle={{ backgroundColor: '#111', border: '1px solid #333', borderRadius: '12px' }}
                itemStyle={{ fontSize: '12px' }}
              />
              <Area 
                type="monotone" 
                dataKey="latency" 
                stroke="#6366f1" 
                fillOpacity={1} 
                fill="url(#colorLatency)" 
                strokeWidth={3}
              />
              <Area 
                type="monotone" 
                dataKey="tokens" 
                stroke="#10b981" 
                fillOpacity={1} 
                fill="url(#colorTokens)" 
                strokeWidth={3}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};
