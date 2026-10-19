import React from 'react';
import { motion } from 'framer-motion';
import { Check, Calendar } from 'lucide-react';
import { DAYS_OF_WEEK } from '../constants/initialData';

export const DaySelector = ({ 
  selectedDay, 
  onSelectDay, 
  tasksByDay, 
  currentTheme 
}) => {
  return (
    <div className="px-4 py-2">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-300">
          <Calendar className="w-3.5 h-3.5 text-slate-400" />
          <span>Weekly Schedule</span>
        </div>
        <span className="text-[11px] text-slate-400 font-mono">
          Oct 19 - Oct 25
        </span>
      </div>

      {/* 7 Days Pills Container */}
      <div className="grid grid-cols-7 gap-1.5 p-1 rounded-2xl bg-black/30 border border-white/5">
        {DAYS_OF_WEEK.map((day) => {
          const isSelected = selectedDay === day.id;
          const dayTasks = tasksByDay[day.id] || [];
          const total = dayTasks.length;
          const completed = dayTasks.filter(t => t.completed).length;
          const isDone = total > 0 && completed === total;

          return (
            <button
              key={day.id}
              onClick={() => onSelectDay(day.id)}
              className={`relative py-2 px-1 rounded-xl flex flex-col items-center justify-center transition-all duration-200 group focus:outline-none ${
                isSelected ? 'text-slate-950 font-bold' : 'text-slate-400 hover:text-white hover:bg-white/5'
              }`}
            >
              {/* Animated active pill background */}
              {isSelected && (
                <motion.div
                  layoutId="activeDayIndicator"
                  className={`absolute inset-0 rounded-xl ${currentTheme.pillActive} -z-10`}
                  transition={{ type: "spring", stiffness: 450, damping: 30 }}
                />
              )}

              {/* Day Label (Mon, Tue, etc.) */}
              <span className="text-[11px] font-semibold tracking-tight uppercase">
                {day.label}
              </span>

              {/* Date Number */}
              <span className={`text-xs font-mono font-bold mt-0.5 ${isSelected ? 'text-slate-950' : 'text-slate-200'}`}>
                {day.dateNum}
              </span>

              {/* Completion status dot or check */}
              <div className="mt-1 h-2 flex items-center justify-center">
                {isDone ? (
                  <Check className={`w-2.5 h-2.5 ${isSelected ? 'text-slate-950' : 'text-emerald-400'} stroke-[3]`} />
                ) : total > 0 && completed > 0 ? (
                  <span className={`w-1.5 h-1.5 rounded-full ${isSelected ? 'bg-slate-950' : 'bg-amber-400'}`} />
                ) : (
                  <span className={`w-1 h-1 rounded-full ${isSelected ? 'bg-slate-950/40' : 'bg-slate-700'}`} />
                )}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};
