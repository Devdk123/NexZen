import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const STORAGE_KEY = 'nexzen-banner-dismissed';

export function AnnouncementBanner() {
  const [dismissed, setDismissed] = useState(() => {
    return sessionStorage.getItem(STORAGE_KEY) === 'true';
  });

  const handleDismiss = () => {
    setDismissed(true);
    sessionStorage.setItem(STORAGE_KEY, 'true');
    window.dispatchEvent(new Event('nexzen-banner-dismissed'));
  };

  return (
    <AnimatePresence>
      {!dismissed && (
        <motion.aside
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: 'auto', opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.3, ease: 'easeInOut' }}
          className="fixed top-0 left-0 right-0 z-50 overflow-hidden"
          aria-label="Announcement"
        >
          <div className="relative bg-[#0a0e1a]/95 backdrop-blur-md border-b border-white/8 shadow-md">
            {/* Subtle gradient accent line */}
            <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-nexzen-accent/40 to-transparent" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2 flex items-center justify-center gap-x-4 gap-y-1 flex-wrap">
              <p className="text-xs sm:text-sm text-nexzen-muted text-center">
                <span className="mr-1.5">🎉</span>
                <span className="font-medium text-nexzen-text">NEXZEN 2026</span>
                {' '}Registration is LIVE!
                <span className="hidden sm:inline"> | October 15, 2026 | 24 Hours | National Level</span>
              </p>

              <Link
                to="/nexzen-2026"
                className="inline-flex items-center text-xs sm:text-sm font-semibold text-nexzen-accent hover:text-white transition-colors whitespace-nowrap"
              >
                Register Now →
              </Link>

              <button
                onClick={handleDismiss}
                className="absolute right-3 top-1/2 -translate-y-1/2 p-1 rounded-md text-nexzen-subtle hover:text-nexzen-text hover:bg-white/8 transition-all"
                aria-label="Dismiss banner"
              >
                <X size={14} />
              </button>
            </div>
          </div>
        </motion.aside>
      )}
    </AnimatePresence>
  );
}
