import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Lock, ShieldCheck } from 'lucide-react';

export const Header = ({ 
  currentTheme, 
  onAdminClick, 
  isAdminUnlocked, 
  onLockAdmin 
}) => {
  return (
    <header className="sticky top-0 z-30 px-6 pt-16 pb-6 sm:pt-20 sm:pb-8 flex items-center justify-center border-b border-white/5 backdrop-blur-xl bg-black/30 transition-all duration-300">
      {/* Center of the top: Star / Admin Access Button with generous breathing room */}
      <div className="flex items-center justify-center">
        {isAdminUnlocked ? (
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1.5 text-xs uppercase px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 animate-pulse font-bold shadow-sm">
              <ShieldCheck className="w-3.5 h-3.5" /> Admin Active
            </span>
            <button
              onClick={onLockAdmin}
              title="Lock Admin Mode"
              className="px-3.5 py-1.5 rounded-2xl bg-rose-500/20 hover:bg-rose-500/30 text-rose-300 border border-rose-500/40 transition-all flex items-center gap-1.5 text-xs font-bold shadow-sm hover:scale-105 active:scale-95"
            >
              <Lock className="w-3.5 h-3.5" />
              <span>Lock</span>
            </button>
          </div>
        ) : (
          <motion.button
            whileHover={{ scale: 1.15, rotate: 12 }}
            whileTap={{ scale: 0.9 }}
            onClick={onAdminClick}
            title="Admin Access"
            className={`p-3.5 rounded-2xl transition-all duration-300 bg-white/5 hover:bg-white/10 border border-white/10 ${currentTheme.accentClass} hover:shadow-xl flex items-center justify-center`}
          >
            <Sparkles className="w-6 h-6 animate-pulse" />
          </motion.button>
        )}
      </div>
    </header>
  );
};
