import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Calendar, MapPin, Users, Trophy, Bookmark, BookmarkCheck, Tag,
  Monitor, Wifi, Clock, ArrowRight, Globe
} from 'lucide-react';
import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';
import { cn, formatDate, daysUntil, MODE_LABELS, REG_STATUS_COLORS } from '../../utils';
import type { Hackathon } from '../../types';
import { hackathonService } from '../../services/hackathons';
import { useToast } from '../ui/Toast';

interface HackathonCardProps {
  hackathon: Hackathon;
  featured?: boolean;
  className?: string;
}

const MODE_ICONS = {
  online: <Wifi size={12} />,
  offline: <MapPin size={12} />,
  hybrid: <Globe size={12} />,
};

export function HackathonCard({ hackathon: h, featured, className }: HackathonCardProps) {
  const [saved, setSaved] = useState(hackathonService.isSaved(h.id));
  const { success } = useToast();

  const handleSave = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (saved) {
      hackathonService.unsaveHackathon(h.id);
      setSaved(false);
      success('Removed from saved');
    } else {
      hackathonService.saveHackathon(h.id);
      setSaved(true);
      success('Saved!', h.name + ' added to your saved hackathons.');
    }
  };

  const days = daysUntil(h.registrationDeadline);
  const isUrgent = days <= 5 && h.registrationStatus === 'open';

  return (
    <motion.div
      whileHover={{ y: -4 }}
      transition={{ duration: 0.2 }}
      className={cn(
        'glass rounded-2xl border border-white/8 overflow-hidden group transition-all duration-300',
        'hover:border-white/15 hover:shadow-card-hover',
        featured && 'border-nexzen-accent/20 shadow-glow-sm',
        className
      )}
    >
      {/* Top accent bar for featured */}
      {featured && (
        <div className="h-0.5 bg-gradient-to-r from-nexzen-accent via-nexzen-violet to-nexzen-cyan" />
      )}

      <div className="p-5 space-y-4">
        {/* Header */}
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-start gap-3 flex-1 min-w-0">
            <img
              src={h.logo}
              alt={h.name}
              className="w-14 h-14 rounded-xl object-cover flex-shrink-0 border border-white/10"
            />
            <div className="flex-1 min-w-0">
              <h3 className="font-bold text-nexzen-text text-base leading-snug line-clamp-2 group-hover:text-nexzen-accent transition-colors">
                {h.name}
              </h3>
              <p className="text-xs text-nexzen-muted mt-0.5 truncate">{h.organizer}</p>
            </div>
          </div>

          {/* Save button */}
          <button
            onClick={handleSave}
            className={cn(
              'p-2 rounded-xl border transition-all flex-shrink-0',
              saved
                ? 'bg-nexzen-accent/15 border-nexzen-accent/40 text-nexzen-accent'
                : 'border-white/10 text-nexzen-subtle hover:text-nexzen-accent hover:border-nexzen-accent/30 hover:bg-nexzen-accent/10'
            )}
            aria-label={saved ? 'Remove from saved' : 'Save hackathon'}
          >
            {saved ? <BookmarkCheck size={16} /> : <Bookmark size={16} />}
          </button>
        </div>

        {/* Description */}
        <p className="text-xs text-nexzen-muted line-clamp-2 leading-relaxed">{h.shortDescription}</p>

        {/* Badges row */}
        <div className="flex flex-wrap gap-1.5">
          <Badge
            size="xs"
            className={cn('border', REG_STATUS_COLORS[h.registrationStatus])}
            dot
          >
            {h.registrationStatus === 'open' ? 'Open' : h.registrationStatus === 'upcoming' ? 'Upcoming' : 'Closed'}
          </Badge>

          <Badge size="xs" className="border bg-white/5 text-nexzen-muted border-white/10 flex items-center gap-1">
            {MODE_ICONS[h.mode]}
            {MODE_LABELS[h.mode]}
          </Badge>

          {h.allowIndividual && (
            <Badge size="xs" variant="accent">Solo OK</Badge>
          )}

          {isUrgent && (
            <Badge size="xs" variant="warning" dot>
              {days <= 0 ? 'Last day!' : `${days}d left`}
            </Badge>
          )}
        </div>

        {/* Info grid */}
        <div className="grid grid-cols-2 gap-2 text-xs text-nexzen-muted">
          <div className="flex items-center gap-1.5">
            <Calendar size={12} className="text-nexzen-subtle" />
            <span>{formatDate(h.startDate, 'dd MMM')}</span>
          </div>
          {h.location && (
            <div className="flex items-center gap-1.5">
              <MapPin size={12} className="text-nexzen-subtle" />
              <span className="truncate">{h.city || h.location}</span>
            </div>
          )}
          <div className="flex items-center gap-1.5">
            <Trophy size={12} className="text-nexzen-accent" />
            <span className="text-nexzen-accent font-medium">{h.prizePool}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Users size={12} className="text-nexzen-subtle" />
            <span>{h.minTeamSize}–{h.maxTeamSize} members</span>
          </div>
        </div>

        {/* Deadline */}
        <div className="flex items-center gap-1.5 text-xs text-nexzen-subtle border-t border-white/8 pt-3">
          <Clock size={12} />
          <span>
            {h.registrationStatus === 'open'
              ? `Registration closes ${formatDate(h.registrationDeadline)}`
              : h.registrationStatus === 'upcoming'
              ? `Opens soon`
              : 'Registration closed'}
          </span>
        </div>

        {/* Domain tags */}
        <div className="flex flex-wrap gap-1">
          {h.domains.slice(0, 3).map((d) => (
            <span key={d} className="text-[10px] px-2 py-0.5 rounded-full bg-white/5 text-nexzen-subtle border border-white/8">
              {d}
            </span>
          ))}
          {h.domains.length > 3 && (
            <span className="text-[10px] px-2 py-0.5 rounded-full bg-white/5 text-nexzen-subtle border border-white/8">
              +{h.domains.length - 3}
            </span>
          )}
        </div>

        {/* Sponsor logos */}
        {h.sponsors.length > 0 && (
          <div className="flex items-center gap-2 border-t border-white/8 pt-3">
            <span className="text-[10px] text-nexzen-subtle">Powered by</span>
            <div className="flex -space-x-1">
              {h.sponsors.slice(0, 4).map((s) => (
                <img key={s.id} src={s.logo} alt={s.name} title={s.name}
                  className="w-5 h-5 rounded-full border border-nexzen-bg object-cover" />
              ))}
            </div>
          </div>
        )}

        {/* CTA buttons */}
        <div className="flex gap-2 pt-1">
          <Link to={`/hackathons/${h.slug}`} className="flex-1">
            <Button variant="secondary" size="sm" fullWidth>View Details</Button>
          </Link>
          {h.registrationStatus === 'open' && (
            <Link to={`/hackathons/${h.slug}/apply`} className="flex-1">
              <Button variant="primary" size="sm" fullWidth iconRight={<ArrowRight size={14} />}>
                Apply
              </Button>
            </Link>
          )}
        </div>
      </div>
    </motion.div>
  );
}

