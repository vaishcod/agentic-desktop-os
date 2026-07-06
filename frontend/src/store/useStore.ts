import { create } from 'zustand';

interface AppState {
  currentPage: 'landing' | 'dashboard' | 'workspace' | 'memory' | 'timeline' | 'performance' | 'settings';
  setCurrentPage: (page: AppState['currentPage']) => void;
  
  isAIActive: boolean;
  setAIActive: (active: boolean) => void;
}

export const useStore = create<AppState>((set) => ({
  currentPage: 'landing',
  setCurrentPage: (page) => set({ currentPage: page }),
  
  isAIActive: false,
  setAIActive: (active) => set({ isAIActive: active }),
}));
