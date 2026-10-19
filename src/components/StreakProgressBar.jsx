import React, { useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Flame, CheckCircle2, Trophy, Zap } from 'lucide-react';
import confetti from 'canvas-confetti';

export const StreakProgressBar = ({ 
  completedCount, 
  totalCount, 
  currentTheme,
  streakDays = 14,
  dayLabel = 'Today'
}) => {
  const percentage = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;
  const isComplete = totalCount > 0 && completedCount === totalCount;
  const prevPercentageRef = useRef(percentage);

  // Trigger celebration confetti when hitting 100%
  useEffect(() => {
    if (percentage === 100 && prevPercentageRef.current !== 100) {
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.35 },
        colors: currentTheme.id === 'jojo' ? ['#38bdf8', '#0284c7', '#bae6fd'] : ['#c084fc', '#9333ea', '#f5d0fe']
      });
    }
    prevPercentageRef.current = percentage;
  }, [percentage, currentTheme.id]);

  return (
    <div className="px-4 py-2">
      <div className={`p-4 rounded-3xl ${currentTheme.card} border backdrop-blur-md transition-all duration-300 shadow-lg relative overflow-hidden`}>
        {/* Background ambient gradient glow */}
        <div 
          className={`absolute -right-8 -top-8 w-32 h-32 rounded-full blur-3xl opacity-20 pointer-events-none ${
            currentTheme.id === 'jojo' ? 'bg-sky-400' : 'bg-purple-500'
          }`} 
        />

        {/* Top row: Streak counter + status badge */}
        <div className="flex items-center justify-between mb-3 relative z-10">
          <div className="flex items-center gap-2">
            <div className={`p-2 rounded-2xl ${currentTheme.accentBadge} flex items-center justify-center`}>
              <Flame className={`w-5 h-5 ${currentTheme.accentClass} animate-bounce`} />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-sm font-extrabold text-white tracking-tight">
                  {streakDays} Day Streak
                </span>
                <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30 font-semibold flex items-center gap-0.5">
                  <Zap className="w-2.5 h-2.5 fill-amber-400" /> Active
                </span>
              </div>
              <p className="text-[11px] text-slate-400">
                {isComplete ? 'All targets accomplished! 🎉' : `${dayLabel}'s focus progress`}
              </p>
            </div>
          </div>

          {/* Real-time Percentage Badge */}
          <div className="text-right">
            <motion.div 
              key={percentage}
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className={`text-2xl font-black tracking-tight ${currentTheme.accentClass} font-mono`}
            >
              {percentage}%
            </motion.div>
            <div className="text-[10px] font-semibold text-slate-400">
              {completedCount}/{totalCount} Completed
            </div>
          </div>
        </div>

        {/* Dynamic Progress Bar */}
        <div className={`relative h-3 w-full rounded-full overflow-hidden ${currentTheme.progressTrack} border p-[2px]`}>
          <motion.div
            className={`h-full rounded-full ${currentTheme.progressBar}`}
            initial={{ width: 0 }}
            animate={{ width: `${percentage}%` }}
            transition={{ type: "spring", stiffness: 120, damping: 20 }}
          />
        </div>

        {/* Bottom micro stats */}
        <div className="flex items-center justify-between mt-3 text-[11px] text-slate-400 pt-2 border-t border-white/5">
          <div className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
            <span>{isComplete ? 'Perfect completion' : `${totalCount - completedCount} tasks remaining`}</span>
          </div>

          <div className="flex items-center gap-1 font-medium text-slate-300">
            {isComplete ? (
              <span className="text-emerald-400 flex items-center gap-1">
                <Trophy className="w-3.5 h-3.5" /> Bonus Unlocked
              </span>
            ) : (
              <span>Target: 100%</span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
