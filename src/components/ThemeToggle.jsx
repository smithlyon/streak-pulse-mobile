import React from 'react';
import { motion } from 'framer-motion';

export const ThemeToggle = ({ activeTheme, onSelectTheme }) => {
  const isJojo = activeTheme === 'jojo';

  return (
    <div className="px-4 py-1.5 flex items-center justify-center">
      <div className="relative p-1 rounded-2xl bg-black/50 border border-white/10 flex items-center gap-1 shadow-lg backdrop-blur-md">
        {/* Jojo Profile Button */}
        <button
          type="button"
          onClick={() => onSelectTheme('jojo')}
          className={`relative px-4 py-1.5 text-xs font-bold rounded-xl transition-all duration-200 z-10 flex items-center gap-2 select-none ${
            isJojo ? 'text-slate-950 font-black' : 'text-slate-400 hover:text-white'
          }`}
        >
          {isJojo && (
            <motion.div
              layoutId="activeThemeHighlight"
              className="absolute inset-0 rounded-xl bg-gradient-to-r from-sky-400 to-cyan-400 shadow-[0_0_14px_rgba(56,189,248,0.6)] -z-10"
              transition={{ type: "spring", stiffness: 450, damping: 30 }}
            />
          )}
          <span className="w-2 h-2 rounded-full bg-sky-400 shadow-[0_0_6px_#38bdf8]" />
          <span>⚡ Jojo</span>
        </button>

        {/* Chocks Profile Button */}
        <button
          type="button"
          onClick={() => onSelectTheme('chocks')}
          className={`relative px-4 py-1.5 text-xs font-bold rounded-xl transition-all duration-200 z-10 flex items-center gap-2 select-none ${
            !isJojo ? 'text-white font-black' : 'text-slate-400 hover:text-white'
          }`}
        >
          {!isJojo && (
            <motion.div
              layoutId="activeThemeHighlight"
              className="absolute inset-0 rounded-xl bg-gradient-to-r from-purple-500 to-fuchsia-500 shadow-[0_0_14px_rgba(192,132,252,0.6)] -z-10"
              transition={{ type: "spring", stiffness: 450, damping: 30 }}
            />
          )}
          <span className="w-2 h-2 rounded-full bg-purple-400 shadow-[0_0_6px_#c084fc]" />
          <span>✨ Chocks</span>
        </button>
      </div>
    </div>
  );
};
