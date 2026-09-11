import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { format, formatDistanceToNow, isPast } from 'date-fns';

// ─── Class names util ─────────────────────────────────────
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// ─── Date formatting ─────────────────────────────────────
export function formatDate(dateStr: string, fmt = 'dd MMM yyyy'): string {
  try {
    return format(new Date(dateStr), fmt);
  } catch {
    return dateStr;
  }
}

export function formatDateTime(dateStr: string): string {
  try {
    return format(new Date(dateStr), 'dd MMM yyyy, hh:mm a');
  } catch {
    return dateStr;
  }
}

export function timeAgo(dateStr: string): string {
  try {
    return formatDistanceToNow(new Date(dateStr), { addSuffix: true });
  } catch {
    return dateStr;
  }
}

export function isDeadlinePast(dateStr: string): boolean {
  try {
    return isPast(new Date(dateStr));
  } catch {
    return false;
  }
}

export function daysUntil(dateStr: string): number {
  const diff = new Date(dateStr).getTime() - Date.now();
  return Math.ceil(diff / (1000 * 60 * 60 * 24));
}

// ─── Status helpers ───────────────────────────────────────
export const STATUS_LABELS: Record<string, string> = {
  applied: 'Applied',
  under_review: 'Under Review',
  shortlisted: 'Shortlisted',
  selected: 'Selected',
  rejected: 'Rejected',
  completed: 'Completed',
  open: 'Open',
  closed: 'Closed',
  upcoming: 'Upcoming',
};

export const STATUS_COLORS: Record<string, string> = {
  applied: 'status-applied',
  under_review: 'status-review',
  shortlisted: 'status-shortlisted',
  selected: 'status-selected',
  rejected: 'status-rejected',
  completed: 'status-completed',
};

export const MODE_LABELS: Record<string, string> = {
  online: 'Online',
  offline: 'Offline',
  hybrid: 'Hybrid',
};

export const MODE_COLORS: Record<string, string> = {
  online: 'bg-green-500/15 text-green-400 border-green-500/30',
  offline: 'bg-blue-500/15 text-blue-400 border-blue-500/30',
  hybrid: 'bg-violet-500/15 text-violet-400 border-violet-500/30',
};

export const DIFFICULTY_COLORS: Record<string, string> = {
  beginner: 'bg-green-500/15 text-green-400 border-green-500/30',
  intermediate: 'bg-yellow-500/15 text-yellow-400 border-yellow-500/30',
  advanced: 'bg-red-500/15 text-red-400 border-red-500/30',
  open: 'bg-gray-500/15 text-gray-400 border-gray-500/30',
};

export const REG_STATUS_COLORS: Record<string, string> = {
  open: 'bg-green-500/15 text-green-400 border-green-500/30',
  closed: 'bg-red-500/15 text-red-400 border-red-500/30',
  upcoming: 'bg-yellow-500/15 text-yellow-400 border-yellow-500/30',
};

// ─── File helpers ─────────────────────────────────────────
export function formatFileSize(bytes: number): string {
  if (bytes < 1024) return bytes + ' B';
  if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
  return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
}

export function isValidFileType(file: File, allowed: string[]): boolean {
  return allowed.some((type) => file.type.includes(type) || file.name.endsWith(type));
}

// ─── String helpers ───────────────────────────────────────
export function truncate(str: string, max: number): string {
  return str.length > max ? str.slice(0, max) + '...' : str;
}

export function slugify(str: string): string {
  return str.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
}

export function getInitials(name: string): string {
  return name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);
}

// ─── Number helpers ───────────────────────────────────────
export function formatNumber(n: number): string {
  if (n >= 1000) return (n / 1000).toFixed(1) + 'k';
  return n.toString();
}

// ─── Validation helpers ───────────────────────────────────
export function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export function isValidUrl(url: string): boolean {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
}

export function isValidPhone(phone: string): boolean {
  return /^(\+91|0)?[6-9]\d{9}$/.test(phone.replace(/\s/g, ''));
}

// ─── Profile completeness ─────────────────────────────────
export function getProfileCompleteness(user: {
  avatar?: string;
  bio?: string;
  college?: string;
  branch?: string;
  github?: string;
  linkedin?: string;
  resumeUrl?: string;
  skills?: string[];
  liveProjects?: unknown[];
}): { score: number; missing: string[] } {
  const checks: Array<{ label: string; check: boolean }> = [
    { label: 'Profile Photo', check: !!user.avatar },
    { label: 'Bio', check: !!user.bio },
    { label: 'College', check: !!user.college },
    { label: 'Branch', check: !!user.branch },
    { label: 'GitHub', check: !!user.github },
    { label: 'LinkedIn', check: !!user.linkedin },
    { label: 'Resume', check: !!user.resumeUrl },
    { label: 'Skills', check: (user.skills?.length || 0) > 0 },
    { label: 'Projects', check: (user.liveProjects?.length || 0) > 0 },
  ];
  const passed = checks.filter((c) => c.check);
  const missing = checks.filter((c) => !c.check).map((c) => c.label);
  return { score: Math.round((passed.length / checks.length) * 100), missing };
}

