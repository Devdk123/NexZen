import React, { useState } from 'react';
import { cn } from '../../utils';
import { motion } from 'framer-motion';

interface Tab {
  id: string;
  label: React.ReactNode;
  content: React.ReactNode;
  count?: number;
}

interface TabsProps {
  tabs: Tab[];
  defaultTab?: string;
  className?: string;
  onChange?: (id: string) => void;
}

export function Tabs({ tabs, defaultTab, className, onChange }: TabsProps) {
  const [active, setActive] = useState(defaultTab || tabs[0]?.id);

  const handleChange = (id: string) => {
    setActive(id);
    onChange?.(id);
  };

  const activeTab = tabs.find((t) => t.id === active);

  return (
    <div className={cn('flex flex-col gap-6', className)}>
      {/* Tab bar */}
      <div className="flex items-center gap-1 p-1 glass rounded-xl border border-white/8 overflow-x-auto no-scrollbar">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => handleChange(tab.id)}
            className={cn(
              'relative flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200 whitespace-nowrap flex-shrink-0',
              active === tab.id ? 'text-nexzen-text' : 'text-nexzen-muted hover:text-nexzen-text'
            )}
          >
            {active === tab.id && (
              <motion.div
                layoutId="tab-indicator"
                className="absolute inset-0 bg-white/10 rounded-lg"
                transition={{ type: 'spring', bounce: 0.2, duration: 0.4 }}
              />
            )}
            <span className="relative z-10">{tab.label}</span>
            {tab.count !== undefined && (
              <span className={cn('relative z-10 px-1.5 py-0.5 rounded-full text-xs', active === tab.id ? 'bg-nexzen-accent/20 text-nexzen-accent' : 'bg-white/8 text-nexzen-subtle')}>
                {tab.count}
              </span>
            )}
          </button>
        ))}
      </div>

      {/* Content */}
      <div>{activeTab?.content}</div>
    </div>
  );
}
