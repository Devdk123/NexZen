import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';
import { cn } from '../../utils';

interface AccordionItem {
  id: string;
  trigger: React.ReactNode;
  content: React.ReactNode;
}

interface AccordionProps {
  items: AccordionItem[];
  allowMultiple?: boolean;
  className?: string;
}

export function Accordion({ items, allowMultiple = false, className }: AccordionProps) {
  const [open, setOpen] = useState<string[]>([]);

  const toggle = (id: string) => {
    if (allowMultiple) {
      setOpen((prev) => (prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]));
    } else {
      setOpen((prev) => (prev.includes(id) ? [] : [id]));
    }
  };

  return (
    <div className={cn('space-y-3', className)}>
      {items.map((item) => {
        const isOpen = open.includes(item.id);
        return (
          <div key={item.id} className={cn('glass rounded-xl border border-white/8 overflow-hidden transition-all duration-200', isOpen && 'border-nexzen-accent/30')}>
            <button
              onClick={() => toggle(item.id)}
              className="w-full flex items-center justify-between p-4 text-left gap-3"
              aria-expanded={isOpen}
            >
              <div className="flex-1">{item.trigger}</div>
              <motion.div animate={{ rotate: isOpen ? 180 : 0 }} transition={{ duration: 0.2 }}>
                <ChevronDown size={18} className="text-nexzen-muted flex-shrink-0" />
              </motion.div>
            </button>
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.25, ease: 'easeInOut' }}
                  className="overflow-hidden"
                >
                  <div className="px-4 pb-4 border-t border-white/6 pt-3">{item.content}</div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}

