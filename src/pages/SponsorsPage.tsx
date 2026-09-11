import { useState } from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, Mail } from 'lucide-react';
import { MOCK_SPONSORS } from '../data/sponsors';
import { Badge } from '../components/ui/Badge';
import { Button } from '../components/ui/Button';
import { useNavigate } from 'react-router-dom';
import { cn } from '../utils';

const TIER_COLORS: Record<string, string> = {
  platinum: 'bg-cyan-500/15 text-cyan-400 border-cyan-500/30',
  gold: 'bg-yellow-500/15 text-yellow-400 border-yellow-500/30',
  silver: 'bg-gray-400/15 text-gray-300 border-gray-400/30',
  bronze: 'bg-amber-600/15 text-amber-500 border-amber-600/30',
};

const CATEGORIES = ['all', 'Technology', 'Education', 'Community', 'Media', 'Finance', 'Healthcare'] as const;

export default function SponsorsPage() {
  const [category, setCategory] = useState('all');
  const navigate = useNavigate();
  const filtered = category === 'all' ? MOCK_SPONSORS : MOCK_SPONSORS.filter((s) => s.category === category);

  return (
    <div className="min-h-screen bg-nexzen-bg bg-dots">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-20">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-12">
          <h1 className="text-4xl font-extrabold mb-3">Our <span className="gradient-text">Partners & Sponsors</span></h1>
          <p className="text-nexzen-muted max-w-xl mx-auto">The companies that believe in the next generation of innovators. They make NEXZEN possible.</p>
        </motion.div>

        <div className="flex flex-wrap gap-2 justify-center mb-10">
          {CATEGORIES.map((c) => (
            <button key={c} onClick={() => setCategory(c)}
              className={cn('px-4 py-2 rounded-xl text-sm font-medium border transition-all', category === c ? 'bg-nexzen-accent/20 text-nexzen-accent border-nexzen-accent/40' : 'glass border-white/10 text-nexzen-muted hover:text-nexzen-text')}>
              {c === 'all' ? 'All Partners' : c}
            </button>
          ))}
        </div>

        <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-20">
          {filtered.map((s, i) => (
            <motion.div key={s.id} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}
              className="glass rounded-2xl border border-white/8 p-5 flex flex-col items-center text-center gap-3 hover:border-nexzen-accent/30 hover:shadow-glow-sm transition-all">
              <img src={s.logo} alt={s.name} className="w-16 h-16 rounded-xl object-cover" />
              <div>
                <p className="font-bold text-nexzen-text">{s.name}</p>
                <Badge size="xs" className={cn('border mt-1.5 capitalize', TIER_COLORS[s.tier] || TIER_COLORS.bronze)}>{s.tier}</Badge>
              </div>
              <p className="text-xs text-nexzen-muted leading-relaxed line-clamp-2">{s.description}</p>
              {s.website && (
                <a href={s.website} target="_blank" rel="noopener noreferrer"
                  className="text-xs text-nexzen-accent hover:underline flex items-center gap-1">
                  <ExternalLink size={12} />Visit Website
                </a>
              )}
            </motion.div>
          ))}
        </motion.div>

        {/* Become a sponsor CTA */}
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          className="glass rounded-3xl border border-nexzen-accent/20 p-10 text-center max-w-3xl mx-auto">
          <h2 className="text-3xl font-extrabold text-nexzen-text mb-3">Partner with <span className="gradient-text">NEXZEN</span></h2>
          <p className="text-nexzen-muted mb-6">Reach 1M+ student developers, engineers, and designers across India. Sponsor hackathons, host challenges, and build your talent pipeline.</p>
          <div className="flex flex-wrap gap-2 justify-center mb-8">
            {['Reach 1M+ Students', 'Brand Visibility', 'Talent Pipeline', 'Custom Challenges', 'Event Co-branding'].map((b) => (
              <span key={b} className="px-3 py-1.5 rounded-xl bg-white/5 border border-white/10 text-xs text-nexzen-muted">{b}</span>
            ))}
          </div>
          <Button variant="primary" size="lg" icon={<Mail size={16} />} onClick={() => navigate('/contact')}>Contact Us to Sponsor</Button>
        </motion.div>
      </div>
    </div>
  );
}
