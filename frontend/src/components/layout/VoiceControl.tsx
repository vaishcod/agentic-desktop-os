import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mic, MicOff, Waves } from 'lucide-react';

export const VoiceControl = () => {
  const [isListening, setIsListening] = useState(false);

  return (
    <div className="flex items-center gap-3">
      <AnimatePresence>
        {isListening && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="flex gap-1"
          >
            {[1, 2, 3, 4].map((i) => (
              <motion.div 
                key={i}
                animate={{ height: [8, 20, 8] }}
                transition={{ repeat: Infinity, duration: 0.5, delay: i * 0.1 }}
                className="w-1 bg-primary rounded-full"
              />
            ))}
          </motion.div>
        )}
      </AnimatePresence>
      
      <button 
        onClick={() => setIsListening(!isListening)}
        className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${
          isListening ? 'bg-primary text-white glow-primary' : 'bg-white/5 text-slate-400 hover:text-white'
        }`}
      >
        {isListening ? <Mic size={20} /> : <MicOff size={20} />}
      </button>
    </div>
  );
};
