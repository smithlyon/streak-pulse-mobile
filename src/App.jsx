import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Header } from './components/Header';
import { ThemeToggle } from './components/ThemeToggle';
import { StreakProgressBar } from './components/StreakProgressBar';
import { DaySelector } from './components/DaySelector';
import { TaskList } from './components/TaskList';
import { AdminPinModal } from './components/AdminPinModal';
import { AdminControls } from './components/AdminControls';
import { DeviceModeModal } from './components/DeviceModeModal';
import { THEMES } from './constants/themeConfig';
import { DAYS_OF_WEEK, INITIAL_TASKS } from './constants/initialData';
import { getWeekDaysForDate, jsDayToDayId, formatDateKey, getMondayOfWeek } from './utils/dateUtils';
import { subscribeProfileTasks, syncProfileTasksToCloud } from './services/syncService';
import { ShieldCheck, Lock } from 'lucide-react';

const STORAGE_KEY_THEME = 'daily_pulse_theme_v1';
const STORAGE_KEY_DEVICE_MODE = 'daily_pulse_device_mode_v1';
const getProfileStorageKey = (profile) => `daily_pulse_tasks_${profile}_v2`;

export default function App() {
  // Device Role: 'admin' (parent phone) or 'child' (kid phone, locked)
  const [deviceMode, setDeviceMode] = useState(() => {
    return localStorage.getItem(STORAGE_KEY_DEVICE_MODE) || 'admin';
  });

  // Theme / Profile state: 'jojo' (sky blue) or 'chocks' (rich purple)
  const [themeId, setThemeId] = useState(() => {
    const saved = localStorage.getItem(STORAGE_KEY_THEME);
    if (saved) return saved;
    return 'jojo';
  });

  // Selected date state - single source of truth for DaySelector & Admin Calendar
  const [selectedDate, setSelectedDate] = useState(() => {
    const now = new Date();
    const y = now.getFullYear();
    const m = now.getMonth();
    if ((y === 2026 && m >= 9) || (y === 2027 && m <= 3)) {
      return now;
    }
    return new Date(2026, 9, 20); // Tuesday, Oct 20, 2026
  });

  const weekDays = getWeekDaysForDate(selectedDate);
  const selectedDay = jsDayToDayId(selectedDate.getDay());

  // Independent tasks per profile: { jojo: tasksByDay, chocks: tasksByDay }
  const [tasksByProfile, setTasksByProfile] = useState(() => {
    const profiles = ['jojo', 'chocks'];
    const initial = {};

    profiles.forEach((p) => {
      try {
        const saved = localStorage.getItem(getProfileStorageKey(p));
        if (saved) {
          initial[p] = JSON.parse(saved);
          return;
        }
      } catch (e) {
        console.error(`Failed to load ${p} tasks`, e);
      }
      // Migrate legacy shared tasks to jojo if present
      if (p === 'jojo') {
        try {
          const legacy = localStorage.getItem('daily_pulse_tasks_v1');
          if (legacy) {
            initial[p] = JSON.parse(legacy);
            return;
          }
        } catch (e) {}
      }
      initial[p] = JSON.parse(JSON.stringify(INITIAL_TASKS));
    });

    return initial;
  });

  // Admin Mode & Modal states
  const [isAdminUnlocked, setIsAdminUnlocked] = useState(false);
  const [isPinModalOpen, setIsPinModalOpen] = useState(false);
  const [isDeviceModalOpen, setIsDeviceModalOpen] = useState(false);
  const [isCloudSynced, setIsCloudSynced] = useState(false);
  const [adminToast, setAdminToast] = useState('');

  // Persist device role to localStorage (remains permanently locked in Kid Mode across reloads)
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY_DEVICE_MODE, deviceMode);
  }, [deviceMode]);

  // Persist theme
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY_THEME, themeId);
  }, [themeId]);

  // Persist active profile's tasks locally in localStorage as offline fallback
  useEffect(() => {
    try {
      if (tasksByProfile[themeId]) {
        localStorage.setItem(getProfileStorageKey(themeId), JSON.stringify(tasksByProfile[themeId]));
      }
    } catch (e) {
      console.error(`Failed to save ${themeId} tasks to localStorage`, e);
    }
  }, [tasksByProfile, themeId]);

  // Real-time Cloud Sync with Google Firebase
  useEffect(() => {
    // 1. Subscribe to active profile's live updates from Firestore
    const unsubscribe = subscribeProfileTasks(
      themeId,
      (cloudTasks) => {
        setIsCloudSynced(true);
        if (cloudTasks && typeof cloudTasks === 'object' && Object.keys(cloudTasks).length > 0) {
          setTasksByProfile((prev) => ({
            ...prev,
            [themeId]: cloudTasks
          }));
        }
      },
      (err) => {
        console.warn('Firebase real-time listener notice:', err);
      }
    );

    // 2. Broadcast local initial profile tasks to cloud if not already synced
    if (tasksByProfile[themeId]) {
      syncProfileTasksToCloud(themeId, tasksByProfile[themeId])
        .then((ok) => {
          if (ok) setIsCloudSynced(true);
        })
        .catch(() => {});
    }

    return () => {
      if (unsubscribe) unsubscribe();
    };
  }, [themeId]);

  const currentTheme = THEMES[themeId] || THEMES.jojo;

  // Helper to retrieve tasks for any specific Date across any month
  const getTasksForDate = (dateObj) => {
    if (!dateObj) return [];
    const dateKey = formatDateKey(dateObj);
    const profileTasks = tasksByProfile[themeId] || {};

    // 1. Explicitly stored tasks for this dateKey
    if (profileTasks[dateKey] !== undefined) {
      return profileTasks[dateKey];
    }

    // 2. Default tasks for the initial launch week (Oct 19 - Oct 25, 2026)
    const monday = getMondayOfWeek(dateObj);
    const isLaunchWeek =
      monday.getFullYear() === 2026 &&
      monday.getMonth() === 9 &&
      monday.getDate() === 19;

    const dayId = jsDayToDayId(dateObj.getDay());
    if (isLaunchWeek) {
      if (profileTasks[dayId] !== undefined) {
        return profileTasks[dayId];
      }
      return INITIAL_TASKS[dayId] || [];
    }

    // 3. Any other date has 0 tasks by default until allocated
    return [];
  };

  // Active day tasks & counts for currently selected date
  const activeDayTasks = getTasksForDate(selectedDate);
  const completedCount = activeDayTasks.filter((t) => t.completed).length;
  const totalCount = activeDayTasks.length;
  const selectedDayObj = weekDays.find((d) => d.id === selectedDay) || {
    id: selectedDay,
    label: selectedDay.toUpperCase(),
    full: selectedDay === 'mon' ? 'Monday' :
          selectedDay === 'tue' ? 'Tuesday' :
          selectedDay === 'wed' ? 'Wednesday' :
          selectedDay === 'thu' ? 'Thursday' :
          selectedDay === 'fri' ? 'Friday' :
          selectedDay === 'sat' ? 'Saturday' : 'Sunday',
    dateNum: selectedDate.getDate()
  };

  // Current active week tasks map for DaySelector & StreakProgressBar
  const currentWeekTasksByDay = {};
  weekDays.forEach((d) => {
    currentWeekTasksByDay[d.id] = getTasksForDate(d.dateObj);
    currentWeekTasksByDay[d.dateKey] = getTasksForDate(d.dateObj);
  });

  // Dynamic Streak calculation for the active profile (starts at 0 and increments day by day)
  const completedDaysCount = weekDays.filter((d) => {
    const list = getTasksForDate(d.dateObj);
    return list.length > 0 && list.every((t) => t.completed);
  }).length;
  const streakDays = completedDaysCount;

  // Handlers (operate strictly on active profile and active date, pushing instantly to Firebase)
  const handleToggleTask = (taskId) => {
    if (deviceMode === 'child' || !isAdminUnlocked) {
      showToast('Admin login required to check off tasks');
      setIsPinModalOpen(true);
      return;
    }
    const dateKey = formatDateKey(selectedDate);
    const currentTasks = getTasksForDate(selectedDate);
    const updated = currentTasks.map((task) =>
      task.id === taskId ? { ...task, completed: !task.completed } : task
    );

    const updatedProfileTasks = {
      ...(tasksByProfile[themeId] || {}),
      [dateKey]: updated
    };

    setTasksByProfile((prev) => ({
      ...prev,
      [themeId]: updatedProfileTasks
    }));

    // Broadcast live to Firebase Firestore
    syncProfileTasksToCloud(themeId, updatedProfileTasks);
  };

  const handleDeleteTask = (taskId) => {
    const dateKey = formatDateKey(selectedDate);
    const currentTasks = getTasksForDate(selectedDate);
    const updated = currentTasks.filter((task) => task.id !== taskId);

    const updatedProfileTasks = {
      ...(tasksByProfile[themeId] || {}),
      [dateKey]: updated
    };

    setTasksByProfile((prev) => ({
      ...prev,
      [themeId]: updatedProfileTasks
    }));

    // Broadcast live to Firebase Firestore
    syncProfileTasksToCloud(themeId, updatedProfileTasks);
    showToast('Task removed');
  };

  const handleAddTask = ({ title, time, targetDate, dateStr }) => {
    const taskDate = targetDate ? new Date(targetDate) : selectedDate;
    const dateKey = formatDateKey(taskDate);
    const existingTasks = getTasksForDate(taskDate);

    const formattedLabel = taskDate.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric'
    });

    const newTask = {
      id: `${dateKey}-${Date.now()}`,
      title,
      time,
      completed: false,
      dateKey,
      dateStr: formattedLabel
    };

    const updatedProfileTasks = {
      ...(tasksByProfile[themeId] || {}),
      [dateKey]: [newTask, ...existingTasks]
    };

    setTasksByProfile((prev) => ({
      ...prev,
      [themeId]: updatedProfileTasks
    }));

    // Broadcast live to Firebase Firestore
    syncProfileTasksToCloud(themeId, updatedProfileTasks);
    showToast(`Task allocated for ${formattedLabel}!`);
  };

  const handleResetDefaults = () => {
    if (window.confirm(`Reset ${currentTheme.name}'s tasks to default initial state?`)) {
      const resetTasks = JSON.parse(JSON.stringify(INITIAL_TASKS));
      setTasksByProfile((prev) => ({
        ...prev,
        [themeId]: resetTasks
      }));
      syncProfileTasksToCloud(themeId, resetTasks);
      showToast(`${currentTheme.name}'s tasks reset to defaults`);
    }
  };

  const handleUnlockAdmin = () => {
    setIsAdminUnlocked(true);
    showToast('Admin Mode unlocked! Add, approve & delete controls active.');
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

  const isChildMode = deviceMode === 'child';

  return (
    <div className={`min-h-screen w-full ${currentTheme.bg} transition-colors duration-500 text-slate-100 flex flex-col items-center relative overflow-x-hidden`}>
      {/* Dynamic ambient backlight matching active theme */}
      <div 
        className={`fixed top-0 left-1/2 -translate-x-1/2 w-full max-w-xl h-[450px] rounded-full blur-[140px] pointer-events-none transition-colors duration-700 opacity-20 ${
          themeId === 'jojo' ? 'bg-sky-500' : 'bg-purple-600'
        }`}
      />

      {/* Main Full-Screen Mobile App Container (Edge-to-edge on mobile, centered max-w-lg on desktop) */}
      <div className="w-full max-w-lg min-h-screen flex flex-col relative z-10 pb-12">
        {/* Real App Header */}
        <Header
          currentTheme={currentTheme}
          onAdminClick={() => setIsPinModalOpen(true)}
          isAdminUnlocked={isAdminUnlocked}
          onLockAdmin={handleLockAdmin}
          deviceRole={deviceMode}
          onOpenDeviceSettings={() => {
            if (isChildMode) {
              // On Kid Phone: Require Admin PIN to unlock settings
              setIsPinModalOpen(true);
            } else {
              setIsDeviceModalOpen(true);
            }
          }}
          isCloudSynced={isCloudSynced}
        />

        {/* Profile Switcher (Jojo / Chocks) - Simple single button for BOTH Kid phone & Admin phone */}
        <div className="mt-3 sm:mt-4">
          <ThemeToggle 
            activeTheme={themeId} 
            onSelectTheme={(id) => {
              setThemeId(id);
              showToast(`Viewing ${id === 'jojo' ? 'Jojo' : 'Chocks'}`);
            }} 
          />
        </div>

        {/* Duolingo-style Continuous Daily Streak Counter */}
        <StreakProgressBar
          completedCount={completedCount}
          totalCount={totalCount}
          currentTheme={currentTheme}
          streakDays={streakDays}
          dayLabel={selectedDayObj.full}
          tasksByDay={currentWeekTasksByDay}
          selectedDay={selectedDay}
        />

        {/* Interactive Day Selector Pills (Mon - Sun) & Months (Oct - Apr) with Current Week Highlight */}
        <DaySelector
          selectedDate={selectedDate}
          onSelectDate={setSelectedDate}
          tasksByDay={currentWeekTasksByDay}
          currentTheme={currentTheme}
          weekDays={weekDays}
          onSelectMonth={(monthIdx, year) => {
            setSelectedDate(new Date(year, monthIdx, 1));
          }}
        />

        {/* Admin Inline Controls (Only available in Admin Mode and once unlocked with PIN) */}
        <AnimatePresence>
          {!isChildMode && isAdminUnlocked && (
            <AdminControls
              selectedDayName={selectedDayObj.full}
              selectedDayId={selectedDay}
              selectedDate={selectedDate}
              onSelectDate={setSelectedDate}
              onAddTask={handleAddTask}
              onResetDefaults={handleResetDefaults}
              currentTheme={currentTheme}
              getTasksForDate={getTasksForDate}
            />
          )}
        </AnimatePresence>

        {/* Dynamic Task List (Clean, No Category clutter) */}
        <div className="flex-1">
          <TaskList
            tasks={activeDayTasks}
            onToggleTask={handleToggleTask}
            onDeleteTask={handleDeleteTask}
            isAdminUnlocked={isAdminUnlocked}
            currentTheme={currentTheme}
            dayName={`${selectedDayObj.full}, ${selectedDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}`}
            onOpenAdmin={() => setIsPinModalOpen(true)}
            deviceRole={deviceMode}
            onChildAttemptToggle={() => {
              showToast('Habit awaiting Admin verification! ⏳');
            }}
          />
        </div>

        {/* In Kid Mode: Discreet Footer Button to unlock Admin */}
        {isChildMode && (
          <div className="mt-6 mb-2 text-center">
            <button
              onClick={() => {
                setIsPinModalOpen(true);
              }}
              className="text-[11px] text-slate-500 hover:text-slate-300 transition-colors inline-flex items-center gap-1.5 py-1.5 px-3 rounded-full bg-white/5 border border-white/5"
            >
              <Lock className="w-3 h-3 text-slate-400" />
              <span>Parent Access</span>
            </button>
          </div>
        )}
      </div>

      {/* Secret Admin Password Modal */}
      <AdminPinModal
        isOpen={isPinModalOpen}
        onClose={() => setIsPinModalOpen(false)}
        onSuccess={() => {
          if (isChildMode) {
            // If in kid mode and PIN verified, open Device Mode Modal to unlock Admin
            setIsDeviceModalOpen(true);
            showToast('PIN verified! You can switch back to Admin Phone.');
          } else {
            handleUnlockAdmin();
          }
        }}
        currentTheme={currentTheme}
      />

      {/* Device Mode Switcher Modal (Kid Mode Lock vs Admin Control) */}
      <DeviceModeModal
        isOpen={isDeviceModalOpen}
        onClose={() => setIsDeviceModalOpen(false)}
        deviceMode={deviceMode}
        onSetDeviceMode={(m) => {
          setDeviceMode(m);
          if (m === 'admin') {
            setIsAdminUnlocked(true);
          } else {
            setIsAdminUnlocked(false);
          }
          showToast(`Device set to ${m === 'admin' ? 'Admin Phone' : 'Kid Mode (Locked)'}!`);
        }}
        currentTheme={currentTheme}
        isCloudSynced={isCloudSynced}
      />

      {/* Floating Notification Toast */}
      <AnimatePresence>
        {adminToast && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className={`fixed bottom-6 z-50 px-4 py-2.5 rounded-2xl text-xs font-semibold shadow-2xl backdrop-blur-md border border-white/20 flex items-center gap-2 ${
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
