import React, { useState } from 'react';
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
  CalendarDays,
  Check
} from 'lucide-react';
import { CATEGORIES, DAYS_OF_WEEK } from '../constants/initialData';

export const AdminControls = ({ 
  selectedDayName, 
  selectedDayId,
  onAddTask, 
  onResetDefaults, 
  currentTheme,
  onSelectDay
}) => {
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('work');
  const [time, setTime] = useState('09:00 AM');
  const [showCalendar, setShowCalendar] = useState(false);

  // Calendar State: Defaults to current month & year
  const today = new Date();
  const [currentMonthDate, setCurrentMonthDate] = useState(new Date(today.getFullYear(), today.getMonth(), 1));
  const [selectedDate, setSelectedDate] = useState(new Date());

  // Weekday day IDs mapped from JS getDay() (0 = Sun, 1 = Mon, ..., 6 = Sat)
  const jsDayToAppDayId = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat'];

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
  // Get days in current month
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  // Day of week of the 1st of month: 0=Sun, 1=Mon, ..., 6=Sat
  // We want Monday = 0, Sunday = 6
  const firstDayOfWeek = (new Date(year, month, 1).getDay() + 6) % 7;

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  // Pick a date from the calendar
  const handlePickDate = (dayNum) => {
    const picked = new Date(year, month, dayNum);
    setSelectedDate(picked);

    // Sync app active day to this date's day of week
    const targetDayId = jsDayToAppDayId[picked.getDay()];
    if (onSelectDay && targetDayId) {
      onSelectDay(targetDayId);
    }
  };

  // Target day calculation for the task to be added
  const targetDayId = jsDayToAppDayId[selectedDate.getDay()];
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
      targetDay: targetDayId,
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
                Log habits & schedule future dates
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
              title="Reset this week to original initial tasks"
              className="p-1.5 rounded-xl text-slate-400 hover:text-rose-400 bg-white/5 hover:bg-rose-500/10 border border-white/5 transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Interactive Future Calendar Picker (Revealed upon toggle or expansion) */}
        <AnimatePresence>
          {showCalendar && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="mb-3.5 overflow-hidden rounded-2xl bg-black/40 border border-white/10 p-3"
            >
              {/* Calendar Month Header & Navigation */}
              <div className="flex items-center justify-between mb-2.5 px-1">
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
                    onClick={() => setCurrentMonthDate(new Date(today.getFullYear(), today.getMonth(), 1))}
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
                      {isTodayDate && !isCurrentDaySelected && (
                        <span className={`absolute bottom-0.5 w-1 h-1 rounded-full ${isJojo ? 'bg-sky-400' : 'bg-purple-400'}`} />
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Selected date preview notification banner */}
              <div className="mt-2.5 pt-2 border-t border-white/5 flex items-center justify-between text-[11px]">
                <span className="text-slate-400">Scheduled for:</span>
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
                Change Date
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
