import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Plus, 
  Sparkles, 
  RotateCcw, 
  Clock, 
  Tag, 
  Calendar, 
  ChevronLeft, 
  ChevronRight,
  CalendarDays
} from 'lucide-react';
import { CATEGORIES } from '../constants/initialData';
import { EXTENDED_MONTHS, jsDayToDayId } from '../utils/dateUtils';

export const AdminControls = ({ 
  selectedDayName, 
  selectedDayId,
  selectedDate = new Date(),
  onSelectDate,
  onAddTask, 
  onResetDefaults, 
  currentTheme,
  getTasksForDate
}) => {
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('work');
  const [time, setTime] = useState('09:00 AM');
  const [showCalendar, setShowCalendar] = useState(false);

  // Calendar month view state (synced with selectedDate initially)
  const [currentMonthDate, setCurrentMonthDate] = useState(
    new Date(selectedDate.getFullYear(), selectedDate.getMonth(), 1)
  );

  // Sync calendar month view whenever selectedDate changes
  useEffect(() => {
    setCurrentMonthDate(new Date(selectedDate.getFullYear(), selectedDate.getMonth(), 1));
  }, [selectedDate]);

  const getSmartToday = () => {
    const now = new Date();
    const y = now.getFullYear();
    const m = now.getMonth();
    if ((y === 2026 && m >= 9) || (y === 2027 && m <= 3)) {
      return now;
    }
    return new Date(2026, 9, 20);
  };

  const today = getSmartToday();
  const year = currentMonthDate.getFullYear();
  const month = currentMonthDate.getMonth(); // 0-indexed

  // Month navigation
  const handlePrevMonth = () => {
    setCurrentMonthDate(new Date(year, month - 1, 1));
  };

  const handleNextMonth = () => {
    setCurrentMonthDate(new Date(year, month + 1, 1));
  };

  // Calendar calculations
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const firstDayOfWeek = (new Date(year, month, 1).getDay() + 6) % 7; // Monday = 0

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  // Pick a date from the calendar: updates selectedDate seamlessly without snapping back
  const handlePickDate = (dayNum) => {
    const picked = new Date(year, month, dayNum);
    if (onSelectDate) onSelectDate(picked);
  };

  const formattedSelectedDate = selectedDate.toLocaleDateString('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  });

  const shortDateLabel = selectedDate.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric'
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) return;

    onAddTask({
      title: title.trim(),
      category,
      time: time.trim() || 'Flexible',
      targetDate: selectedDate,
      dateStr: shortDateLabel
    });

    setTitle('');
  };

  const isJojo = currentTheme.id === 'jojo';

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      className="px-4 py-2"
    >
      <div className={`p-4 rounded-3xl border ${currentTheme.card} shadow-xl relative overflow-hidden ring-1 ${
        isJojo ? 'ring-sky-500/30' : 'ring-purple-500/30'
      }`}>
        {/* Admin Header Ribbon */}
        <div className="flex items-center justify-between mb-3 pb-2 border-b border-white/10">
          <div className="flex items-center gap-2">
            <span className={`p-1.5 rounded-xl ${currentTheme.accentBadge} shadow-xs`}>
              <Sparkles className="w-3.5 h-3.5" />
            </span>
            <div>
              <span className="text-xs font-bold text-white uppercase tracking-wider block">
                Admin Task Scheduler
              </span>
              <span className="text-[10px] text-slate-400 font-medium">
                Log habits & schedule (Oct '26 – Apr '27)
              </span>
            </div>
          </div>

          <div className="flex items-center gap-1.5">
            {/* Calendar Toggle Button */}
            <button
              type="button"
              onClick={() => setShowCalendar(!showCalendar)}
              className={`flex items-center gap-1.5 text-[11px] font-bold px-2.5 py-1 rounded-xl transition-all border ${
                showCalendar
                  ? `${currentTheme.accentBg} text-slate-950 shadow-md`
                  : 'bg-white/5 text-slate-300 hover:text-white hover:bg-white/10 border-white/10'
              }`}
            >
              <Calendar className="w-3.5 h-3.5" />
              <span>{showCalendar ? 'Hide Calendar' : 'Open Calendar'}</span>
            </button>

            <button
              type="button"
              onClick={onResetDefaults}
              title="Reset tasks for the week to default state"
              className="p-1.5 rounded-xl text-slate-400 hover:text-rose-400 bg-white/5 hover:bg-rose-500/10 border border-white/5 transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Interactive Future Calendar Picker (October 2026 to April 2027) */}
        <AnimatePresence>
          {showCalendar && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="mb-3.5 overflow-hidden rounded-2xl bg-black/40 border border-white/10 p-3"
            >
              {/* Calendar Month Header & Navigation */}
              <div className="flex items-center justify-between mb-2 px-1">
                <div className="flex items-center gap-1.5">
                  <CalendarDays className={`w-4 h-4 ${currentTheme.accentClass}`} />
                  <span className="text-xs font-bold text-white font-playful">
                    {monthNames[month]} {year}
                  </span>
                </div>

                <div className="flex items-center gap-1">
                  <button
                    type="button"
                    onClick={handlePrevMonth}
                    className="p-1 rounded-lg bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white transition-colors"
                  >
                    <ChevronLeft className="w-3.5 h-3.5" />
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      const t = getSmartToday();
                      setCurrentMonthDate(new Date(t.getFullYear(), t.getMonth(), 1));
                      if (onSelectDate) onSelectDate(t);
                    }}
                    className="px-2 py-0.5 rounded-lg text-[10px] font-bold bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white"
                  >
                    Today
                  </button>
                  <button
                    type="button"
                    onClick={handleNextMonth}
                    className="p-1 rounded-lg bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white transition-colors"
                  >
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* 7-Month Selector Row: October 2026 to April 2027 */}
              <div className="flex items-center gap-1 mb-2.5 bg-black/50 p-1 rounded-xl border border-white/5 overflow-x-auto no-scrollbar">
                {EXTENDED_MONTHS.map((m) => {
                  const isCurrent = year === m.year && month === m.month;
                  return (
                    <button
                      key={m.label}
                      type="button"
                      onClick={() => {
                        const d = new Date(m.year, m.month, 1);
                        setCurrentMonthDate(d);
                        if (onSelectDate) onSelectDate(d);
                      }}
                      className={`flex-1 min-w-[42px] py-1.5 px-1 rounded-lg text-xs font-bold transition-all text-center flex flex-col items-center justify-center ${
                        isCurrent
                          ? `${currentTheme.accentBg} text-slate-950 shadow-md font-black`
                          : 'text-slate-400 hover:text-white hover:bg-white/5'
                      }`}
                    >
                      <span className="text-[11px] leading-tight">{m.short}</span>
                      <span className={`text-[8px] font-mono leading-none ${isCurrent ? 'text-slate-950 font-bold' : 'text-slate-500'}`}>
                        {m.year === 2027 ? "'27" : "'26"}
                      </span>
                    </button>
                  );
                })}
              </div>

              {/* Day of week headers */}
              <div className="grid grid-cols-7 gap-1 text-center text-[10px] font-bold text-slate-400 mb-1">
                {['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'].map((d, i) => (
                  <span key={i} className="py-0.5">{d}</span>
                ))}
              </div>

              {/* Calendar Days Grid */}
              <div className="grid grid-cols-7 gap-1">
                {/* Empty cells before month starts */}
                {Array.from({ length: firstDayOfWeek }).map((_, i) => (
                  <div key={`empty-${i}`} className="h-7 rounded-lg opacity-10" />
                ))}

                {/* Days of current month */}
                {Array.from({ length: daysInMonth }).map((_, i) => {
                  const dayNum = i + 1;
                  const isCurrentDaySelected = 
                    selectedDate.getFullYear() === year &&
                    selectedDate.getMonth() === month &&
                    selectedDate.getDate() === dayNum;

                  const isTodayDate = 
                    today.getFullYear() === year &&
                    today.getMonth() === month &&
                    today.getDate() === dayNum;

                  const cellDate = new Date(year, month, dayNum);
                  const cellTasks = getTasksForDate ? getTasksForDate(cellDate) : [];
                  const hasAllocatedTasks = cellTasks.length > 0;

                  return (
                    <button
                      key={`day-${dayNum}`}
                      type="button"
                      onClick={() => handlePickDate(dayNum)}
                      className={`h-7 rounded-lg text-xs font-bold transition-all flex items-center justify-center relative ${
                        isCurrentDaySelected
                          ? `${currentTheme.accentBg} text-slate-950 shadow-md font-black scale-105`
                          : isTodayDate
                          ? 'bg-white/15 text-white ring-1 ring-white/30'
                          : 'text-slate-300 hover:bg-white/10 hover:text-white'
                      }`}
                    >
                      {dayNum}
                      {/* Task allocation indicator dot */}
                      {hasAllocatedTasks && (
                        <span className={`absolute top-0.5 right-0.5 w-1.5 h-1.5 rounded-full ${
                          isCurrentDaySelected
                            ? 'bg-slate-950 ring-1 ring-white/60'
                            : isJojo ? 'bg-sky-400 shadow-[0_0_6px_rgba(56,189,248,0.9)]' : 'bg-purple-400 shadow-[0_0_6px_rgba(192,132,252,0.9)]'
                        }`} />
                      )}
                      {isTodayDate && !isCurrentDaySelected && !hasAllocatedTasks && (
                        <span className={`absolute bottom-0.5 w-1 h-1 rounded-full ${isJojo ? 'bg-sky-400' : 'bg-purple-400'}`} />
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Selected date preview notification banner */}
              <div className="mt-2.5 pt-2 border-t border-white/5 flex items-center justify-between text-[11px]">
                <span className="text-slate-400">Selected Date:</span>
                <span className={`font-bold ${currentTheme.accentClass} flex items-center gap-1`}>
                  <Calendar className="w-3 h-3" />
                  {formattedSelectedDate}
                </span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Task Creator Form */}
        <form onSubmit={handleSubmit} className="space-y-2.5">
          {/* Active Target Date Pill Banner */}
          <div className="flex items-center justify-between px-1 text-[11px] text-slate-400">
            <div className="flex items-center gap-1.5">
              <span className="text-slate-400 font-medium">Adding for:</span>
              <span className={`font-bold px-2 py-0.5 rounded-lg bg-white/5 border border-white/10 ${currentTheme.accentClass}`}>
                📅 {formattedSelectedDate}
              </span>
            </div>
            {!showCalendar && (
              <button
                type="button"
                onClick={() => setShowCalendar(true)}
                className="text-[10px] text-slate-400 hover:text-white underline underline-offset-2"
              >
                Change Date (Oct - Apr)
              </button>
            )}
          </div>

          {/* Title Input */}
          <div className="relative">
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder={`Schedule task for ${formattedSelectedDate}...`}
              className={`w-full px-3.5 py-2.5 rounded-2xl bg-black/50 border border-white/10 text-xs text-white placeholder-slate-500 focus:outline-none focus:ring-2 ${currentTheme.ringFocus} transition-all`}
            />
          </div>

          {/* Category Picker */}
          <div>
            <div className="flex items-center gap-1 text-[10px] text-slate-400 mb-1.5 font-medium">
              <Tag className="w-3 h-3 text-slate-500" />
              <span>Category</span>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => setCategory(cat.id)}
                  className={`px-2.5 py-1 rounded-xl text-[10px] font-semibold transition-all ${
                    category === cat.id
                      ? `${currentTheme.accentBg} text-slate-950 font-bold shadow-xs`
                      : 'bg-white/5 text-slate-400 hover:text-white border border-white/5'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </div>

          {/* Time Preset / Input & Submit Button */}
          <div className="flex items-center gap-2 pt-1">
            <div className="relative flex-1">
              <div className="absolute inset-y-0 left-2.5 flex items-center pointer-events-none text-slate-500">
                <Clock className="w-3 h-3" />
              </div>
              <input
                type="text"
                value={time}
                onChange={(e) => setTime(e.target.value)}
                placeholder="e.g. 08:30 AM"
                className="w-full pl-8 pr-2 py-2 rounded-xl bg-black/40 border border-white/10 text-[11px] font-mono text-slate-200 placeholder-slate-600 focus:outline-none focus:border-white/30"
              />
            </div>

            <button
              type="submit"
              disabled={!title.trim()}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 shadow-md disabled:opacity-40 disabled:cursor-not-allowed ${
                currentTheme.accentBg
              } text-slate-950 hover:brightness-110 active:scale-95`}
            >
              <Plus className="w-3.5 h-3.5 stroke-[3]" />
              <span>Schedule Task</span>
            </button>
          </div>
        </form>
      </div>
    </motion.div>
  );
};
