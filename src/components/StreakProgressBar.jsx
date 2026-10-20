import React, { useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Flame, Sparkles, Check, Zap } from 'lucide-react';
import confetti from 'canvas-confetti';
import { DAYS_OF_WEEK } from '../constants/initialData';

export const StreakProgressBar = ({ 
  completedCount, 
  totalCount, 
  currentTheme,
  streakDays = 14,
  dayLabel = 'Today',
  tasksByDay = {},
  selectedDay = 'mon'
}) => {
  const isTodayComplete = totalCount > 0 && completedCount === totalCount;
  const prevCompleteRef = useRef(isTodayComplete);

  // Trigger celebration confetti when today's streak is completed
  useEffect(() => {
    if (isTodayComplete && !prevCompleteRef.current) {
      confetti({
        particleCount: 65,
        spread: 70,
        origin: { y: 0.3 },
        colors: ['#f97316', '#fbbf24', '#ef4444', '#f59e0b']
      });
    }
    prevCompleteRef.current = isTodayComplete;
  }, [isTodayComplete]);

  return (
    <div className="px-4 py-2">
      <div className={`p-4 rounded-3xl ${currentTheme.card} border backdrop-blur-md transition-all duration-300 shadow-xl relative overflow-hidden`}>
        {/* Ambient warm fiery glow in background */}
        <div 
          className="absolute -right-6 -top-6 w-36 h-36 rounded-full blur-3xl opacity-25 pointer-events-none bg-gradient-to-br from-amber-500 via-orange-500 to-rose-500" 
        />

        {/* Duolingo-Style Main Streak Section */}
        <div className="flex items-center justify-between relative z-10 mb-4">
          <div className="flex items-center gap-3.5">
            {/* Animated Duolingo Fiery Flame Icon */}
            <div className="relative">
              <motion.div
                animate={isTodayComplete ? {
                  scale: [1, 1.15, 1.05, 1.18, 1],
                  rotate: [-3, 3, -2, 2, 0]
                } : {
                  scale: [1, 1.05, 1],
                }}
                transition={{
                  duration: 2.2,
                  repeat: Infinity,
                  repeatType: "reverse",
                  ease: "easeInOut"
                }}
                className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-amber-500 via-orange-500 to-rose-500 p-0.5 shadow-lg shadow-orange-500/35 flex items-center justify-center cursor-pointer"
              >
                <div className="w-full h-full rounded-[14px] bg-[#160b05] flex items-center justify-center relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-t from-orange-500/30 via-amber-400/20 to-transparent" />
                  <Flame className="w-8 h-8 text-amber-400 fill-amber-400 filter drop-shadow-[0_0_10px_rgba(251,191,36,0.9)] animate-pulse" />
                </div>
              </motion.div>

              {/* Sparkle badge on flame corner */}
              <motion.div 
                animate={{ rotate: 360 }}
                transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-gradient-to-r from-amber-400 to-yellow-300 flex items-center justify-center shadow-md shadow-amber-500/50"
              >
                <Sparkles className="w-3 h-3 text-slate-950 fill-slate-950" />
              </motion.div>
            </div>

            {/* Streak Number & Label */}
            <div>
              <div className="flex items-baseline gap-2">
                <motion.span 
                  key={streakDays}
                  initial={{ scale: 0.8, y: -4 }}
                  animate={{ scale: 1, y: 0 }}
                  className="text-4xl font-black font-playful tracking-tight text-white filter drop-shadow-sm"
                >
                  {streakDays}
                </motion.span>
                <span className="text-xs font-black uppercase tracking-wider text-amber-400 font-playful">
                  Day Streak
                </span>
              </div>
              {isTodayComplete && (
                <p className="text-xs text-slate-400 font-medium mt-0.5">
                  <span className="text-amber-300 font-semibold flex items-center gap-1">
                    <Zap className="w-3 h-3 fill-amber-400 text-amber-400" />
                    Streak active for {dayLabel}!
                  </span>
                </p>
              )}
            </div>
          </div>

          {/* Quick Streak Status Chip */}
          <div className="text-right">
            <span className={`inline-flex items-center gap-1 text-[11px] font-bold px-2.5 py-1 rounded-full border shadow-sm ${
              isTodayComplete
                ? 'bg-amber-500/20 text-amber-300 border-amber-500/40 shadow-amber-500/20'
                : 'bg-white/5 text-slate-400 border-white/10'
            }`}>
              <Flame className={`w-3 h-3 ${isTodayComplete ? 'text-amber-400 fill-amber-400' : 'text-slate-500'}`} />
              <span>{isTodayComplete ? 'Active' : `${totalCount - completedCount} left`}</span>
            </span>
          </div>
        </div>

        {/* Duolingo 7-Day Streak Calendar Row */}
        <div className="pt-3 border-t border-white/10">
          <div className="flex items-center justify-between gap-1">
            {DAYS_OF_WEEK.map((day) => {
              const dayTasks = tasksByDay[day.id] || [];
              const hasTasks = dayTasks.length > 0;
              const isDayComplete = hasTasks && dayTasks.every((t) => t.completed);
              const isSelected = selectedDay === day.id;

              return (
                <div 
                  key={day.id} 
                  className="flex-1 flex flex-col items-center gap-1"
                >
                  <span className={`text-[10px] font-bold uppercase tracking-tight ${
                    isSelected ? 'text-amber-400' : 'text-slate-400'
                  }`}>
                    {day.label[0]}
                  </span>

                  <div 
                    className={`w-7 h-7 rounded-full flex items-center justify-center transition-all duration-300 relative ${
                      isDayComplete
                        ? 'bg-gradient-to-tr from-amber-500 to-orange-500 text-white shadow-md shadow-orange-500/40 ring-1 ring-amber-300/40'
                        : isSelected
                        ? 'bg-white/10 text-slate-300 ring-2 ring-amber-400/50'
                        : 'bg-white/5 text-slate-600 border border-white/5'
                    }`}
                  >
                    {isDayComplete ? (
                      <Flame className="w-4 h-4 text-white fill-white filter drop-shadow-[0_1px_2px_rgba(0,0,0,0.5)]" />
                    ) : (
                      <span className={`w-1.5 h-1.5 rounded-full ${isSelected ? 'bg-amber-400' : 'bg-slate-700'}`} />
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
