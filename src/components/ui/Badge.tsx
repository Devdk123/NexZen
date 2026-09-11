import React from 'react';
import { cn } from '../../utils';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'default' | 'accent' | 'success' | 'warning' | 'danger' | 'cyan' | 'violet' | 'custom';
  size?: 'xs' | 'sm' | 'md';
  className?: string;
  dot?: boolean;
}

const badgeVariants = {
  default: 'bg-white/8 text-nexzen-muted border-white/10',
  accent: 'bg-nexzen-accent/15 text-nexzen-accent border-nexzen-accent/30',
  success: 'bg-green-500/15 text-green-400 border-green-500/30',
  warning: 'bg-yellow-500/15 text-yellow-400 border-yellow-500/30',
  danger: 'bg-red-500/15 text-red-400 border-red-500/30',
  cyan: 'bg-cyan-500/15 text-cyan-400 border-cyan-500/30',
  violet: 'bg-violet-500/15 text-violet-400 border-violet-500/30',
  custom: '',
};

const badgeSizes = {
  xs: 'px-2 py-0.5 text-xs',
  sm: 'px-2.5 py-1 text-xs',
  md: 'px-3 py-1.5 text-sm',
};

export function Badge({ children, variant = 'default', size = 'sm', className, dot }: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 rounded-full border font-medium',
        badgeVariants[variant],
        badgeSizes[size],
        className
      )}
    >
      {dot && <span className="w-1.5 h-1.5 rounded-full bg-current" />}
      {children}
    </span>
  );
}

// ─── Tag Badge (clickable) ────────────────────────────────
interface TagProps {
  children: React.ReactNode;
  active?: boolean;
  onClick?: () => void;
  className?: string;
}

export function Tag({ children, active, onClick, className }: TagProps) {
  return (
    <span
      onClick={onClick}
      className={cn(
        'inline-flex items-center px-2.5 py-1 rounded-lg text-xs font-medium border transition-all duration-150',
        active
          ? 'bg-nexzen-accent/20 text-nexzen-accent border-nexzen-accent/40'
          : 'bg-white/5 text-nexzen-muted border-white/10 hover:border-white/20 hover:text-nexzen-text',
        onClick && 'cursor-pointer',
        className
      )}
    >
      {children}
    </span>
  );
}

