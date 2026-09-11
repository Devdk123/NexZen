import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Users, ArrowRight } from 'lucide-react';
import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';
import { cn } from '../../utils';
import type { Team } from '../../types';

interface TeamCardProps {
  team: Team;
  onRequest?: (team: Team) => void;
  hasRequested?: boolean;
}

export function TeamCard({ team, onRequest, hasRequested }: TeamCardProps) {
  const isFull = team.members.length >= team.maxSize;

  return (
    <motion.div whileHover={{ y: -2 }} className="glass rounded-2xl border border-white/8 p-5 hover:border-white/15 hover:shadow-card transition-all flex flex-col gap-3">
      <div className="flex items-start gap-3">
        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-nexzen-accent to-nexzen-violet flex items-center justify-center font-bold text-white text-lg flex-shrink-0">
          {team.name[0]}
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="font-bold text-nexzen-text truncate">{team.name}</h3>
          <p className="text-xs text-nexzen-muted mt-0.5 truncate">{team.hackathonName}</p>
        </div>
        <div className="flex-shrink-0 text-right">
          <p className="text-xs text-nexzen-subtle">{team.members.length}/{team.maxSize}</p>
          <Badge size="xs" className={cn('border mt-1', team.status === 'open' ? 'bg-green-500/15 text-green-400 border-green-500/30' : 'bg-white/5 text-nexzen-muted border-white/10')}>
            {team.status}
          </Badge>
        </div>
      </div>

      {team.description && (
        <p className="text-xs text-nexzen-muted leading-relaxed line-clamp-2">{team.description}</p>
      )}

      {/* Domains */}
      {(team.domains || []).length > 0 && (
        <div className="flex flex-wrap gap-1.5">
          {team.domains!.slice(0, 3).map((d) => <Badge key={d} size="xs" variant="default">{d}</Badge>)}
          {team.domains!.length > 3 && <Badge size="xs" variant="default">+{team.domains!.length - 3}</Badge>}
        </div>
      )}

      {/* Looking for */}
      {(team.lookingFor || []).length > 0 && (
        <div className="flex flex-wrap gap-1.5">
          {(team.lookingFor || []).slice(0, 2).map((r) => (
            <span key={r} className="px-2 py-0.5 rounded-full border border-dashed border-nexzen-violet/40 text-nexzen-violet text-[10px]">
              Need: {r}
            </span>
          ))}
        </div>
      )}

      {/* Members */}
      <div className="flex items-center gap-2">
        <div className="flex -space-x-2">
          {team.members.slice(0, 4).map((m, i) => (
            <div key={i} className="w-6 h-6 rounded-full bg-gradient-to-br from-nexzen-accent to-nexzen-violet border-2 border-nexzen-bg flex items-center justify-center text-[9px] font-bold text-white"
              title={m.name}>
              {m.name?.[0] || '?'}
            </div>
          ))}
        </div>
        <span className="text-[10px] text-nexzen-subtle">{team.members.length} member{team.members.length !== 1 ? 's' : ''}</span>
      </div>

      {/* Action */}
      {onRequest && !isFull && (
        <Button variant={hasRequested ? 'secondary' : 'primary'} size="sm" fullWidth disabled={hasRequested}
          iconRight={!hasRequested ? <ArrowRight size={13} /> : undefined} onClick={() => !hasRequested && onRequest(team)}>
          {hasRequested ? 'Request Sent' : 'Request to Join'}
        </Button>
      )}
    </motion.div>
  );
}
