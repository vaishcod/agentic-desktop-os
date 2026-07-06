import React from 'react';
import { motion } from 'framer-motion';
import { Zap, Shield, Brain, Cpu, ArrowRight, Play, Github } from 'lucide-react';

const FeatureCard = ({ icon: Icon, title, desc }: any) => (
  <motion.div 
    whileHover={{ y: -5 }}
    className="p-8 rounded-3xl bg-white/5 border border-white/10 hover:border-primary/50 transition-all"
  >
    <div className="w-12 h-12 rounded-2xl bg-primary/20 flex items-center justify-center mb-6">
      <Icon size={24} className="text-primary" />
    </div>
    <h3 className="text-xl font-bold text-white mb-4">{title}</h3>
    <p className="text-slate-400 leading-relaxed text-sm">{desc}</p>
  </motion.div>
);

export const LandingPage = ({ onStart }: { onStart: () => void }) => {
  return (
    <div className="min-h-screen bg-background text-white overflow-x-hidden">
      {/* Navbar */}
      <nav className="container mx-auto px-6 py-8 flex justify-between items-center relative z-10">
        <div className="flex items-center gap-3">
          <Zap className="text-primary" fill="currentColor" />
          <span className="text-2xl font-bold tracking-tighter">ANTIGRAVITY</span>
        </div>
        <div className="flex items-center gap-8">
          <a href="#features" className="text-sm text-slate-400 hover:text-white transition-colors">Features</a>
          <a href="#architecture" className="text-sm text-slate-400 hover:text-white transition-colors">Architecture</a>
          <button 
            onClick={onStart}
            className="px-6 py-2.5 rounded-full bg-white text-black font-bold text-sm hover:bg-slate-200 transition-all"
          >
            Launch OS
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <header className="container mx-auto px-6 pt-20 pb-32 relative">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-primary/20 blur-[120px] rounded-full -z-10" />
        
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-xs font-bold tracking-widest text-primary uppercase"
          >
            <Zap size={12} /> The Next Generation of OS
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-6xl md:text-8xl font-black tracking-tighter leading-[0.9]"
          >
            Your Computer, <br /> 
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">Fully Autonomous.</span>
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl text-slate-400 max-w-2xl mx-auto leading-relaxed"
          >
            Antigravity is an AI operating system layer that understands your screen, reasons about tasks, and executes workflows locally.
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="flex items-center justify-center gap-4 pt-4"
          >
            <button 
              onClick={onStart}
              className="px-8 py-4 rounded-2xl bg-primary text-white font-bold flex items-center gap-3 glow-primary hover:bg-primary-hover transition-all"
            >
              Get Started <ArrowRight size={20} />
            </button>
            <button className="px-8 py-4 rounded-2xl bg-white/5 border border-white/10 text-white font-bold flex items-center gap-3 hover:bg-white/10 transition-all">
              <Play size={20} /> Watch Demo
            </button>
          </motion.div>
        </div>
      </header>

      {/* Features Grid */}
      <section id="features" className="container mx-auto px-6 py-32 border-t border-white/5">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <FeatureCard 
            icon={Brain} 
            title="Reasoning First" 
            desc="Commander Agent decomposes complex goals into verifiable steps before any execution happens."
          />
          <FeatureCard 
            icon={Shield} 
            title="Privacy Guarded" 
            desc="Runs local Llama models via Ollama. Your data and actions never leave your machine."
          />
          <FeatureCard 
            icon={Cpu} 
            title="Native Integration" 
            desc="Direct control over files, apps, and clipboard via specialized Python automation agents."
          />
        </div>
      </section>

      {/* Footer */}
      <footer className="container mx-auto px-6 py-12 border-t border-white/5 flex justify-between items-center text-slate-500 text-sm">
        <div>© 2026 Antigravity AI Platform</div>
        <div className="flex gap-6">
          <a href="#" className="hover:text-white transition-colors">Documentation</a>
          <a href="#" className="hover:text-white transition-colors flex items-center gap-2">
            <Github size={16} /> GitHub
          </a>
        </div>
      </footer>
    </div>
  );
};
