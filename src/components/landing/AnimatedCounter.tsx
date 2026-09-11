import { useEffect, useRef, useState } from 'react';
import { useInView, useMotionValue, useSpring } from 'framer-motion';

interface AnimatedCounterProps {
  /** The final numeric value to count up to */
  target: number;
  /** Duration of the count-up animation in seconds */
  duration?: number;
  /** Optional prefix rendered before the number (e.g. '$') */
  prefix?: string;
  /** Optional suffix rendered after the number (e.g. '+', 'k', '%') */
  suffix?: string;
  /** If true, formats number with locale string (commas) */
  format?: boolean;
  className?: string;
}

/**
 * Counts up from 0 to `target` once the element enters the viewport.
 * Uses framer-motion's useSpring for a smooth, physics-based easing effect.
 */
export function AnimatedCounter({
  target,
  duration = 2,
  prefix = '',
  suffix = '',
  format = false,
  className,
}: AnimatedCounterProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });

  const motionValue = useMotionValue(0);
  const springValue = useSpring(motionValue, {
    stiffness: 60,
    damping: 25,
    duration,
  });

  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    if (inView) {
      motionValue.set(target);
    }
  }, [inView, target, motionValue]);

  useEffect(() => {
    const unsubscribe = springValue.on('change', (latest) => {
      setDisplayValue(Math.round(latest));
    });
    return unsubscribe;
  }, [springValue]);

  const formatted = format
    ? displayValue.toLocaleString('en-IN')
    : displayValue.toString();

  return (
    <span ref={ref} className={className}>
      {prefix}
      {formatted}
      {suffix}
    </span>
  );
}
