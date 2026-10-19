import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Sparkles, X, ShieldAlert, RotateCcw, Clock, Tag } from 'lucide-react';
import { CATEGORIES } from '../constants/initialData';

export const AdminControls = ({ 
  selectedDayName, 
  onAddTask, 
  onResetDefaults, 
  currentTheme 
}) => {
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('work');
  const [time, setTime] = useState('09:00 AM');
  const [isExpanded, setIsExpanded] = useState(true);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) return;

    onAddTask({
      title: title.trim(),
      category,
      time: time.trim() || 'Flexible'
    });

    setTitle('');
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      className="px-4 py-2"
    >
      <div className={`p-4 rounded-3xl border ${currentTheme.card} shadow-lg relative overflow-hidden ring-1 ${
        currentTheme.id === 'jojo' ? 'ring-sky-500/30' : 'ring-purple-500/30'
      }`}>
        {/* Admin Header Ribbon */}
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-1.5">
            <span className="p-1 rounded-lg bg-emerald-500/20 text-emerald-400">
              <Sparkles className="w-3.5 h-3.5" />
            </span>
            <span className="text-xs font-bold text-white uppercase tracking-wider">
              Admin Mode: {selectedDayName}
            </span>
          </div>

          <button
            onClick={onResetDefaults}
            title="Reset this week to original initial tasks"
            className="flex items-center gap-1 text-[10px] text-slate-400 hover:text-rose-400 transition-colors px-2 py-0.5 rounded-lg bg-white/5 hover:bg-rose-500/10 border border-white/5"
          >
            <RotateCcw className="w-2.5 h-2.5" />
            <span>Reset Defaults</span>
          </button>
        </div>

        {/* Task Creator Form */}
        <form onSubmit={handleSubmit} className="space-y-2.5">
          {/* Title Input */}
          <div className="relative">
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder={`Add task for ${selectedDayName}...`}
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
                className="w-full pl-8 pr-2 py-1.5 rounded-xl bg-black/40 border border-white/10 text-[11px] font-mono text-slate-200 placeholder-slate-600 focus:outline-none focus:border-white/30"
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
              <span>Add Task</span>
            </button>
          </div>
        </form>
      </div>
    </motion.div>
  );
};
