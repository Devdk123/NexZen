import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Search, SlidersHorizontal, X } from 'lucide-react';
import { HackathonCard } from '../components/hackathons/HackathonCard';
import { HackathonCardSkeleton } from '../components/ui/Skeleton';
import { EmptyState } from '../components/ui/EmptyState';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { hackathonService } from '../services/hackathons';
import type { Hackathon, HackathonFilters } from '../types';
import { ALL_DOMAINS } from '../types';
import { cn } from '../utils';

const MODE_OPTIONS = ['all', 'online', 'offline', 'hybrid'] as const;
const DIFFICULTY_OPTIONS = ['all', 'beginner', 'intermediate', 'advanced', 'open'] as const;
const REG_STATUS_OPTIONS = ['all', 'open', 'upcoming', 'closed'] as const;
const SORT_OPTIONS = [
  { value: 'featured', label: 'Recommended' },
  { value: 'newest', label: 'Newest First' },
  { value: 'deadline', label: 'Deadline Soon' },
  { value: 'prize', label: 'Highest Prize' },
  { value: 'popular', label: 'Most Popular' },
] as const;

export default function HackathonsPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [hackathons, setHackathons] = useState<Hackathon[]>([]);
  const [loading, setLoading] = useState(true);
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState<HackathonFilters>({
    search: searchParams.get('search') || '',
    mode: (searchParams.get('mode') as any) || 'all',
    difficulty: 'all',
    registrationStatus: 'all',
    domains: [],
    sortBy: 'featured',
  });

  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => {
      hackathonService.getAll(filters).then((data) => { setHackathons(data); setLoading(false); });
    }, 350);
    return () => clearTimeout(timer);
  }, [filters]);

  const setFilter = (key: keyof HackathonFilters, value: any) => setFilters((f) => ({ ...f, [key]: value }));

  const activeFiltersCount = [
    filters.mode !== 'all',
    filters.difficulty !== 'all',
    filters.registrationStatus !== 'all',
    (filters.domains?.length || 0) > 0,
    filters.sortBy !== 'featured',
  ].filter(Boolean).length;

  const clearFilters = () => setFilters({ search: filters.search, mode: 'all', difficulty: 'all', registrationStatus: 'all', domains: [], sortBy: 'featured' });

  const FilterPanel = () => (
    <div className="space-y-6">
      {/* Sort */}
      <div>
        <p className="text-xs font-semibold text-nexzen-muted uppercase tracking-wider mb-3">Sort By</p>
        <div className="space-y-1">
          {SORT_OPTIONS.map((opt) => (
            <button key={opt.value} onClick={() => setFilter('sortBy', opt.value)}
              className={cn('w-full text-left px-3 py-2 rounded-xl text-sm transition-all', filters.sortBy === opt.value ? 'bg-nexzen-accent/15 text-nexzen-accent border border-nexzen-accent/30' : 'text-nexzen-muted hover:text-nexzen-text hover:bg-white/5')}>
              {opt.label}
            </button>
          ))}
        </div>
      </div>

      {/* Registration Status */}
      <div>
        <p className="text-xs font-semibold text-nexzen-muted uppercase tracking-wider mb-3">Registration</p>
        <div className="flex flex-wrap gap-2">
          {REG_STATUS_OPTIONS.map((opt) => (
            <button key={opt} onClick={() => setFilter('registrationStatus', opt)}
              className={cn('px-3 py-1.5 rounded-xl text-xs font-medium border transition-all capitalize', filters.registrationStatus === opt ? 'bg-nexzen-accent/20 text-nexzen-accent border-nexzen-accent/40' : 'bg-white/5 text-nexzen-muted border-white/10 hover:border-white/20')}>
              {opt === 'all' ? 'All' : opt}
            </button>
          ))}
        </div>
      </div>

      {/* Mode */}
      <div>
        <p className="text-xs font-semibold text-nexzen-muted uppercase tracking-wider mb-3">Mode</p>
        <div className="flex flex-wrap gap-2">
          {MODE_OPTIONS.map((opt) => (
            <button key={opt} onClick={() => setFilter('mode', opt)}
              className={cn('px-3 py-1.5 rounded-xl text-xs font-medium border transition-all capitalize', filters.mode === opt ? 'bg-nexzen-accent/20 text-nexzen-accent border-nexzen-accent/40' : 'bg-white/5 text-nexzen-muted border-white/10 hover:border-white/20')}>
              {opt === 'all' ? 'All Modes' : opt}
            </button>
          ))}
        </div>
      </div>

      {/* Difficulty */}
      <div>
        <p className="text-xs font-semibold text-nexzen-muted uppercase tracking-wider mb-3">Difficulty</p>
        <div className="flex flex-wrap gap-2">
          {DIFFICULTY_OPTIONS.map((opt) => (
            <button key={opt} onClick={() => setFilter('difficulty', opt)}
              className={cn('px-3 py-1.5 rounded-xl text-xs font-medium border transition-all capitalize', filters.difficulty === opt ? 'bg-nexzen-accent/20 text-nexzen-accent border-nexzen-accent/40' : 'bg-white/5 text-nexzen-muted border-white/10 hover:border-white/20')}>
              {opt === 'all' ? 'All Levels' : opt}
            </button>
          ))}
        </div>
      </div>

      {/* Domains */}
      <div>
        <p className="text-xs font-semibold text-nexzen-muted uppercase tracking-wider mb-3">Domains</p>
        <div className="flex flex-wrap gap-2 max-h-48 overflow-y-auto">
          {ALL_DOMAINS.map((d) => (
            <button key={d} onClick={() => {
              const current = filters.domains || [];
              setFilter('domains', current.includes(d) ? current.filter((x) => x !== d) : [...current, d]);
            }}
              className={cn('px-2.5 py-1 rounded-lg text-xs font-medium border transition-all', (filters.domains || []).includes(d) ? 'bg-nexzen-accent/20 text-nexzen-accent border-nexzen-accent/40' : 'bg-white/5 text-nexzen-muted border-white/10 hover:border-white/20')}>
              {d}
            </button>
          ))}
        </div>
      </div>

      {activeFiltersCount > 0 && (
        <button onClick={clearFilters} className="w-full py-2.5 rounded-xl border border-red-500/30 text-red-400 text-sm hover:bg-red-500/10 transition-all">
          Clear Filters
        </button>
      )}
    </div>
  );

  return (
    <div className="min-h-screen bg-nexzen-bg bg-grid">
      {/* Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-8">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="text-4xl font-extrabold text-nexzen-text mb-2">
            Discover <span className="gradient-text">Hackathons</span>
          </h1>
          <p className="text-nexzen-muted">Find and apply to hackathons, competitions, and innovation challenges.</p>
        </motion.div>

        {/* Search bar */}
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="mt-6 flex gap-3">
          <div className="relative flex-1">
            <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-nexzen-subtle" />
            <input value={filters.search} onChange={(e) => setFilter('search', e.target.value)}
              placeholder="Search hackathons, organizers, tags..."
              className="input-base pl-11 py-3" />
            {filters.search && (
              <button onClick={() => setFilter('search', '')} className="absolute right-3 top-1/2 -translate-y-1/2 text-nexzen-subtle hover:text-nexzen-muted">
                <X size={16} />
              </button>
            )}
          </div>
          <button onClick={() => setShowFilters((v) => !v)}
            className={cn('flex items-center gap-2 px-4 py-3 rounded-xl border text-sm font-medium transition-all md:hidden', showFilters ? 'bg-nexzen-accent/15 border-nexzen-accent/40 text-nexzen-accent' : 'glass border-white/10 text-nexzen-muted')}>
            <SlidersHorizontal size={16} />
            Filters {activeFiltersCount > 0 && <Badge variant="accent" size="xs">{activeFiltersCount}</Badge>}
          </button>
        </motion.div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="flex gap-8">
          {/* Desktop sidebar */}
          <aside className="hidden md:block w-64 flex-shrink-0">
            <div className="glass rounded-2xl border border-white/8 p-5 sticky top-24">
              <div className="flex items-center justify-between mb-5">
                <h3 className="font-semibold text-nexzen-text text-sm">Filters</h3>
                {activeFiltersCount > 0 && (
                  <Badge variant="accent" size="xs">{activeFiltersCount}</Badge>
                )}
              </div>
              <FilterPanel />
            </div>
          </aside>

          {/* Mobile filters */}
          {showFilters && (
            <div className="md:hidden fixed inset-0 z-40 flex">
              <div className="flex-1 bg-black/60 backdrop-blur-sm" onClick={() => setShowFilters(false)} />
              <motion.div initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }}
                className="w-80 bg-nexzen-surface border-l border-white/10 h-full overflow-y-auto p-5">
                <div className="flex items-center justify-between mb-5">
                  <h3 className="font-semibold text-nexzen-text">Filters</h3>
                  <button onClick={() => setShowFilters(false)} className="text-nexzen-subtle hover:text-nexzen-text"><X size={18} /></button>
                </div>
                <FilterPanel />
              </motion.div>
            </div>
          )}

          {/* Results */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between mb-6">
              <p className="text-sm text-nexzen-muted">
                {loading ? 'Searching...' : <><span className="text-nexzen-text font-semibold">{hackathons.length}</span> hackathons found</>}
              </p>
            </div>

            {loading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
                {Array.from({ length: 6 }).map((_, i) => <HackathonCardSkeleton key={i} />)}
              </div>
            ) : hackathons.length === 0 ? (
              <EmptyState icon={<Search size={32} />} title="No hackathons found"
                description="Try adjusting your search or filters."
                action={<Button onClick={clearFilters} variant="secondary">Clear Filters</Button>} />
            ) : (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }}
                className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
                {hackathons.map((h, i) => (
                  <motion.div key={h.id} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}>
                    <HackathonCard hackathon={h} featured={h.isFeatured} />
                  </motion.div>
                ))}
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
