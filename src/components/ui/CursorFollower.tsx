import { useEffect, useRef } from 'react';

export function CursorFollower() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const frameRef = useRef<number | null>(null);
  const positionRef = useRef({ x: -100, y: -100 });
  const targetRef = useRef({ x: -100, y: -100 });

  useEffect(() => {
    const finePointer = window.matchMedia('(pointer: fine)');
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (!finePointer.matches || reducedMotion.matches) return;

    const updateTarget = (event: PointerEvent) => {
      targetRef.current = { x: event.clientX, y: event.clientY };
    };

    const animate = () => {
      const current = positionRef.current;
      const target = targetRef.current;
      current.x += (target.x - current.x) * 0.16;
      current.y += (target.y - current.y) * 0.16;

      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate3d(${current.x}px, ${current.y}px, 0)`;
      }
      frameRef.current = requestAnimationFrame(animate);
    };

    window.addEventListener('pointermove', updateTarget, { passive: true });
    frameRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('pointermove', updateTarget);
      if (frameRef.current !== null) cancelAnimationFrame(frameRef.current);
    };
  }, []);

  return <div ref={cursorRef} className="cursor-follower" aria-hidden="true" />;
}