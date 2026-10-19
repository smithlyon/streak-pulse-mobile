import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MobileFrame } from './components/MobileFrame';
import { ThemeToggle } from './components/ThemeToggle';
import { StreakProgressBar } from './components/StreakProgressBar';
import { DaySelector } from './components/DaySelector';
import { TaskList } from './components/TaskList';
import { AdminPinModal } from './components/AdminPinModal';
import { AdminControls } from './components/AdminControls';
import { THEMES } from './constants/themeConfig';
import { DAYS_OF_WEEK, INITIAL_TASKS } from './constants/initialData';
import { Sparkles, ShieldCheck, Info } from 'lucide-react';

const STORAGE_KEY_TASKS = 'daily_pulse_tasks_v1';
const STORAGE_KEY_THEME = 'daily_pulse_theme_v1';

export default function App() {
  // Theme state: 'jojo' (sky blue dark) or 'chocks' (rich purple dark)
  const [themeId, setThemeId] = useState(() => {
    return localStorage.getItem(STORAGE_KEY_THEME) || 'jojo';
  });

  // Active day selection: 'mon' to 'sun'
  const [selectedDay, setSelectedDay] = useState('mon');

  // Tasks mapped by day
  const [tasksByDay, setTasksByDay] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_TASKS);
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error('Failed to load tasks from localStorage', e);
    }
    return INITIAL_TASKS;
  });

  // Admin Mode state
  const [isAdminUnlocked, setIsAdminUnlocked] = useState(false);
  const [isPinModalOpen, setIsPinModalOpen] = useState(false);
  const [adminToast, setAdminToast] = useState('');

  // Persist theme
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY_THEME, themeId);
  }, [themeId]);

  // Persist tasks
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_TASKS, JSON.stringify(tasksByDay));
    } catch (e) {
      console.error('Failed to save tasks to localStorage', e);
    }
  }, [tasksByDay]);

  const currentTheme = THEMES[themeId] || THEMES.jojo;

  // Active day calculations
  const activeDayTasks = tasksByDay[selectedDay] || [];
  const completedCount = activeDayTasks.filter((t) => t.completed).length;
  const totalCount = activeDayTasks.length;
  const selectedDayObj = DAYS_OF_WEEK.find((d) => d.id === selectedDay) || DAYS_OF_WEEK[0];

  // Dynamic Streak calculation across the week
  const completedDaysCount = DAYS_OF_WEEK.filter((d) => {
    const list = tasksByDay[d.id] || [];
    return list.length > 0 && list.every((t) => t.completed);
  }).length;
  const streakDays = 12 + completedDaysCount;

  // Handlers
  const handleToggleTask = (taskId) => {
    setTasksByDay((prev) => {
      const dayTasks = prev[selectedDay] || [];
      const updated = dayTasks.map((task) =>
        task.id === taskId ? { ...task, completed: !task.completed } : task
      );
      return { ...prev, [selectedDay]: updated };
    });
  };

  const handleDeleteTask = (taskId) => {
    setTasksByDay((prev) => {
      const dayTasks = prev[selectedDay] || [];
      const updated = dayTasks.filter((task) => task.id !== taskId);
      return { ...prev, [selectedDay]: updated };
    });
  };

  const handleAddTask = ({ title, category, time }) => {
    const newTask = {
      id: `${selectedDay}-${Date.now()}`,
      title,
      category,
      time,
      completed: false
    };

    setTasksByDay((prev) => {
      const dayTasks = prev[selectedDay] || [];
      return { ...prev, [selectedDay]: [newTask, ...dayTasks] };
    });
  };

  const handleResetDefaults = () => {
    if (window.confirm('Reset all tasks for the week to default state?')) {
      setTasksByDay(INITIAL_TASKS);
      showToast('Weekly tasks reset to defaults');
    }
  };

  const handleUnlockAdmin = () => {
    setIsAdminUnlocked(true);
    showToast('Admin Mode unlocked! Add & delete controls active.');
  };

  const handleLockAdmin = () => {
    setIsAdminUnlocked(false);
    showToast('Admin Mode locked.');
  };

  const showToast = (message) => {
    setAdminToast(message);
    setTimeout(() => {
      setAdminToast('');
    }, 3500);
  };

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center p-2 sm:p-4 relative">
      {/* Dynamic ambient backlight matching active theme */}
      <div 
        className={`fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[750px] rounded-full blur-[140px] pointer-events-none transition-colors duration-700 opacity-25 ${
          themeId === 'jojo' ? 'bg-sky-500' : 'bg-purple-600'
        }`}
      />

      {/* Outer Companion Helper Header for Desktop Viewers */}
      <aside aria-label="Desktop guidance banner" className="w-full max-w-[420px] mb-2 px-3 flex items-center justify-between text-xs text-slate-400">
        <div className="flex items-center gap-1.5 font-medium">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span>Mobile Device Viewport</span>
        </div>
        <div className="flex items-center gap-1 text-[11px] text-slate-500 font-mono">
          <span>PIN: <strong className="text-slate-300">1234</strong></span>
        </div>
      </aside>

      {/* Main Smartphone Chassis Component */}
      <MobileFrame
        currentTheme={currentTheme}
        onAdminClick={() => setIsPinModalOpen(true)}
        isAdminUnlocked={isAdminUnlocked}
        onLockAdmin={handleLockAdmin}
      >
        {/* Theme Toggle Bar (Jojo / Chocks) */}
        <ThemeToggle 
          activeTheme={themeId} 
          onSelectTheme={(id) => setThemeId(id)} 
        />

        {/* Dynamic Daily Streak Progress Bar with real-time percentage */}
        <StreakProgressBar
          completedCount={completedCount}
          totalCount={totalCount}
          currentTheme={currentTheme}
          streakDays={streakDays}
          dayLabel={selectedDayObj.full}
        />

        {/* Interactive Day Selector Pills (Mon - Sun) */}
        <DaySelector
          selectedDay={selectedDay}
          onSelectDay={(dayId) => setSelectedDay(dayId)}
          tasksByDay={tasksByDay}
          currentTheme={currentTheme}
        />

        {/* Admin Inline Controls (Revealed dynamically once unlocked) */}
        <AnimatePresence>
          {isAdminUnlocked && (
            <AdminControls
              selectedDayName={selectedDayObj.full}
              onAddTask={handleAddTask}
              onResetDefaults={handleResetDefaults}
              currentTheme={currentTheme}
            />
          )}
        </AnimatePresence>

        {/* Dynamic Task List with check-off, strikethrough, and smooth layout animations */}
        <TaskList
          tasks={activeDayTasks}
          onToggleTask={handleToggleTask}
          onDeleteTask={handleDeleteTask}
          isAdminUnlocked={isAdminUnlocked}
          currentTheme={currentTheme}
          dayName={selectedDayObj.full}
          onOpenAdmin={() => setIsPinModalOpen(true)}
        />
      </MobileFrame>

      {/* Secret Admin PIN Modal (PIN: 1234) */}
      <AdminPinModal
        isOpen={isPinModalOpen}
        onClose={() => setIsPinModalOpen(false)}
        onSuccess={handleUnlockAdmin}
        currentTheme={currentTheme}
      />

      {/* Floating Notification Toast */}
      <AnimatePresence>
        {adminToast && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className={`fixed bottom-6 z-50 px-4 py-2 rounded-2xl text-xs font-semibold shadow-2xl backdrop-blur-md border border-white/20 flex items-center gap-2 ${
              themeId === 'jojo' ? 'bg-[#0f172a]/95 text-sky-200' : 'bg-[#1e0b36]/95 text-purple-200'
            }`}
          >
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>{adminToast}</span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
