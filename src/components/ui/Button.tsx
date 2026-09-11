import React from 'react';
import { cn } from '../../utils';
import { Loader2 } from 'lucide-react';
import { motion } from 'framer-motion';

type Variant = 'primary' | 'secondary' | 'ghost' | 'danger' | 'outline' | 'glass';
type Size = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
  loading?: boolean;
  icon?: React.ReactNode;
  iconRight?: React.ReactNode;
  fullWidth?: boolean;
  glow?: boolean;
}

const variants: Record<Variant, string> = {
  primary:
    'bg-gradient-to-r from-nexzen-accent to-nexzen-violet text-white border-transparent hover:shadow-glow hover:scale-[1.02] active:scale-[0.98]',
  secondary:
    'bg-white/10 text-nexzen-text border-white/15 hover:bg-white/15 hover:border-white/25',
  ghost:
    'bg-transparent text-nexzen-muted border-transparent hover:text-nexzen-text hover:bg-white/5',
  danger:
    'bg-red-500/20 text-red-400 border-red-500/30 hover:bg-red-500/30 hover:border-red-500/50',
  outline:
    'bg-transparent text-nexzen-accent border-nexzen-accent/40 hover:bg-nexzen-accent/10 hover:border-nexzen-accent/70',
  glass:
    'glass text-nexzen-text border-white/10 hover:border-white/20 hover:bg-white/8',
};

const sizes: Record<Size, string> = {
  xs: 'px-3 py-1.5 text-xs rounded-lg gap-1.5',
  sm: 'px-4 py-2 text-sm rounded-xl gap-2',
  md: 'px-5 py-2.5 text-sm rounded-xl gap-2',
  lg: 'px-6 py-3 text-base rounded-xl gap-2.5',
  xl: 'px-8 py-4 text-lg rounded-2xl gap-3',
};

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = 'primary', size = 'md', loading, icon, iconRight, fullWidth, glow, className, children, disabled, ...props }, ref) => {
    return (
      <motion.button
        ref={ref}
        whileHover={{ y: -2, rotateX: 2, rotateY: -2, scale: 1.02 }}
        whileTap={{ scale: 0.97 }}
        className={cn(
          'interactive-button inline-flex items-center justify-center font-medium border transition-all duration-200 select-none cursor-pointer',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-nexzen-accent focus-visible:ring-offset-1 focus-visible:ring-offset-nexzen-bg',
          'disabled:opacity-50 disabled:pointer-events-none',
          variants[variant],
          sizes[size],
          fullWidth && 'w-full',
          glow && 'shadow-glow',
          className
        )}
        disabled={disabled || loading}
        {...(props as React.ComponentProps<typeof motion.button>)}
      >
        {loading ? (
          <Loader2 className="animate-spin" size={16} />
        ) : (
          icon && <span className="flex-shrink-0">{icon}</span>
        )}
        {children}
        {iconRight && !loading && <span className="flex-shrink-0">{iconRight}</span>}
      </motion.button>
    );
  }
);

Button.displayName = 'Button';

