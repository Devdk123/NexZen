import { useState } from 'react';
import { X, Plus } from 'lucide-react';
import { cn } from '../../utils';
import { Tag } from './Badge';

interface MultiSelectProps {
  label?: string;
  options: string[];
  selected: string[];
  onChange: (selected: string[]) => void;
  error?: string;
  hint?: string;
  max?: number;
  allowCustom?: boolean;
  placeholder?: string;
}

export function MultiSelect({ label, options, selected, onChange, error, hint, max, allowCustom, placeholder }: MultiSelectProps) {
  const [customInput, setCustomInput] = useState('');

  const toggle = (opt: string) => {
    if (selected.includes(opt)) {
      onChange(selected.filter((s) => s !== opt));
    } else if (!max || selected.length < max) {
      onChange([...selected, opt]);
    }
  };

  const addCustom = () => {
    const val = customInput.trim();
    if (val && !selected.includes(val) && (!max || selected.length < max)) {
      onChange([...selected, val]);
      setCustomInput('');
    }
  };

  return (
    <div className="flex flex-col gap-2">
      {label && (
        <label className="text-sm font-medium text-nexzen-muted">
          {label}
          {max && <span className="ml-1 text-nexzen-subtle">({selected.length}/{max})</span>}
        </label>
      )}

      {/* Selected tags */}
      {selected.length > 0 && (
        <div className="flex flex-wrap gap-2 p-3 glass rounded-xl border border-white/10">
          {selected.map((s) => (
            <span key={s} className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-nexzen-accent/15 text-nexzen-accent border border-nexzen-accent/30 text-xs font-medium">
              {s}
              <button onClick={() => toggle(s)} className="hover:text-red-400 transition-colors" aria-label={`Remove ${s}`}>
                <X size={12} />
              </button>
            </span>
          ))}
        </div>
      )}

      {/* Options */}
      <div className="flex flex-wrap gap-2">
        {options.map((opt) => (
          <Tag
            key={opt}
            active={selected.includes(opt)}
            onClick={() => toggle(opt)}
          >
            {opt}
          </Tag>
        ))}
      </div>

      {/* Custom input */}
      {allowCustom && (
        <div className="flex gap-2 mt-1">
          <input
            value={customInput}
            onChange={(e) => setCustomInput(e.target.value)}
            onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); addCustom(); } }}
            placeholder={placeholder || 'Add custom skill...'}
            className="input-base flex-1 py-2 text-sm"
          />
          <button
            onClick={addCustom}
            disabled={!customInput.trim() || (!!max && selected.length >= max)}
            className={cn(
              'p-2 rounded-xl border border-white/10 text-nexzen-muted hover:text-nexzen-accent hover:border-nexzen-accent/40 transition-all disabled:opacity-40 disabled:pointer-events-none'
            )}
            aria-label="Add"
          >
            <Plus size={18} />
          </button>
        </div>
      )}

      {error && <p className="text-xs text-red-400">{error}</p>}
      {hint && !error && <p className="text-xs text-nexzen-subtle">{hint}</p>}
    </div>
  );
}
