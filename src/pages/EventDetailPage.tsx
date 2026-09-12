import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Calendar, MapPin, Users, ExternalLink } from 'lucide-react';
import { eventService } from '../services/events';
import { Badge } from '../components/ui/Badge';
import { Button } from '../components/ui/Button';
import { Skeleton } from '../components/ui/Skeleton';
import { useToast } from '../components/ui/Toast';
import { cn, formatDate, MODE_COLORS, MODE_LABELS, REG_STATUS_COLORS } from '../utils';
import type { Event } from '../types';

export default function EventDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const [event, setEvent] = useState<Event | null>(null);
  const [loading, setLoading] = useState(true);
  const { success } = useToast();

  useEffect(() => {
    if (!slug) return;
    eventService.getById(slug).then((e) => {
      if (!e) { navigate('/404'); return; }
      setEvent(e);
      setLoading(false);
    });
  }, [slug, navigate]);

  if (loading) {
    return (
      <div className="max-w-5xl mx-auto px-4 py-12 space-y-4">
        <Skeleton className="h-56 w-full rounded-2xl" />
        <Skeleton className="h-8 w-3/4" />
        <Skeleton className="h-4 w-full" />
      </div>
    );
  }

  if (!event) return null;

  return (
    <div className="min-h-screen bg-nexzen-bg pt-20">
      <div className="relative h-56 overflow-hidden">
        <img src={event.banner} alt={event.name} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-nexzen-bg via-black/40 to-transparent" />
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="flex items-end gap-4 -mt-8 mb-6">
          <img src={event.logo} alt={event.name} className="w-20 h-20 rounded-2xl border-2 border-white/20 object-cover shadow-card" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <div>
              <div className="flex flex-wrap gap-2 mb-3">
                <Badge size="sm" className={cn('border capitalize', REG_STATUS_COLORS[event.registrationStatus])} dot>
                  {event.registrationStatus}
                </Badge>
                <Badge size="sm" className={cn('border capitalize', MODE_COLORS[event.mode])}>
                  {MODE_LABELS[event.mode]}
                </Badge>
                <Badge size="sm" variant="default" className="capitalize">{event.category}</Badge>
                {event.isFree ? (
                  <Badge size="sm" variant="success">Free</Badge>
                ) : (
                  <Badge size="sm" variant="default">{event.price}</Badge>
                )}
              </div>
              <h1 className="text-3xl font-extrabold text-nexzen-text">{event.name}</h1>
              <p className="text-nexzen-muted mt-1">{event.organizer}</p>
              <div className="flex flex-wrap gap-4 mt-4 text-sm text-nexzen-muted">
                <span className="flex items-center gap-1.5"><Calendar size={13} />{formatDate(event.date)}</span>
                {event.city && <span className="flex items-center gap-1.5"><MapPin size={13} />{event.city}</span>}
                {event.participantsCount && (
                  <span className="flex items-center gap-1.5"><Users size={13} />{event.participantsCount.toLocaleString()} registered</span>
                )}
              </div>
            </div>

            <div className="glass rounded-2xl border border-white/8 p-6">
              <h2 className="font-bold text-nexzen-text mb-3">About this Event</h2>
              <p className="text-nexzen-muted text-sm leading-relaxed">{event.description}</p>
            </div>

            {event.speakers && event.speakers.length > 0 && (
              <div>
                <h2 className="font-bold text-nexzen-text mb-4">Speakers</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {event.speakers.map((s, i) => (
                    <div key={i} className="glass rounded-2xl border border-white/8 p-4 flex items-center gap-3">
                      <img
                        src={s.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(s.name)}&background=6366F1&color=fff`}
                        alt={s.name} className="w-12 h-12 rounded-full object-cover"
                      />
                      <div>
                        <p className="font-semibold text-nexzen-text text-sm">{s.name}</p>
                        <p className="text-xs text-nexzen-muted">{s.title}</p>
                        {s.company && <p className="text-xs text-nexzen-subtle">{s.company}</p>}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          <aside className="h-fit glass rounded-2xl border border-white/10 p-6 space-y-4">
            <h3 className="font-bold text-nexzen-text">Register</h3>
            <Button variant="primary" size="lg" fullWidth
              onClick={() => success('Redirecting...', 'Opening event registration page.')}>
              Register Now
            </Button>
            {event.website && (
              <a href={event.website} target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-1.5 text-xs text-nexzen-accent hover:underline">
                <ExternalLink size={12} />Visit Event Website
              </a>
            )}
          </aside>
        </div>
      </div>
    </div>
  );
}
