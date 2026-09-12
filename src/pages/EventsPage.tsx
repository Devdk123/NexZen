import { useState, useEffect } from 'react';
import { Search, X } from 'lucide-react';
import { motion } from 'framer-motion';
import { EventCard } from '../components/events/EventCard';
import { EmptyState } from '../components/ui/EmptyState';
import { EventCardSkeleton } from '../components/ui/Skeleton';
import { eventService } from '../services/events';
import type { Event, EventFilters } from '../types';

const CATEGORIES = ['all', 'conference', 'workshop', 'webinar', 'competition', 'meetup', 'hackathon', 'challenge'] as const;
const MODES = ['all', 'online', 'offline', 'hybrid'] as const;

export default function EventsPage() {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState<EventFilters>({ search: '', category: 'all', mode: 'all', registrationStatus: 'all', sortBy: 'soonest' });

  useEffect(() => {
    setLoading(true);
    const t = setTimeout(() => {
      eventService.getAll(filters).then((d) => { setEvents(d); setLoading(false); });
    }, 350);
    return () => clearTimeout(t);
  }, [filters]);

  const set = (k: keyof EventFilters, v: any) => setFilters((f) => ({ ...f, [k]: v }));

  return (
    <div className="min-h-screen bg-nexzen-bg bg-grid">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-16">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
          <h1 className="text-4xl font-extrabold text-nexzen-text mb-2">Discover <span className="gradient-text">Events</span></h1>
          <p className="text-nexzen-muted">Workshops, conferences, webinars, and competitions for student innovators.</p>
        </motion.div>

        {/* Search + filters */}
        <div className="flex flex-wrap gap-3 mb-8">
          <div className="relative flex-1 min-w-64">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-nexzen-subtle" />
            <input value={filters.search} onChange={(e) => set('search', e.target.value)}
              placeholder="Search events..." className="input-base pl-10" />
          </div>
          <select value={filters.category} onChange={(e) => set('category', e.target.value)}
            className="input-base w-auto capitalize px-4">
            {CATEGORIES.map((c) => <option key={c} value={c} className="bg-nexzen-surface capitalize">{c === 'all' ? 'All Categories' : c}</option>)}
          </select>
          <select value={filters.mode} onChange={(e) => set('mode', e.target.value)}
            className="input-base w-auto capitalize px-4">
            {MODES.map((m) => <option key={m} value={m} className="bg-nexzen-surface capitalize">{m === 'all' ? 'All Modes' : m}</option>)}
          </select>
          <select value={filters.registrationStatus} onChange={(e) => set('registrationStatus', e.target.value)}
            className="input-base w-auto px-4">
            <option value="all">All Status</option>
            <option value="open">Open</option>
            <option value="upcoming">Upcoming</option>
            <option value="closed">Closed</option>
          </select>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {Array.from({ length: 6 }).map((_, i) => <EventCardSkeleton key={i} />)}
          </div>
        ) : events.length === 0 ? (
          <EmptyState icon={<Search size={32} />} title="No events found" description="Try different filters." />
        ) : (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {events.map((e, i) => (
              <motion.div key={e.id} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}>
                <EventCard event={e} />
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
    </div>
  );
}
