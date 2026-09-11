import React from 'react';
import { cn } from '../../utils';
import { Check } from 'lucide-react';

interface StepperProps {
  steps: { label: string; description?: string }[];
  currentStep: number;
  className?: string;
}

export function Stepper({ steps, currentStep, className }: StepperProps) {
  return (
    <div className={cn('w-full', className)}>
      {/* Desktop: horizontal */}
      <div className="hidden md:flex items-center">
        {steps.map((step, index) => {
          const isCompleted = index < currentStep;
          const isCurrent = index === currentStep;
          const isUpcoming = index > currentStep;

          return (
            <React.Fragment key={index}>
              <div className="flex flex-col items-center gap-2">
                <div
                  className={cn(
                    'w-10 h-10 rounded-full flex items-center justify-center border-2 font-semibold text-sm transition-all duration-300',
                    isCompleted && 'bg-nexzen-accent border-nexzen-accent text-white',
                    isCurrent && 'border-nexzen-accent text-nexzen-accent bg-nexzen-accent/10 shadow-glow-sm',
                    isUpcoming && 'border-white/15 text-nexzen-subtle bg-transparent'
                  )}
                >
                  {isCompleted ? <Check size={16} /> : <span>{index + 1}</span>}
                </div>
                <div className="text-center">
                  <p className={cn('text-xs font-medium whitespace-nowrap', isCurrent ? 'text-nexzen-text' : isCompleted ? 'text-nexzen-accent' : 'text-nexzen-subtle')}>
                    {step.label}
                  </p>
                </div>
              </div>
              {index < steps.length - 1 && (
                <div className={cn('flex-1 h-0.5 mx-3 transition-all duration-500', index < currentStep ? 'bg-nexzen-accent' : 'bg-white/10')} />
              )}
            </React.Fragment>
          );
        })}
      </div>

      {/* Mobile: current step indicator */}
      <div className="flex md:hidden items-center justify-between">
        <div>
          <p className="text-xs text-nexzen-muted">Step {currentStep + 1} of {steps.length}</p>
          <p className="text-sm font-semibold text-nexzen-text">{steps[currentStep]?.label}</p>
        </div>
        <div className="flex gap-1">
          {steps.map((_, i) => (
            <div
              key={i}
              className={cn(
                'h-1.5 rounded-full transition-all duration-300',
                i === currentStep ? 'w-6 bg-nexzen-accent' : i < currentStep ? 'w-3 bg-nexzen-accent/60' : 'w-3 bg-white/15'
              )}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
