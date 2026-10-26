import React from 'react';
import { motion } from 'framer-motion';
import { Check, Calendar, Sparkles, ArrowRightLeft } from 'lucide-react';
import { EXTENDED_MONTHS, getMondayOfWeek, formatWeekRange, getWeekDaysForDate } from '../utils/dateUtils';

export const DaySelector = ({ 
  selectedDate = new Date(2026, 9, 20), 
  onSelectDate,
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

  // Determine current real-world week (or default launch week Oct 2026 if outside range)
  const getTodayDate = () => {
    const now = new Date();
    const y = now.getFullYear();
    const m = now.getMonth();
    if ((y === 2026 && m >= 9) || (y === 2027 && m <= 3)) {
      return now;
    }
    return new Date(2026, 9, 20);
  };

  const todayDate = getTodayDate();
  const currentWeekMonday = getMondayOfWeek(todayDate);
  const isCurrentWeek =
    currentWeekMonday.getFullYear() === monday.getFullYear() &&
    currentWeekMonday.getMonth() === monday.getMonth() &&
    currentWeekMonday.getDate() === monday.getDate();

  const isJojo = currentTheme.id === 'jojo';

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

      {/* Week Header info with Current Week Highlight & Shortcut */}
      <div className="flex items-center justify-between mb-2 px-1">
        <div className="flex items-center gap-1.5">
          {isCurrentWeek ? (
            <span className={`inline-flex items-center gap-1 text-[10px] font-black uppercase px-2.5 py-0.5 rounded-full ${
              isJojo 
                ? 'bg-sky-500/20 text-sky-300 border border-sky-400/40 shadow-[0_0_10px_rgba(56,189,248,0.35)]' 
                : 'bg-purple-500/20 text-purple-300 border border-purple-400/40 shadow-[0_0_10px_rgba(192,132,252,0.35)]'
            }`}>
              <Sparkles className="w-2.5 h-2.5 animate-pulse" />
              <span>Current Week</span>
            </span>
          ) : (
            <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-300">
              <Calendar className="w-3.5 h-3.5 text-slate-400" />
              <span>Week of</span>
            </div>
          )}
          <span className="text-[11px] text-slate-300 font-mono font-semibold">
            {weekRangeText}
          </span>
        </div>

        {/* Shortcut button: Jump back to Current Week if browsing future/past months */}
        {!isCurrentWeek && (
          <button
            type="button"
            onClick={() => onSelectDate && onSelectDate(todayDate)}
            className={`inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-lg border transition-all ${
              isJojo
                ? 'bg-sky-500/10 text-sky-300 border-sky-500/30 hover:bg-sky-500/20 shadow-xs'
                : 'bg-purple-500/10 text-purple-300 border-purple-500/30 hover:bg-purple-500/20 shadow-xs'
            }`}
          >
            <span>↩ This Week</span>
          </button>
        )}
      </div>

      {/* 7 Days Pills Container (Mon - Sun of the active week) */}
      <div className={`grid grid-cols-7 gap-1.5 p-1 rounded-2xl bg-black/30 border transition-all duration-300 ${
        isCurrentWeek
          ? isJojo
            ? 'border-sky-500/40 ring-1 ring-sky-500/30 shadow-[0_0_16px_rgba(56,189,248,0.12)]'
            : 'border-purple-500/40 ring-1 ring-purple-500/30 shadow-[0_0_16px_rgba(192,132,252,0.12)]'
          : 'border-white/5'
      }`}>
        {days.map((day) => {
          const isSelected = 
            day.dateObj.getFullYear() === safeDate.getFullYear() &&
            day.dateObj.getMonth() === safeDate.getMonth() &&
            day.dateObj.getDate() === safeDate.getDate();

          const dayTasks = tasksByDay[day.dateKey] || tasksByDay[day.id] || [];
          const total = dayTasks.length;
          const completed = dayTasks.filter(t => t.completed).length;
          const isDone = total > 0 && completed === total;

          return (
            <button
              key={day.dateKey}
              onClick={() => {
                if (onSelectDate) onSelectDate(day.dateObj);
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
