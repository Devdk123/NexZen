import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '../../utils';

interface EmptyStateProps {
  icon?: React.ReactNode;
  title: string;
  description?: string;
  action?: React.ReactNode;
  className?: string;
}

export function EmptyState({ icon, title, description, action, className }: EmptyStateProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className={cn('flex flex-col items-center justify-center text-center py-20 px-6 gap-4', className)}
    >
      {icon && (
        <motion.div
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.1, type: 'spring', bounce: 0.3 }}
          className="w-20 h-20 rounded-2xl glass border border-white/10 flex items-center justify-center text-nexzen-subtle"
        >
          {icon}
        </motion.div>
      )}
      <div className="space-y-2">
        <h3 className="text-lg font-bold text-nexzen-text">{title}</h3>
        {description && <p className="text-sm text-nexzen-muted max-w-sm">{description}</p>}
      </div>
      {action && <div className="mt-2">{action}</div>}
    </motion.div>
  );
}
