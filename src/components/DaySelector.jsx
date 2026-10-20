import React from 'react';
import { motion } from 'framer-motion';
import { Check, Calendar } from 'lucide-react';
import { EXTENDED_MONTHS, getMondayOfWeek, formatWeekRange, getWeekDaysForDate } from '../utils/dateUtils';

export const DaySelector = ({ 
  selectedDate = new Date(2026, 9, 20), 
  onSelectDate,
  onSelectDay,
  tasksByDay = {}, 
  currentTheme,
  weekDays = [],
  onSelectMonth
}) => {
  const safeDate = selectedDate instanceof Date && !isNaN(selectedDate) ? selectedDate : new Date(2026, 9, 20);
  const currentMonthNum = safeDate.getMonth();
  const currentYear = safeDate.getFullYear();
  const monday = getMondayOfWeek(safeDate);
  const weekRangeText = formatWeekRange(monday);
  const days = weekDays && weekDays.length === 7 ? weekDays : getWeekDaysForDate(safeDate);

  return (
    <div className="px-4 py-2">
      {/* 7-Month Selector Pills: October 2026 to April 2027 */}
      <div className="flex items-center gap-1 mb-2.5 bg-black/40 p-1 rounded-2xl border border-white/5 overflow-x-auto no-scrollbar">
        {EXTENDED_MONTHS.map((m) => {
          const isSelectedMonth = currentMonthNum === m.month && currentYear === m.year;
          return (
            <button
              key={m.id}
              type="button"
              onClick={() => onSelectMonth && onSelectMonth(m.month, m.year)}
              className={`flex-1 min-w-[44px] py-1.5 px-1 rounded-xl text-xs font-bold transition-all text-center flex flex-col items-center justify-center ${
                isSelectedMonth
                  ? `${currentTheme.accentBg} text-slate-950 shadow-md font-black`
                  : 'text-slate-400 hover:text-white hover:bg-white/5'
              }`}
            >
              <span className="text-[11px] leading-tight">{m.short}</span>
              <span className={`text-[8px] font-mono leading-none ${isSelectedMonth ? 'text-slate-950 font-bold' : 'text-slate-500'}`}>
                {m.year === 2027 ? "'27" : "'26"}
              </span>
            </button>
          );
        })}
      </div>

      {/* Week Header info with exact synced dates */}
      <div className="flex items-center justify-between mb-2 px-1">
        <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-300">
          <Calendar className="w-3.5 h-3.5 text-slate-400" />
          <span>Week of</span>
        </div>
        <span className="text-[11px] text-slate-300 font-mono font-semibold">
          {weekRangeText}
        </span>
      </div>

      {/* 7 Days Pills Container (Mon - Sun of the active week) */}
      <div className="grid grid-cols-7 gap-1.5 p-1 rounded-2xl bg-black/30 border border-white/5">
        {days.map((day) => {
          const isSelected = 
            day.dateObj.getFullYear() === safeDate.getFullYear() &&
            day.dateObj.getMonth() === safeDate.getMonth() &&
            day.dateObj.getDate() === safeDate.getDate();

          const dayTasks = tasksByDay[day.id] || [];
          const total = dayTasks.length;
          const completed = dayTasks.filter(t => t.completed).length;
          const isDone = total > 0 && completed === total;

          return (
            <button
              key={day.dateKey}
              onClick={() => {
                if (onSelectDate) onSelectDate(day.dateObj);
                if (onSelectDay) onSelectDay(day.id);
              }}
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

              {/* Date Number - in exact sync with calendar */}
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
