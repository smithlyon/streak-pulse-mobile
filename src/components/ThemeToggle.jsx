import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Moon } from 'lucide-react';

export const ThemeToggle = ({ activeTheme, onSelectTheme }) => {
  return (
    <div className="px-4 py-2 flex items-center justify-between">
      <div className="flex items-center gap-1.5 text-xs text-slate-400 font-medium">
        <Moon className="w-3.5 h-3.5 text-slate-400" />
        <span>Theme</span>
      </div>

      <div className="relative p-1 rounded-2xl bg-black/40 border border-white/10 flex items-center gap-1 shadow-inner">
        {/* Jojo Button */}
        <button
          onClick={() => onSelectTheme('jojo')}
          className={`relative px-3 py-1 text-xs font-semibold rounded-xl transition-colors duration-200 z-10 flex items-center gap-1.5 ${
            activeTheme === 'jojo' ? 'text-slate-950 font-bold' : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          {activeTheme === 'jojo' && (
            <motion.div
              layoutId="activeThemeHighlight"
              className="absolute inset-0 rounded-xl bg-gradient-to-r from-sky-400 to-cyan-400 shadow-[0_0_12px_rgba(56,189,248,0.5)] -z-10"
              transition={{ type: "spring", stiffness: 450, damping: 30 }}
            />
          )}
          <span className="w-2 h-2 rounded-full bg-sky-400 shadow-[0_0_6px_#38bdf8]" />
          <span>Jojo</span>
        </button>

        {/* Chocks Button */}
        <button
          onClick={() => onSelectTheme('chocks')}
          className={`relative px-3 py-1 text-xs font-semibold rounded-xl transition-colors duration-200 z-10 flex items-center gap-1.5 ${
            activeTheme === 'chocks' ? 'text-slate-950 font-bold' : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          {activeTheme === 'chocks' && (
            <motion.div
              layoutId="activeThemeHighlight"
              className="absolute inset-0 rounded-xl bg-gradient-to-r from-purple-400 to-fuchsia-400 shadow-[0_0_12px_rgba(192,132,252,0.5)] -z-10"
              transition={{ type: "spring", stiffness: 450, damping: 30 }}
            />
          )}
          <span className="w-2 h-2 rounded-full bg-purple-400 shadow-[0_0_6px_#c084fc]" />
          <span>Chocks</span>
        </button>
      </div>
    </div>
  );
};
