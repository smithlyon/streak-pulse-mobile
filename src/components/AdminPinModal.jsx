import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Lock, Delete, X, KeyRound, Sparkles, Check, AlertCircle } from 'lucide-react';

export const AdminPinModal = ({ isOpen, onClose, onSuccess, currentTheme }) => {
  const [pin, setPin] = useState('');
  const [error, setError] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setPin('');
      setError(false);
      setIsSuccess(false);
    }
  }, [isOpen]);

  // Handle physical keyboard input
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e) => {
      if (e.key >= '0' && e.key <= '9') {
        handleDigit(e.key);
      } else if (e.key === 'Backspace') {
        handleBackspace();
      } else if (e.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, pin]);

  const handleDigit = (digit) => {
    if (pin.length < 4) {
      const nextPin = pin + digit;
      setPin(nextPin);
      setError(false);

      if (nextPin.length === 4) {
        if (nextPin === '1234') {
          setIsSuccess(true);
          setTimeout(() => {
            onSuccess();
            onClose();
          }, 450);
        } else {
          setError(true);
          setTimeout(() => {
            setPin('');
            setError(false);
          }, 800);
        }
      }
    }
  };

  const handleBackspace = () => {
    setPin((prev) => prev.slice(0, -1));
    setError(false);
  };

  const handleClear = () => {
    setPin('');
    setError(false);
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="absolute inset-0 z-50 flex items-center justify-center p-4">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-black/80 backdrop-blur-md"
        />

        {/* Modal Sheet / Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          transition={{ type: "spring", stiffness: 400, damping: 28 }}
          className={`relative z-10 w-full max-w-[340px] rounded-3xl p-6 border shadow-2xl ${currentTheme.card} ${
            currentTheme.id === 'jojo' ? 'glow-jojo' : 'glow-chocks'
          }`}
        >
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-1.5 rounded-full bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white transition-colors"
          >
            <X className="w-4 h-4" />
          </button>

          {/* Modal Header */}
          <div className="text-center mb-5">
            <div className={`w-12 h-12 mx-auto mb-3 rounded-2xl flex items-center justify-center ${currentTheme.accentBadge}`}>
              {isSuccess ? (
                <Check className="w-6 h-6 text-emerald-400 stroke-[3]" />
              ) : (
                <KeyRound className={`w-6 h-6 ${currentTheme.accentClass}`} />
              )}
            </div>
            <h3 className="text-base font-bold text-white tracking-tight flex items-center justify-center gap-1.5">
              <span>Admin Access</span>
              <Sparkles className={`w-4 h-4 ${currentTheme.accentClass}`} />
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              Enter master PIN to manage daily tasks
            </p>
          </div>

          {/* PIN Indicators (4 Dots) */}
          <motion.div
            animate={error ? { x: [-10, 10, -8, 8, -4, 4, 0] } : {}}
            transition={{ duration: 0.4 }}
            className="flex items-center justify-center gap-4 mb-4"
          >
            {[0, 1, 2, 3].map((index) => {
              const filled = pin.length > index;
              return (
                <div
                  key={index}
                  className={`w-3.5 h-3.5 rounded-full border transition-all duration-200 flex items-center justify-center ${
                    error
                      ? 'border-rose-500 bg-rose-500/30'
                      : isSuccess
                      ? 'border-emerald-400 bg-emerald-400 shadow-[0_0_10px_#34d399]'
                      : filled
                      ? `${currentTheme.accentBg} border-transparent shadow-[0_0_8px_currentColor]`
                      : 'border-slate-600 bg-white/5'
                  }`}
                />
              );
            })}
          </motion.div>

          {/* Error / Status Message */}
          <div className="h-5 text-center mb-3">
            {error ? (
              <span className="text-[11px] font-medium text-rose-400 flex items-center justify-center gap-1">
                <AlertCircle className="w-3 h-3" /> Incorrect PIN. Please try again.
              </span>
            ) : isSuccess ? (
              <span className="text-[11px] font-semibold text-emerald-400 flex items-center justify-center gap-1">
                <Check className="w-3 h-3 stroke-[3]" /> Access Granted!
              </span>
            ) : null}
          </div>

          {/* iOS-Style Number Keypad */}
          <div className="grid grid-cols-3 gap-2.5 max-w-[260px] mx-auto">
            {['1', '2', '3', '4', '5', '6', '7', '8', '9'].map((digit) => (
              <button
                key={digit}
                type="button"
                onClick={() => handleDigit(digit)}
                className="h-12 rounded-2xl bg-white/5 hover:bg-white/10 active:bg-white/20 border border-white/5 text-lg font-bold text-white transition-all duration-150 flex items-center justify-center select-none"
              >
                {digit}
              </button>
            ))}

            {/* Clear Button */}
            <button
              type="button"
              onClick={handleClear}
              className="h-12 rounded-2xl bg-white/5 hover:bg-white/10 text-xs font-semibold text-slate-400 hover:text-white transition-all flex items-center justify-center"
            >
              Clear
            </button>

            {/* 0 Button */}
            <button
              type="button"
              onClick={() => handleDigit('0')}
              className="h-12 rounded-2xl bg-white/5 hover:bg-white/10 active:bg-white/20 border border-white/5 text-lg font-bold text-white transition-all flex items-center justify-center select-none"
            >
              0
            </button>

            {/* Backspace Button */}
            <button
              type="button"
              onClick={handleBackspace}
              className="h-12 rounded-2xl bg-white/5 hover:bg-white/10 active:bg-white/20 text-slate-400 hover:text-white transition-all flex items-center justify-center"
            >
              <Delete className="w-5 h-5" />
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
