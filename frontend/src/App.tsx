import React from 'react'
import { Shell } from './components/layout/Shell'
import { Dashboard } from './pages/Dashboard'
import { AIWorkspace } from './pages/AIWorkspace'
import { MemoryExplorer } from './pages/MemoryExplorer'
import { AutomationBuilder } from './pages/AutomationBuilder'
import { LandingPage } from './pages/LandingPage'
import { Settings } from './pages/Settings'
import { PerformanceDashboard } from './pages/PerformanceDashboard'
import { useStore } from './store/useStore'

function App() {
  const { currentPage, setCurrentPage } = useStore();

  if (currentPage === 'landing') {
    return <LandingPage onStart={() => setCurrentPage('dashboard')} />;
  }

  const renderPage = () => {
    switch (currentPage) {
      case 'dashboard':
        return <Dashboard />;
      case 'workspace':
        return <AIWorkspace />;
      case 'memory':
        return <MemoryExplorer />;
      case 'timeline':
        return <AutomationBuilder />;
      case 'performance':
        return <PerformanceDashboard />;
      case 'settings':
        return <Settings />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <Shell>
      {renderPage()}
    </Shell>
  )
}

export default App
