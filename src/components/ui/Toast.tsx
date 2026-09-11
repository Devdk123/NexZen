import React, { createContext, useContext, useState, useCallback } from 'react';
import { createPortal } from 'react-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { CheckCircle, XCircle, AlertCircle, Info, X } from 'lucide-react';
import { cn } from '../../utils';

type ToastType = 'success' | 'error' | 'warning' | 'info';

interface Toast {
  id: string;
  type: ToastType;
  title: string;
  message?: string;
  duration?: number;
}

interface ToastContextValue {
  toast: (opts: Omit<Toast, 'id'>) => void;
  success: (title: string, message?: string) => void;
  error: (title: string, message?: string) => void;
  warning: (title: string, message?: string) => void;
  info: (title: string, message?: string) => void;
}

const ToastContext = createContext<ToastContextValue | null>(null);

const ICONS = {
  success: <CheckCircle size={18} className="text-green-400 flex-shrink-0" />,
  error: <XCircle size={18} className="text-red-400 flex-shrink-0" />,
  warning: <AlertCircle size={18} className="text-yellow-400 flex-shrink-0" />,
  info: <Info size={18} className="text-blue-400 flex-shrink-0" />,
};

const BORDERS = {
  success: 'border-green-500/30',
  error: 'border-red-500/30',
  warning: 'border-yellow-500/30',
  info: 'border-blue-500/30',
};

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const dismiss = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const addToast = useCallback((opts: Omit<Toast, 'id'>) => {
    const id = Date.now().toString();
    const duration = opts.duration ?? 4000;
    setToasts((prev) => [...prev.slice(-4), { ...opts, id }]);
    if (duration > 0) setTimeout(() => dismiss(id), duration);
  }, [dismiss]);

  const toast = addToast;
  const success = useCallback((title: string, message?: string) => addToast({ type: 'success', title, message }), [addToast]);
  const error = useCallback((title: string, message?: string) => addToast({ type: 'error', title, message }), [addToast]);
  const warning = useCallback((title: string, message?: string) => addToast({ type: 'warning', title, message }), [addToast]);
  const info = useCallback((title: string, message?: string) => addToast({ type: 'info', title, message }), [addToast]);

  return (
    <ToastContext.Provider value={{ toast, success, error, warning, info }}>
      {children}
      {createPortal(
        <div className="fixed bottom-6 right-6 z-[100] flex flex-col gap-3 pointer-events-none" aria-live="polite">
          <AnimatePresence>
            {toasts.map((t) => (
              <motion.div
                key={t.id}
                initial={{ opacity: 0, y: 20, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, x: 100, scale: 0.95 }}
                transition={{ type: 'spring', damping: 25, stiffness: 300 }}
                className={cn(
                  'pointer-events-auto w-80 glass-strong rounded-xl border p-4',
                  'shadow-card flex items-start gap-3',
                  BORDERS[t.type]
                )}
              >
                {ICONS[t.type]}
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-nexzen-text">{t.title}</p>
                  {t.message && <p className="text-xs text-nexzen-muted mt-0.5">{t.message}</p>}
                </div>
                <button
                  onClick={() => dismiss(t.id)}
                  className="text-nexzen-subtle hover:text-nexzen-text transition-colors flex-shrink-0"
                  aria-label="Dismiss"
                >
                  <X size={14} />
                </button>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>,
        document.body
      )}
    </ToastContext.Provider>
  );
}

export function useToast() {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error('useToast must be used inside ToastProvider');
  return ctx;
}

