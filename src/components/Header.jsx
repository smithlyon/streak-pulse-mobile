import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Lock, ShieldCheck, Cloud, Settings2, Smartphone } from 'lucide-react';

export const Header = ({ 
  currentTheme, 
  onAdminClick, 
  isAdminUnlocked, 
  onLockAdmin,
  deviceRole = 'admin',
  onOpenDeviceSettings,
  isCloudSynced = true,
  lockedProfile = null
}) => {
  const isChildMode = deviceRole === 'child';

  return (
    <header className="sticky top-0 z-30 px-4 pt-12 pb-4 sm:pt-16 sm:pb-6 flex flex-col items-center justify-center border-b border-white/5 backdrop-blur-xl bg-black/40 transition-all duration-300">
      {/* Top Utility Ribbon: Device Mode Status & Cloud Sync */}
      <div className="w-full max-w-md flex items-center justify-between mb-3 px-1 text-[11px]">
        {/* Device Mode Badge */}
        <button
          onClick={onOpenDeviceSettings}
          title="Click to change device mode (Admin vs Child)"
          className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full font-bold transition-all border ${
            isChildMode
              ? 'bg-purple-500/15 text-purple-300 border-purple-500/30 hover:bg-purple-500/25'
              : 'bg-white/5 text-slate-300 border-white/10 hover:bg-white/10'
          }`}
        >
          {isChildMode ? (
            <>
              <Smartphone className="w-3 h-3 text-purple-400" />
              <span>Child Mode ({lockedProfile ? lockedProfile.toUpperCase() : 'Active'})</span>
            </>
          ) : (
            <>
              <ShieldCheck className="w-3 h-3 text-sky-400" />
              <span>Admin Phone</span>
            </>
          )}
          <Settings2 className="w-3 h-3 text-slate-500 ml-0.5" />
        </button>

        {/* Real-time Cloud Sync Indicator */}
        <div 
          title={isCloudSynced ? "Connected live to Google Firebase cloud database" : "Connecting to Google Firebase..."}
          className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-black/40 border border-white/5 text-[10px] font-medium text-slate-400"
        >
          <Cloud className={`w-3 h-3 ${isCloudSynced ? 'text-emerald-400' : 'text-amber-400 animate-pulse'}`} />
          <span className="flex items-center gap-1">
            <span className={`w-1.5 h-1.5 rounded-full ${isCloudSynced ? 'bg-emerald-400' : 'bg-amber-400 animate-ping'}`} />
            {isCloudSynced ? 'Cloud Live' : 'Syncing'}
          </span>
        </div>
      </div>

      {/* Main Center Area: Child Branding OR Admin Action Button */}
      <div className="flex items-center justify-center">
        {isChildMode ? (
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="text-center py-1"
          >
            <h1 className="text-xl sm:text-2xl font-black font-playful tracking-tight text-white flex items-center justify-center gap-2">
              <span className={`p-1.5 rounded-xl ${currentTheme.accentBadge}`}>
                <Sparkles className="w-4 h-4" />
              </span>
              <span>{lockedProfile === 'chocks' ? "Chocks's Pulse" : lockedProfile === 'jojo' ? "Jojo's Pulse" : "Daily Pulse"}</span>
            </h1>
            <p className="text-[11px] font-semibold text-slate-400 mt-0.5">
              Build your daily streak & conquer habits! 🔥
            </p>
          </motion.div>
        ) : isAdminUnlocked ? (
          <div className="flex items-center gap-3 py-1">
            <span className="flex items-center gap-1.5 text-xs uppercase px-3 py-1.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 animate-pulse font-bold shadow-sm">
              <ShieldCheck className="w-3.5 h-3.5" /> Admin Active
            </span>
            <button
              onClick={onLockAdmin}
              title="Lock Admin Mode"
              className="px-3.5 py-1.5 rounded-2xl bg-rose-500/20 hover:bg-rose-500/30 text-rose-300 border border-rose-500/40 transition-all flex items-center gap-1.5 text-xs font-bold shadow-sm hover:scale-105 active:scale-95"
            >
              <Lock className="w-3.5 h-3.5" />
              <span>Lock</span>
            </button>
          </div>
        ) : (
          <motion.button
            whileHover={{ scale: 1.15, rotate: 12 }}
            whileTap={{ scale: 0.9 }}
            onClick={onAdminClick}
            title="Admin Access (PIN: 1234)"
            className={`p-3.5 rounded-2xl transition-all duration-300 bg-white/5 hover:bg-white/10 border border-white/10 ${currentTheme.accentClass} hover:shadow-xl flex items-center justify-center`}
          >
            <Sparkles className="w-6 h-6 animate-pulse" />
          </motion.button>
        )}
      </div>
    </header>
  );
};
