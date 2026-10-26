import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Check, 
  Trash2, 
  Clock, 
  Sparkles,
  ListTodo,
  Lock,
  Calendar
} from 'lucide-react';

export const TaskList = ({ 
  tasks, 
  onToggleTask, 
  onDeleteTask, 
  isAdminUnlocked, 
  currentTheme,
  dayName,
  onOpenAdmin,
  deviceRole = 'admin',
  onChildAttemptToggle
}) => {
  const [filter, setFilter] = useState('all'); // all | active | completed

  const filteredTasks = tasks.filter(task => {
    if (filter === 'active') return !task.completed;
    if (filter === 'completed') return task.completed;
    return true;
  });

  return (
    <div className="px-4 py-2">
      {/* Header with Day name & filter pills */}
      <div className="flex items-center justify-between mb-3">
        <div>
          <h2 className="text-sm font-bold text-white flex items-center gap-2">
            <span>{dayName} Plan</span>
            <span className="text-[11px] font-mono px-2 py-0.5 rounded-full bg-white/10 text-slate-300 font-semibold">
              {tasks.length}
            </span>
          </h2>
        </div>

        {/* Filter chips (All / Active / Completed) */}
        <div className="flex items-center gap-1 bg-black/40 p-0.5 rounded-xl border border-white/5 text-[10px]">
          {['all', 'active', 'completed'].map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-2 py-1 rounded-lg capitalize transition-all ${
                filter === f
                  ? `${currentTheme.accentBg} text-slate-950 font-bold shadow-xs`
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      {/* Task List Items Container */}
      <div className="space-y-2 pb-6">
        <AnimatePresence mode="popLayout">
          {filteredTasks.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="py-10 text-center rounded-2xl border border-dashed border-white/10 p-6 bg-black/20"
            >
              <div className="w-12 h-12 mx-auto mb-3 rounded-2xl bg-white/5 flex items-center justify-center text-slate-400">
                <ListTodo className="w-6 h-6" />
              </div>
              <p className="text-xs font-semibold text-slate-300 mb-1">
                {filter === 'completed'
                  ? 'No completed tasks yet'
                  : filter === 'active'
                  ? 'All tasks checked off! 🚀'
                  : 'No tasks scheduled for this day'}
              </p>
              <p className="text-[11px] text-slate-500 max-w-[200px] mx-auto mb-3">
                {deviceRole === 'child'
                  ? 'All clear! Your parent will allocate upcoming tasks from their phone.'
                  : isAdminUnlocked
                  ? 'Use the inline form below to add custom daily tasks.'
                  : 'Unlock Admin Mode to allocate tasks.'}
              </p>
              {!isAdminUnlocked && deviceRole !== 'child' && (
                <button
                  onClick={onOpenAdmin}
                  className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold ${currentTheme.accentBadge} hover:bg-white/10 transition-colors`}
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Enter PIN to Add Tasks</span>
                </button>
              )}
            </motion.div>
          ) : (
            filteredTasks.map((task) => {
              return (
                <motion.div
                  key={task.id}
                  layout
                  initial={{ opacity: 0, y: 12, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9, height: 0, marginBottom: 0 }}
                  transition={{ duration: 0.25, ease: "easeOut" }}
                  className={`group relative p-3 rounded-2xl border backdrop-blur-md transition-all duration-200 flex items-center gap-3 ${
                    currentTheme.card
                  } ${currentTheme.cardHover} ${
                    task.completed ? 'opacity-70 bg-black/40' : 'shadow-md'
                  }`}
                >
                  {/* Custom Checkbox (Admin-Only Check-Off) */}
                  <motion.button
                    whileTap={isAdminUnlocked ? { scale: 0.85 } : { scale: 0.96 }}
                    onClick={() => {
                      if (deviceRole === 'child') {
                        if (onChildAttemptToggle) onChildAttemptToggle(task);
                      } else if (!isAdminUnlocked) {
                        onOpenAdmin();
                      } else {
                        onToggleTask(task.id);
                      }
                    }}
                    title={
                      deviceRole === 'child'
                        ? (task.completed ? "Completed! Verified by Admin" : "Habit will be checked off by Admin")
                        : isAdminUnlocked 
                        ? (task.completed ? "Mark incomplete (Admin)" : "Check off task (Admin)") 
                        : "Admin login required to check off tasks"
                    }
                    className={`relative flex-shrink-0 w-6 h-6 rounded-lg border flex items-center justify-center transition-all duration-200 focus:outline-none ${
                      task.completed
                        ? currentTheme.checkActive
                        : isAdminUnlocked
                        ? 'border-slate-500 bg-black/40 hover:border-slate-300 hover:shadow-sm cursor-pointer'
                        : 'border-slate-700 bg-black/25 opacity-60 hover:opacity-100 hover:border-slate-500 cursor-pointer'
                    }`}
                  >
                    {task.completed ? (
                      <motion.div
                        initial={{ scale: 0, rotate: -45 }}
                        animate={{ scale: 1, rotate: 0 }}
                        transition={{ type: "spring", stiffness: 500, damping: 25 }}
                      >
                        <Check className="w-3.5 h-3.5 text-slate-950 stroke-[3]" />
                      </motion.div>
                    ) : !isAdminUnlocked ? (
                      <Lock className="w-2.5 h-2.5 text-slate-500 opacity-60" />
                    ) : null}
                  </motion.button>

                  {/* Task Content: Title & Time / Date Metas (Clean, No Category) */}
                  <div 
                    className={`flex-1 min-w-0 select-none ${
                      isAdminUnlocked ? 'cursor-pointer' : ''
                    }`}
                    onClick={() => {
                      if (isAdminUnlocked) {
                        onToggleTask(task.id);
                      } else if (deviceRole === 'child') {
                        if (onChildAttemptToggle) onChildAttemptToggle(task);
                      } else {
                        onOpenAdmin();
                      }
                    }}
                  >
                    <p 
                      className={`text-xs font-semibold leading-snug transition-all duration-200 truncate ${
                        task.completed 
                          ? 'line-through text-slate-500 font-normal italic' 
                          : 'text-slate-100 hover:text-white'
                      }`}
                    >
                      {task.title}
                    </p>

                    <div className="flex items-center gap-2 mt-1">
                      {/* Time Pill */}
                      {task.time && (
                        <span className="inline-flex items-center gap-1 text-[9px] text-slate-400 font-mono">
                          <Clock className="w-2.5 h-2.5 text-slate-500" />
                          <span>{task.time}</span>
                        </span>
                      )}

                      {/* Scheduled Date Badge if set */}
                      {task.dateStr && (
                        <span className="inline-flex items-center gap-1 text-[9px] font-medium px-2 py-0.5 rounded-full bg-white/5 text-amber-300 border border-amber-500/20 font-mono">
                          <Calendar className="w-2.5 h-2.5 text-amber-400" />
                          <span>{task.dateStr}</span>
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Inline Delete Button (Admin Only) */}
                  {isAdminUnlocked && (
                    <motion.button
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      exit={{ scale: 0, opacity: 0 }}
                      whileHover={{ scale: 1.15 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={(e) => {
                        e.stopPropagation();
                        onDeleteTask(task.id);
                      }}
                      title="Delete task (Admin)"
                      className="p-1.5 rounded-xl bg-rose-500/10 hover:bg-rose-500/25 text-rose-400 border border-rose-500/20 transition-colors"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </motion.button>
                  )}
                </motion.div>
              );
            })
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};
