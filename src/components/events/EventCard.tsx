import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Calendar, MapPin, Users, ArrowRight, Wifi } from 'lucide-react';
import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';
import { cn, formatDate, REG_STATUS_COLORS } from '../../utils';
import type { Event } from '../../types';

const CATEGORY_COLORS: Record<string, string> = {
  conference: 'bg-violet-500/15 text-violet-400 border-violet-500/30',
  workshop: 'bg-blue-500/15 text-blue-400 border-blue-500/30',
  webinar: 'bg-cyan-500/15 text-cyan-400 border-cyan-500/30',
  competition: 'bg-orange-500/15 text-orange-400 border-orange-500/30',
  meetup: 'bg-green-500/15 text-green-400 border-green-500/30',
  hackathon: 'bg-nexzen-accent/15 text-nexzen-accent border-nexzen-accent/30',
  challenge: 'bg-pink-500/15 text-pink-400 border-pink-500/30',
};

interface EventCardProps {
  event: Event;
  className?: string;
}

export function EventCard({ event: e, className }: EventCardProps) {
  return (
    <motion.div
      whileHover={{ y: -4 }}
      transition={{ duration: 0.2 }}
      className={cn(
        'glass rounded-2xl border border-white/8 overflow-hidden group transition-all duration-300 hover:border-white/15 hover:shadow-card-hover flex flex-col',
        className
      )}
    >
      {/* Banner */}
      <div className="relative h-40 overflow-hidden">
        <img
          src={e.banner}
          alt={e.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

        {/* Category badge */}
        <div className="absolute top-3 left-3">
          <Badge size="xs" className={cn('border capitalize', CATEGORY_COLORS[e.category] || CATEGORY_COLORS.conference)}>
            {e.category}
          </Badge>
        </div>

        {/* Free / Paid */}
        <div className="absolute top-3 right-3">
          <Badge size="xs" className={e.isFree ? 'bg-green-500/80 text-white border-green-400' : 'bg-black/60 text-white border-white/20'}>
            {e.isFree ? 'Free' : e.price || 'Paid'}
          </Badge>
        </div>

        {/* Organizer logo */}
        <div className="absolute bottom-3 left-3">
          <img src={e.logo} alt={e.organizer} className="w-10 h-10 rounded-lg border border-white/20 object-cover" />
        </div>
      </div>

      <div className="p-5 space-y-3 flex-1 flex flex-col">
        <div>
          <h3 className="font-bold text-nexzen-text text-sm leading-snug line-clamp-2 group-hover:text-nexzen-accent transition-colors">
            {e.name}
          </h3>
          <p className="text-xs text-nexzen-muted mt-0.5">{e.organizer}</p>
        </div>

        <p className="text-xs text-nexzen-muted line-clamp-2 leading-relaxed flex-1">{e.shortDescription}</p>

        {/* Info */}
        <div className="space-y-1.5 text-xs text-nexzen-muted">
          <div className="flex items-center gap-1.5">
            <Calendar size={12} className="text-nexzen-subtle" />
            <span>{formatDate(e.date, 'dd MMM yyyy')}</span>
          </div>
          {(e.location || e.mode === 'online') && (
            <div className="flex items-center gap-1.5">
              {e.mode === 'online' ? <Wifi size={12} className="text-nexzen-subtle" /> : <MapPin size={12} className="text-nexzen-subtle" />}
              <span className="truncate">{e.mode === 'online' ? 'Online' : e.city || e.location}</span>
            </div>
          )}
          {e.participantsCount && e.participantsCount > 0 && (
            <div className="flex items-center gap-1.5">
              <Users size={12} className="text-nexzen-subtle" />
              <span>{e.participantsCount.toLocaleString()} registered</span>
            </div>
          )}
        </div>

        {/* Status */}
        <Badge size="xs" dot className={cn('border w-fit', REG_STATUS_COLORS[e.registrationStatus])}>
          {e.registrationStatus === 'open' ? 'Registration Open' : e.registrationStatus === 'upcoming' ? 'Registration Soon' : 'Closed'}
        </Badge>

        {/* CTA */}
        <Link to={`/events/${e.slug}`} className="mt-auto">
          <Button variant="secondary" size="sm" fullWidth iconRight={<ArrowRight size={14} />}>
            View Event
          </Button>
        </Link>
      </div>
    </motion.div>
  );
}
