import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Smartphone, ShieldCheck, Sparkles, Cloud, Lock, Check } from 'lucide-react';

export const DeviceModeModal = ({
  isOpen,
  onClose,
  deviceMode, // 'admin' | 'child'
  onSetDeviceMode,
  currentTheme,
  isCloudSynced
}) => {
  const [selectedMode, setSelectedMode] = useState(deviceMode);
  const [pinInput, setPinInput] = useState('');
  const [pinError, setPinError] = useState('');

  if (!isOpen) return null;

  const handleSave = () => {
    // If switching from child back to admin, require Admin password
    if (deviceMode === 'child' && selectedMode === 'admin') {
      if (pinInput !== '26260891') {
        setPinError('Incorrect Admin password');
        return;
      }
    }

    onSetDeviceMode(selectedMode);
    setPinError('');
    onClose();
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-black/80 backdrop-blur-md"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ scale: 0.9, opacity: 0, y: 15 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.9, opacity: 0, y: 15 }}
          className={`relative w-full max-w-sm rounded-3xl p-5 ${currentTheme.card} border shadow-2xl overflow-hidden`}
        >
          {/* Header */}
          <div className="flex items-center justify-between pb-3 mb-3 border-b border-white/10">
            <div className="flex items-center gap-2">
              <span className={`p-2 rounded-xl ${currentTheme.accentBadge}`}>
                <Smartphone className="w-4 h-4" />
              </span>
              <div>
                <h3 className="text-sm font-bold text-white">Device Mode</h3>
                <p className="text-[10px] text-slate-400">Lock Kid Mode vs Admin Control</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 rounded-xl hover:bg-white/10 text-slate-400 hover:text-white transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Cloud Sync Status Banner */}
          <div className="mb-4 p-2.5 rounded-2xl bg-black/40 border border-white/5 flex items-center justify-between text-xs">
            <div className="flex items-center gap-2">
              <Cloud className={`w-4 h-4 ${isCloudSynced ? 'text-emerald-400' : 'text-amber-400'}`} />
              <span className="font-semibold text-slate-200">Google Firebase Sync</span>
            </div>
            <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1 ${
              isCloudSynced ? 'bg-emerald-500/20 text-emerald-300' : 'bg-amber-500/20 text-amber-300'
            }`}>
              <span className={`w-1.5 h-1.5 rounded-full ${isCloudSynced ? 'bg-emerald-400 animate-pulse' : 'bg-amber-400'}`} />
              {isCloudSynced ? 'Live' : 'Connecting'}
            </span>
          </div>

          {/* Role Choice */}
          <div className="space-y-2.5 mb-4">
            <label className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block px-0.5">
              Select Phone Role
            </label>

            {/* Admin Option */}
            <button
              type="button"
              onClick={() => setSelectedMode('admin')}
              className={`w-full p-3 rounded-2xl border text-left transition-all flex items-start gap-3 ${
                selectedMode === 'admin'
                  ? `${currentTheme.accentBg} text-slate-950 font-bold shadow-lg`
                  : 'bg-white/5 border-white/10 text-slate-300 hover:bg-white/10'
              }`}
            >
              <ShieldCheck className={`w-5 h-5 mt-0.5 flex-shrink-0 ${selectedMode === 'admin' ? 'text-slate-950' : 'text-sky-400'}`} />
              <div>
                <div className="flex items-center gap-1.5">
                  <span className="text-xs font-bold">Admin Phone (Parent)</span>
                  {selectedMode === 'admin' && <Check className="w-3.5 h-3.5" />}
                </div>
                <p className={`text-[10px] mt-0.5 ${selectedMode === 'admin' ? 'text-slate-900 font-medium' : 'text-slate-400'}`}>
                  Full control: Allocate tasks ahead of time, calendar scheduler, approve & check off tasks.
                </p>
              </div>
            </button>

            {/* Child Option */}
            <button
              type="button"
              onClick={() => setSelectedMode('child')}
              className={`w-full p-3 rounded-2xl border text-left transition-all flex items-start gap-3 ${
                selectedMode === 'child'
                  ? `${currentTheme.accentBg} text-slate-950 font-bold shadow-lg`
                  : 'bg-white/5 border-white/10 text-slate-300 hover:bg-white/10'
              }`}
            >
              <Sparkles className={`w-5 h-5 mt-0.5 flex-shrink-0 ${selectedMode === 'child' ? 'text-slate-950' : 'text-purple-400'}`} />
              <div>
                <div className="flex items-center gap-1.5">
                  <span className="text-xs font-bold">Kid Mode (Locked In)</span>
                  {selectedMode === 'child' && <Check className="w-3.5 h-3.5" />}
                </div>
                <p className={`text-[10px] mt-0.5 ${selectedMode === 'child' ? 'text-slate-900 font-medium' : 'text-slate-400'}`}>
                  Locked to daily habits and flame streaks. All admin tools and calendar controls are stripped away until Admin PIN is entered.
                </p>
              </div>
            </button>
          </div>

          {/* Security PIN requirement when switching from Child to Admin */}
          {deviceMode === 'child' && selectedMode === 'admin' && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              className="mb-4 p-3 rounded-2xl bg-rose-500/10 border border-rose-500/20 space-y-2"
            >
              <div className="flex items-center gap-1.5 text-xs text-rose-300 font-semibold">
                <Lock className="w-3.5 h-3.5" />
                <span>Enter Admin Password to unlock:</span>
              </div>
              <input
                type="password"
                inputMode="numeric"
                maxLength={8}
                value={pinInput}
                onChange={(e) => {
                  setPinInput(e.target.value);
                  setPinError('');
                }}
                placeholder="Enter password..."
                className="w-full text-center tracking-widest text-base font-mono py-2 rounded-xl bg-black/60 border border-white/20 text-white focus:outline-none focus:ring-2 focus:ring-rose-500"
              />
              {pinError && <p className="text-[10px] text-rose-400 font-bold text-center">{pinError}</p>}
            </motion.div>
          )}

          {/* Action Buttons */}
          <div className="flex gap-2">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-2.5 rounded-2xl bg-white/5 hover:bg-white/10 text-slate-300 text-xs font-bold transition-colors"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleSave}
              className={`flex-1 py-2.5 rounded-2xl ${currentTheme.accentBg} text-slate-950 text-xs font-black shadow-lg hover:brightness-110 transition-all`}
            >
              Apply Mode
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
