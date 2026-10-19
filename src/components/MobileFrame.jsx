import React, { useState, useEffect } from 'react';
import { Wifi, BatteryMedium, Sparkles, Shield, Lock, ShieldCheck } from 'lucide-react';
import { motion } from 'framer-motion';

export const MobileFrame = ({ 
  children, 
  currentTheme, 
  onAdminClick, 
  isAdminUnlocked,
  onLockAdmin
}) => {
  const [time, setTime] = useState('');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTime(now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false }));
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative mx-auto my-4 flex items-center justify-center">
      {/* External hardware button accents on chassis */}
      {/* Left side: Mute switch & Volume rockers */}
      <div className="absolute -left-[3px] top-28 h-7 w-[3px] rounded-l-sm bg-slate-700/80 shadow-sm" />
      <div className="absolute -left-[3px] top-40 h-12 w-[3px] rounded-l-sm bg-slate-700/80 shadow-sm" />
      <div className="absolute -left-[3px] top-56 h-12 w-[3px] rounded-l-sm bg-slate-700/80 shadow-sm" />
      {/* Right side: Power button */}
      <div className="absolute -right-[3px] top-40 h-16 w-[3px] rounded-r-sm bg-slate-700/80 shadow-sm" />

      {/* Main Smartphone Chassis Wrapper */}
      <div 
        className="relative w-[390px] max-w-[400px] h-[844px] rounded-[50px] p-[10px] bg-gradient-to-b from-slate-700 via-slate-800 to-slate-900 shadow-2xl transition-all duration-500 ease-out select-none ring-1 ring-white/10"
        style={{
          boxShadow: currentTheme.chassisGlow
        }}
      >
        {/* Inner bezel frame with metallic edge ring */}
        <div className="relative w-full h-full rounded-[42px] overflow-hidden flex flex-col bg-black ring-1 ring-black">
          
          {/* Top Status Bar with Notch */}
          <div className="relative z-30 pt-3 pb-2 px-6 flex items-center justify-between text-xs font-semibold text-white/90 bg-transparent">
            {/* Status Bar Left: Clock */}
            <span className="w-12 text-left tracking-tight font-mono text-[13px] font-bold text-slate-100">
              {time || '09:41'}
            </span>

            {/* Dynamic Island / Modern Top Notch */}
            <div className="relative -top-0.5 group">
              <motion.div 
                whileHover={{ scale: 1.05 }}
                className="w-28 h-6 bg-black rounded-full flex items-center justify-between px-3 border border-white/10 shadow-inner cursor-pointer"
              >
                {/* Camera lens with realistic blue optical reflection */}
                <div className="relative w-2.5 h-2.5 rounded-full bg-[#0a0e17] border border-sky-950 flex items-center justify-center">
                  <div className="w-1 h-1 rounded-full bg-blue-500/50" />
                </div>

                {/* Speaker slit & sensor dot */}
                <div className="w-6 h-1 bg-slate-800 rounded-full" />
                <div className="w-1.5 h-1.5 rounded-full bg-slate-800/80" />
              </motion.div>
            </div>

            {/* Status Bar Right: Signal, Wi-Fi, Battery */}
            <div className="w-16 flex items-center justify-end gap-1.5 text-slate-200">
              {/* Cellular Signal Bars */}
              <div className="flex items-end gap-[1.5px] h-3">
                <div className="w-[2.5px] h-1 bg-white rounded-xs" />
                <div className="w-[2.5px] h-1.5 bg-white rounded-xs" />
                <div className="w-[2.5px] h-2 bg-white rounded-xs" />
                <div className="w-[2.5px] h-2.5 bg-white rounded-xs" />
              </div>
              <Wifi className="w-3.5 h-3.5" />
              <BatteryMedium className="w-4 h-4 text-emerald-400" />
            </div>
          </div>

          {/* App Header Bar (Inside Mobile Screen) */}
          <header className="relative z-20 px-5 pt-1 pb-3 flex items-center justify-between border-b border-white/5">
            <div className="flex items-center gap-2">
              <div 
                className={`w-7 h-7 rounded-xl flex items-center justify-center ${currentTheme.accentBg} text-slate-950 font-black text-xs shadow-md shadow-${currentTheme.id === 'jojo' ? 'sky-500/30' : 'purple-500/30'}`}
              >
                ⚡
              </div>
              <div>
                <h1 className="text-sm font-bold text-white tracking-wide flex items-center gap-1.5">
                  DailyPulse
                  {isAdminUnlocked && (
                    <span className="flex items-center gap-0.5 text-[9px] font-mono uppercase px-1.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 animate-pulse">
                      <ShieldCheck className="w-2.5 h-2.5" /> Admin
                    </span>
                  )}
                </h1>
                <p className="text-[10px] text-slate-400">Streak & Habit Engine</p>
              </div>
            </div>

            {/* Header Right Actions: Sparkle Admin Trigger & Lock Toggle */}
            <div className="flex items-center gap-1.5">
              {isAdminUnlocked ? (
                <button
                  onClick={onLockAdmin}
                  title="Lock Admin Mode"
                  className="p-1.5 rounded-xl bg-rose-500/20 hover:bg-rose-500/30 text-rose-300 border border-rose-500/40 transition-all flex items-center gap-1 text-[11px] font-medium"
                >
                  <Lock className="w-3.5 h-3.5" />
                  <span>Lock</span>
                </button>
              ) : (
                <motion.button
                  whileHover={{ scale: 1.1, rotate: 15 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={onAdminClick}
                  title="Secret Admin Access"
                  className={`p-2 rounded-xl transition-all duration-300 bg-white/5 hover:bg-white/10 border border-white/10 ${currentTheme.accentClass} hover:shadow-lg`}
                >
                  <Sparkles className="w-4 h-4 animate-pulse" />
                </motion.button>
              )}
            </div>
          </header>

          {/* Screen Body Content (Scrollable Container) */}
          <main className={`relative z-10 flex-1 overflow-y-auto overflow-x-hidden ${currentTheme.bg} transition-colors duration-500`}>
            {children}
          </main>

          {/* Bottom Home Indicator Bar (iOS style) */}
          <div className="relative z-30 pt-2 pb-2.5 flex items-center justify-center bg-black/40 backdrop-blur-md border-t border-white/5">
            <motion.div 
              whileHover={{ width: '150px' }}
              className="w-32 h-1 bg-white/40 hover:bg-white/80 transition-all duration-200 rounded-full cursor-pointer" 
            />
          </div>

        </div>
      </div>
    </div>
  );
};
