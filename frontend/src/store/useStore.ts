import { create } from 'zustand';

interface AppState {
  currentPage: 'landing' | 'dashboard' | 'workspace' | 'memory' | 'automation' | 'timeline' | 'performance' | 'settings';
  setCurrentPage: (page: AppState['currentPage']) => void;
  
  isAIActive: boolean;
  setAIActive: (active: boolean) => void;

  systemMetrics: {
    cpu: number;
    memory: number;
    agents: number;
    activity: string;
  };
  updateSystemMetrics: () => void;

  tasks: Array<{
    id: string;
    title: string;
    status: 'pending' | 'running' | 'completed';
    agent: string;
    timestamp: string;
  }>;
  addTask: (title: string, agent: string) => void;
  updateTaskStatus: (id: string, status: 'pending' | 'running' | 'completed') => void;

  chatMessages: Array<{
    id: string;
    sender: 'user' | 'ai';
    text: string;
    timestamp: string;
  }>;
  addChatMessage: (sender: 'user' | 'ai', text: string) => void;
}

export const useStore = create<AppState>((set) => ({
  currentPage: 'dashboard',
  setCurrentPage: (page) => set({ currentPage: page }),
  
  isAIActive: true,
  setAIActive: (active) => set({ isAIActive: active }),

  systemMetrics: {
    cpu: 12,
    memory: 4.2,
    agents: 3,
    activity: 'Idle'
  },
  updateSystemMetrics: () => set((state) => ({
    systemMetrics: {
      cpu: Math.floor(Math.random() * 25) + 5,
      memory: parseFloat((4.0 + Math.random() * 0.5).toFixed(1)),
      agents: state.systemMetrics.agents,
      activity: Math.random() > 0.5 ? 'Executing sub-agent delegator' : 'Analyzing screen context'
    }
  })),

  tasks: [
    { id: '1', title: 'Review recent codebase changes in VS Code', status: 'completed', agent: 'Commander Agent', timestamp: '11:20 AM' },
    { id: '2', title: 'Parse nixpacks.toml configurations', status: 'running', agent: 'File Agent', timestamp: '11:22 AM' },
    { id: '3', title: 'Capture active window screen and elements', status: 'pending', agent: 'Desktop Agent', timestamp: '11:25 AM' },
  ],
  addTask: (title, agent) => set((state) => ({
    tasks: [
      ...state.tasks,
      {
        id: Math.random().toString(),
        title,
        status: 'pending',
        agent,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }
    ]
  })),
  updateTaskStatus: (id, status) => set((state) => ({
    tasks: state.tasks.map(t => t.id === id ? { ...t, status } : t)
  })),

  chatMessages: [
    { id: '1', sender: 'ai', text: "Hello! I am Antigravity AI, your desktop agent operating system. How can I assist you today?", timestamp: '11:15 AM' },
  ],
  addChatMessage: (sender, text) => set((state) => ({
    chatMessages: [
      ...state.chatMessages,
      {
        id: Math.random().toString(),
        sender,
        text,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }
    ]
  })),
}));
