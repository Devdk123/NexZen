import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FileText, ArrowRight } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { applicationService } from '../services/applications';
import { EmptyState } from '../components/ui/EmptyState';
import { HackathonCardSkeleton } from '../components/ui/Skeleton';
import { cn, timeAgo, STATUS_LABELS, STATUS_COLORS } from '../utils';
import type { Application } from '../types';

const TABS = ['all', 'applied', 'under_review', 'shortlisted', 'selected', 'rejected', 'completed'] as const;
type Tab = typeof TABS[number];

export default function MyApplicationsPage() {
  const { user } = useAuth();
  const [applications, setApplications] = useState<Application[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<Tab>('all');

  useEffect(() => {
    if (!user) return;
    applicationService.getMyApplications(user.id).then((apps) => {
      setApplications(apps);
      setLoading(false);
    });
  }, [user]);

  const filtered = activeTab === 'all' ? applications : applications.filter((a) => a.status === activeTab);
  const countByTab = (tab: Tab) => tab === 'all' ? applications.length : applications.filter((a) => a.status === tab).length;

  return (
    <div className="min-h-screen bg-nexzen-bg bg-grid">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-20">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-3xl font-extrabold text-nexzen-text">My <span className="gradient-text">Applications</span></h1>
              <p className="text-nexzen-muted text-sm mt-1">{applications.length} total applications</p>
            </div>
            <Link to="/hackathons">
              <button className="flex items-center gap-2 px-4 py-2 rounded-xl bg-nexzen-accent/15 border border-nexzen-accent/30 text-nexzen-accent text-sm hover:bg-nexzen-accent/25 transition-all">
                Find Hackathons <ArrowRight size={14} />
              </button>
            </Link>
          </div>

          {/* Tab filter */}
          <div className="flex gap-1 p-1 glass rounded-xl border border-white/8 overflow-x-auto no-scrollbar mb-6">
            {TABS.map((tab) => {
              const count = countByTab(tab);
              return (
                <button key={tab} onClick={() => setActiveTab(tab)}
                  className={cn('relative flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-medium whitespace-nowrap transition-colors',
                    activeTab === tab ? 'text-nexzen-text bg-white/10' : 'text-nexzen-muted hover:text-nexzen-text')}>
                  <span className="capitalize">{tab === 'all' ? 'All' : STATUS_LABELS[tab] || tab}</span>
                  <span className={cn('px-1.5 py-0.5 rounded-full text-[10px]', activeTab === tab ? 'bg-nexzen-accent/20 text-nexzen-accent' : 'bg-white/8 text-nexzen-subtle')}>
                    {count}
                  </span>
                </button>
              );
            })}
          </div>

          {loading ? (
            <div className="space-y-3">{Array.from({ length: 3 }).map((_, i) => <HackathonCardSkeleton key={i} />)}</div>
          ) : filtered.length === 0 ? (
            <EmptyState icon={<FileText size={32} />} title="No applications" description={activeTab === 'all' ? "You haven't applied to any hackathons yet." : `No applications with status: ${activeTab}`}
              action={<Link to="/hackathons"><button className="px-4 py-2 rounded-xl bg-nexzen-accent text-white text-sm">Explore Hackathons</button></Link>} />
          ) : (
            <AnimatePresence mode="wait">
              <motion.div key={activeTab} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                className="space-y-3">
                {filtered.map((app, i) => (
                  <motion.div key={app.id} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}
                    className="glass rounded-2xl border border-white/8 p-5 flex items-center gap-4 hover:border-white/15 transition-all">
                    <img src={app.hackathonLogo} alt={app.hackathonName}
                      className="w-12 h-12 rounded-xl object-cover border border-white/10 flex-shrink-0"
                      onError={(e) => { (e.target as HTMLImageElement).src = 'https://ui-avatars.com/api/?name=H&background=6366F1&color=fff'; }} />
                    <div className="flex-1 min-w-0">
                      <p className="font-bold text-nexzen-text text-sm truncate">{app.hackathonName}</p>
                      <p className="text-xs text-nexzen-muted mt-0.5">Applied {timeAgo(app.appliedAt)} · {app.type}</p>
                    </div>
                    <div className="text-right flex-shrink-0">
                      <span className={cn('px-2.5 py-1 rounded-full text-xs font-semibold border capitalize', STATUS_COLORS[app.status] || 'bg-white/5 text-nexzen-muted border-white/10')}>
                        {STATUS_LABELS[app.status] || app.status}
                      </span>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </AnimatePresence>
          )}
        </motion.div>
      </div>
    </div>
  );
}
