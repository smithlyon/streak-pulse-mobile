import React, { useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Flame, Sparkles, Check, Zap } from 'lucide-react';
import confetti from 'canvas-confetti';
import { DAYS_OF_WEEK } from '../constants/initialData';

export const StreakProgressBar = ({ 
  completedCount, 
  totalCount, 
  currentTheme,
  streakDays = 0,
  dayLabel = 'Today',
  tasksByDay = {},
  selectedDay = 'mon'
}) => {
  const isTodayComplete = totalCount > 0 && completedCount === totalCount;
  const prevCompleteRef = useRef(isTodayComplete);
  const isJojo = currentTheme.id === 'jojo';

  // Trigger celebration confetti when today's streak is completed
  useEffect(() => {
    if (isTodayComplete && !prevCompleteRef.current) {
      confetti({
        particleCount: 65,
        spread: 70,
        origin: { y: 0.3 },
        colors: isJojo 
          ? ['#38bdf8', '#0284c7', '#06b6d4', '#bae6fd'] 
          : ['#c084fc', '#9333ea', '#e879f9', '#f5d0fe']
      });
    }
    prevCompleteRef.current = isTodayComplete;
  }, [isTodayComplete, isJojo]);

  return (
    <div className="px-4 py-2">
      <div className={`p-4 rounded-3xl ${currentTheme.card} border backdrop-blur-md transition-all duration-300 shadow-xl relative overflow-hidden`}>
        {/* Ambient theme glow in background */}
        <div 
          className={`absolute -right-6 -top-6 w-36 h-36 rounded-full blur-3xl opacity-25 pointer-events-none ${
            isJojo 
              ? 'bg-gradient-to-br from-sky-400 via-cyan-500 to-blue-600' 
              : 'bg-gradient-to-br from-purple-400 via-fuchsia-500 to-violet-600'
          }`} 
        />

        {/* Duolingo-Style Main Streak Section */}
        <div className="flex items-center justify-between relative z-10 mb-4">
          <div className="flex items-center gap-3.5">
            {/* Animated Profile Theme Fiery Flame Icon */}
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
                className={`w-14 h-14 rounded-2xl p-0.5 shadow-lg flex items-center justify-center cursor-pointer ${
                  isJojo 
                    ? 'bg-gradient-to-tr from-sky-500 via-cyan-400 to-blue-600 shadow-sky-500/35' 
                    : 'bg-gradient-to-tr from-purple-500 via-fuchsia-400 to-violet-600 shadow-purple-500/35'
                }`}
              >
                <div className="w-full h-full rounded-[14px] bg-[#0c1322] flex items-center justify-center relative overflow-hidden">
                  <div className={`absolute inset-0 ${
                    isJojo ? 'bg-gradient-to-t from-sky-500/30 to-transparent' : 'bg-gradient-to-t from-purple-500/30 to-transparent'
                  }`} />
                  <Flame className={`w-8 h-8 animate-pulse ${
                    isJojo 
                      ? 'text-sky-300 fill-sky-400 filter drop-shadow-[0_0_10px_rgba(56,189,248,0.9)]' 
                      : 'text-purple-300 fill-purple-400 filter drop-shadow-[0_0_10px_rgba(192,132,252,0.9)]'
                  }`} />
                </div>
              </motion.div>

              {/* Sparkle badge on flame corner */}
              <motion.div 
                animate={{ rotate: 360 }}
                transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                className={`absolute -top-1 -right-1 w-5 h-5 rounded-full flex items-center justify-center shadow-md ${
                  isJojo 
                    ? 'bg-gradient-to-r from-sky-300 to-cyan-200 shadow-sky-500/50' 
                    : 'bg-gradient-to-r from-purple-300 to-fuchsia-200 shadow-purple-500/50'
                }`}
              >
                <Sparkles className="w-3 h-3 text-slate-950 fill-slate-950" />
              </motion.div>
            </div>

            {/* Streak Number & Profile Streak Label */}
            <div>
              <div className="flex items-baseline gap-2">
                <motion.span 
                  key={`${currentTheme.id}-${streakDays}`}
                  initial={{ scale: 0.8, y: -4 }}
                  animate={{ scale: 1, y: 0 }}
                  className="text-4xl font-black font-playful tracking-tight text-white filter drop-shadow-sm"
                >
                  {streakDays}
                </motion.span>
                <span className={`text-xs font-black uppercase tracking-wider font-playful ${
                  isJojo ? 'text-sky-400' : 'text-purple-400'
                }`}>
                  {currentTheme.name}'s Day Streak
                </span>
              </div>
              {isTodayComplete && (
                <p className="text-xs text-slate-400 font-medium mt-0.5">
                  <span className={`font-semibold flex items-center gap-1 ${
                    isJojo ? 'text-sky-300' : 'text-purple-300'
                  }`}>
                    <Zap className={`w-3 h-3 ${isJojo ? 'fill-sky-400 text-sky-400' : 'fill-purple-400 text-purple-400'}`} />
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
                ? isJojo 
                  ? 'bg-sky-500/20 text-sky-300 border-sky-500/40 shadow-sky-500/20'
                  : 'bg-purple-500/20 text-purple-300 border-purple-500/40 shadow-purple-500/20'
                : 'bg-white/5 text-slate-400 border-white/10'
            }`}>
              <Flame className={`w-3 h-3 ${
                isTodayComplete 
                  ? isJojo ? 'text-sky-400 fill-sky-400' : 'text-purple-400 fill-purple-400'
                  : 'text-slate-500'
              }`} />
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
                    isSelected ? (isJojo ? 'text-sky-400' : 'text-purple-400') : 'text-slate-400'
                  }`}>
                    {day.label[0]}
                  </span>

                  <div 
                    className={`w-7 h-7 rounded-full flex items-center justify-center transition-all duration-300 relative ${
                      isDayComplete
                        ? isJojo
                          ? 'bg-gradient-to-tr from-sky-400 to-cyan-500 text-slate-950 shadow-md shadow-sky-500/40 ring-1 ring-sky-300/40'
                          : 'bg-gradient-to-tr from-purple-400 to-fuchsia-500 text-slate-950 shadow-md shadow-purple-500/40 ring-1 ring-purple-300/40'
                        : isSelected
                        ? isJojo
                          ? 'bg-white/10 text-slate-300 ring-2 ring-sky-400/50'
                          : 'bg-white/10 text-slate-300 ring-2 ring-purple-400/50'
                        : 'bg-white/5 text-slate-600 border border-white/5'
                    }`}
                  >
                    {isDayComplete ? (
                      <Flame className={`w-4 h-4 fill-slate-950 text-slate-950 filter drop-shadow-[0_1px_2px_rgba(255,255,255,0.4)]`} />
                    ) : (
                      <span className={`w-1.5 h-1.5 rounded-full ${
                        isSelected 
                          ? isJojo ? 'bg-sky-400' : 'bg-purple-400'
                          : 'bg-slate-700'
                      }`} />
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
