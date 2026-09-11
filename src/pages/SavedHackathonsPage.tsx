import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Bookmark, ArrowRight } from 'lucide-react';
import { hackathonService } from '../services/hackathons';
import { HackathonCard } from '../components/hackathons/HackathonCard';
import { EmptyState } from '../components/ui/EmptyState';
import { Button } from '../components/ui/Button';
import { HackathonCardSkeleton } from '../components/ui/Skeleton';
import type { Hackathon } from '../types';

export default function SavedHackathonsPage() {
  const [hackathons, setHackathons] = useState<Hackathon[]>([]);
  const [loading, setLoading] = useState(true);

  const load = () => hackathonService.getSavedHackathons().then((h) => { setHackathons(h); setLoading(false); });

  useEffect(() => { load(); }, []);

  const handleClearAll = () => {
    hackathonService.getSavedIds().forEach((id) => hackathonService.unsaveHackathon(id));
    setHackathons([]);
  };

  return (
    <div className="min-h-screen bg-nexzen-bg bg-grid">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 pb-20">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-extrabold text-nexzen-text">Saved <span className="gradient-text">Hackathons</span></h1>
              <p className="text-nexzen-muted text-sm mt-1">{hackathons.length} saved</p>
            </div>
            {hackathons.length > 0 && (
              <button onClick={() => { hackathonService.getSavedIds().forEach((id) => hackathonService.unsaveHackathon(id)); setHackathons([]); }}
                className="text-xs text-red-400 hover:underline">Clear All</button>
            )}
          </div>

          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {Array.from({ length: 3 }).map((_, i) => <HackathonCardSkeleton key={i} />)}
            </div>
          ) : hackathons.length === 0 ? (
            <EmptyState icon={<Bookmark size={32} />} title="No saved hackathons"
              description="Bookmark hackathons you're interested in to find them quickly later."
              action={<Link to="/hackathons"><Button variant="primary" iconRight={<ArrowRight size={14} />}>Explore Hackathons</Button></Link>} />
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {hackathons.map((h, i) => (
                <motion.div key={h.id} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.07 }}>
                  <HackathonCard hackathon={h} />
                </motion.div>
              ))}
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
}
