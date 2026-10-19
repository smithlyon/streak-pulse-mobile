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
    <header className="sticky top-0 z-30 px-5 pt-12 pb-5 sm:pt-16 flex items-center justify-between border-b border-white/5 backdrop-blur-xl bg-black/40">
      <div className="flex items-center gap-3">
        {/* Playful Animated Logo Badge */}
        <motion.div 
          whileHover={{ rotate: [0, -12, 12, -8, 0], scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className={`w-10 h-10 rounded-2xl flex items-center justify-center ${currentTheme.accentBg} text-slate-950 font-black text-xl shadow-lg shadow-${currentTheme.id === 'jojo' ? 'sky-500/35' : 'purple-500/35'} cursor-pointer transition-transform`}
        >
          ⚡
        </motion.div>

        <div>
          <h1 className="text-lg font-bold text-white tracking-wide flex items-center gap-2 font-playful">
            <span>DailyPulse</span>
            {isAdminUnlocked && (
              <span className="flex items-center gap-1 text-[10px] uppercase px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 animate-pulse font-bold">
                <ShieldCheck className="w-3 h-3" /> Admin
              </span>
            )}
          </h1>
          <p className="text-xs text-slate-400 font-medium">Daily Streak & Habit Tracker ✨</p>
        </div>
      </div>

      {/* Header Actions: Sparkle PIN Admin Trigger or Lock Button */}
      <div className="flex items-center gap-2">
        {isAdminUnlocked ? (
          <button
            onClick={onLockAdmin}
            title="Lock Admin Mode"
            className="px-3 py-1.5 rounded-2xl bg-rose-500/20 hover:bg-rose-500/30 text-rose-300 border border-rose-500/40 transition-all flex items-center gap-1.5 text-xs font-bold shadow-sm"
          >
            <Lock className="w-3.5 h-3.5" />
            <span>Lock</span>
          </button>
        ) : (
          <motion.button
            whileHover={{ scale: 1.15, rotate: 15 }}
            whileTap={{ scale: 0.9 }}
            onClick={onAdminClick}
            title="Secret Admin Access (PIN: 1234)"
            className={`p-2.5 rounded-2xl transition-all duration-300 bg-white/5 hover:bg-white/10 border border-white/10 ${currentTheme.accentClass} hover:shadow-lg`}
          >
            <Sparkles className="w-5 h-5 animate-pulse" />
          </motion.button>
        )}
      </div>
    </header>
  );
};
