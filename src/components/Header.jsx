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
    <header className="sticky top-0 z-30 px-4 pt-3 pb-3 flex items-center justify-between border-b border-white/5 backdrop-blur-xl bg-black/30">
      <div className="flex items-center gap-2.5">
        <div 
          className={`w-8 h-8 rounded-xl flex items-center justify-center ${currentTheme.accentBg} text-slate-950 font-black text-sm shadow-md shadow-${currentTheme.id === 'jojo' ? 'sky-500/30' : 'purple-500/30'}`}
        >
          ⚡
        </div>
        <div>
          <h1 className="text-sm font-bold text-white tracking-wide flex items-center gap-1.5">
            DailyPulse
            {isAdminUnlocked && (
              <span className="flex items-center gap-1 text-[9px] font-mono uppercase px-1.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 animate-pulse">
                <ShieldCheck className="w-2.5 h-2.5" /> Admin
              </span>
            )}
          </h1>
          <p className="text-[10px] text-slate-400">Daily Streak & Habit Tracker</p>
        </div>
      </div>

      {/* Header Actions: Sparkle PIN Admin Trigger or Lock Button */}
      <div className="flex items-center gap-2">
        {isAdminUnlocked ? (
          <button
            onClick={onLockAdmin}
            title="Lock Admin Mode"
            className="px-2.5 py-1.5 rounded-xl bg-rose-500/20 hover:bg-rose-500/30 text-rose-300 border border-rose-500/40 transition-all flex items-center gap-1.5 text-xs font-semibold"
          >
            <Lock className="w-3.5 h-3.5" />
            <span>Lock</span>
          </button>
        ) : (
          <motion.button
            whileHover={{ scale: 1.1, rotate: 12 }}
            whileTap={{ scale: 0.95 }}
            onClick={onAdminClick}
            title="Secret Admin Access (PIN: 1234)"
            className={`p-2 rounded-xl transition-all duration-300 bg-white/5 hover:bg-white/10 border border-white/10 ${currentTheme.accentClass} hover:shadow-lg`}
          >
            <Sparkles className="w-4 h-4 animate-pulse" />
          </motion.button>
        )}
      </div>
    </header>
  );
};
