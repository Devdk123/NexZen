import { ExternalLink } from 'lucide-react';
import { cn } from '../../utils';
import type { Sponsor } from '../../types';

const TIER_COLORS: Record<string, string> = {
  platinum: 'bg-cyan-500/15 text-cyan-400 border-cyan-500/30',
  gold: 'bg-yellow-500/15 text-yellow-400 border-yellow-500/30',
  silver: 'bg-gray-400/15 text-gray-300 border-gray-400/30',
  bronze: 'bg-amber-600/15 text-amber-500 border-amber-600/30',
};

interface SponsorCardProps {
  sponsor: Sponsor;
  compact?: boolean;
}

export function SponsorCard({ sponsor, compact = false }: SponsorCardProps) {
  return (
    <div className={cn(
      'glass rounded-2xl border border-white/8 flex flex-col items-center text-center hover:border-nexzen-accent/30 hover:shadow-glow-sm transition-all group',
      compact ? 'p-4 gap-2' : 'p-5 gap-3'
    )}>
      <img src={sponsor.logo} alt={sponsor.name}
        className={cn('rounded-xl object-cover', compact ? 'w-12 h-12' : 'w-16 h-16')} />
      <div>
        <p className={cn('font-bold text-nexzen-text', compact ? 'text-sm' : 'text-base')}>{sponsor.name}</p>
        <span className={cn('inline-block px-2 py-0.5 rounded-full text-[10px] font-semibold border capitalize mt-1', TIER_COLORS[sponsor.tier] || TIER_COLORS.bronze)}>
          {sponsor.tier}
        </span>
      </div>
      {!compact && sponsor.description && (
        <p className="text-xs text-nexzen-muted leading-relaxed line-clamp-2">{sponsor.description}</p>
      )}
      {sponsor.website && (
        <a href={sponsor.website} target="_blank" rel="noopener noreferrer"
          className="text-xs text-nexzen-accent hover:underline flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
          <ExternalLink size={11} />Visit
        </a>
      )}
    </div>
  );
}
