import React, { useCallback, useRef, useState } from 'react';
import { Upload, X, FileText, CheckCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn, formatFileSize } from '../../utils';

interface FileUploadProps {
  label?: string;
  accept?: string;
  maxSize?: number; // bytes
  onChange: (file: File | null) => void;
  error?: string;
  hint?: string;
  value?: File | null;
}

export function FileUpload({ label, accept, maxSize = 5 * 1024 * 1024, onChange, error, hint, value }: FileUploadProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [localError, setLocalError] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFile = useCallback((file: File) => {
    setLocalError('');
    if (accept) {
      const types = accept.split(',').map((t) => t.trim());
      const valid = types.some((t) => {
        if (t.startsWith('.')) return file.name.endsWith(t);
        return file.type.startsWith(t.replace('*', ''));
      });
      if (!valid) {
        setLocalError(`Invalid file type. Accepted: ${accept}`);
        return;
      }
    }
    if (file.size > maxSize) {
      setLocalError(`File too large. Max size: ${formatFileSize(maxSize)}`);
      return;
    }
    onChange(file);
  }, [accept, maxSize, onChange]);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) handleFile(file);
  }, [handleFile]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) handleFile(file);
  };

  const displayError = error || localError;

  return (
    <div className="flex flex-col gap-1.5">
      {label && <label className="text-sm font-medium text-nexzen-muted">{label}</label>}

      <AnimatePresence mode="wait">
        {value ? (
          <motion.div
            key="file"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="flex items-center gap-3 p-4 glass rounded-xl border border-green-500/30"
          >
            <div className="w-10 h-10 rounded-lg bg-green-500/15 flex items-center justify-center flex-shrink-0">
              <FileText size={18} className="text-green-400" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-nexzen-text truncate">{value.name}</p>
              <p className="text-xs text-nexzen-muted">{formatFileSize(value.size)}</p>
            </div>
            <CheckCircle size={18} className="text-green-400 flex-shrink-0" />
            <button
              onClick={() => { onChange(null); setLocalError(''); }}
              className="p-1 rounded-lg text-nexzen-subtle hover:text-red-400 transition-colors"
              aria-label="Remove file"
            >
              <X size={16} />
            </button>
          </motion.div>
        ) : (
          <motion.div
            key="upload"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
            onDragLeave={() => setIsDragging(false)}
            onDrop={handleDrop}
            onClick={() => inputRef.current?.click()}
            className={cn(
              'flex flex-col items-center justify-center gap-3 p-8 rounded-xl border-2 border-dashed cursor-pointer transition-all duration-200',
              isDragging
                ? 'border-nexzen-accent bg-nexzen-accent/10'
                : 'border-white/15 hover:border-nexzen-accent/50 hover:bg-white/3',
              displayError && 'border-red-500/40'
            )}
          >
            <div className={cn('w-12 h-12 rounded-xl flex items-center justify-center transition-colors', isDragging ? 'bg-nexzen-accent/20' : 'bg-white/8')}>
              <Upload size={22} className={isDragging ? 'text-nexzen-accent' : 'text-nexzen-subtle'} />
            </div>
            <div className="text-center">
              <p className="text-sm font-medium text-nexzen-text">
                {isDragging ? 'Drop to upload' : 'Click or drag & drop'}
              </p>
              <p className="text-xs text-nexzen-subtle mt-1">
                {accept ? `${accept} · ` : ''}Max {formatFileSize(maxSize)}
              </p>
            </div>
            <input ref={inputRef} type="file" accept={accept} onChange={handleChange} className="sr-only" />
          </motion.div>
        )}
      </AnimatePresence>

      {displayError && <p className="text-xs text-red-400">{displayError}</p>}
      {hint && !displayError && <p className="text-xs text-nexzen-subtle">{hint}</p>}
    </div>
  );
}
