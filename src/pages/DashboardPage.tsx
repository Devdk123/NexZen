import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Trophy, Users, Bookmark, Calendar, ArrowRight, FileText } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useNotifications } from '../context/NotificationsContext';
import { applicationService } from '../services/applications';
import { teamService } from '../services/teams';
import { hackathonService } from '../services/hackathons';
import { getUserTeam } from '../services/teamSupabase';
import { HackathonCard } from '../components/hackathons/HackathonCard';
import { Badge } from '../components/ui/Badge';
import { Button } from '../components/ui/Button';
import { cn, timeAgo, STATUS_LABELS, STATUS_COLORS, getProfileCompleteness } from '../utils';
import type { Application, Team, Hackathon } from '../types';
import { TeamSelectionPopup } from '../components/TeamSelectionPopup';
import { CreateTeamModal } from '../components/CreateTeamModal';
import JoinTeamModal from '../components/JoinTeamModal';

function greeting() {
  const h = new Date().getHours();
  if (h < 12) return 'Good morning';
  if (h < 17) return 'Good afternoon';
  return 'Good evening';
}

export default function DashboardPage() {
  const { user } = useAuth();
  const { notifications, unreadCount } = useNotifications();
  const [applications, setApplications] = useState<Application[]>([]);
  const [teams, setTeams] = useState<Team[]>([]);
  const [recommended, setRecommended] = useState<Hackathon[]>([]);
  const [savedCount, setSavedCount] = useState(0);

  // Team popup state
  const [showTeamPopup, setShowTeamPopup] = useState(false);
  const [showCreateTeam, setShowCreateTeam] = useState(false);
  const [showJoinTeam, setShowJoinTeam] = useState(false);
  const [checkingTeam, setCheckingTeam] = useState(true);

  useEffect(() => {
    if (!user) return;
    applicationService.getMyApplications(user.id).then(setApplications);
    teamService.getMyTeams(user.id).then(setTeams);
    hackathonService.getAll({ registrationStatus: 'open', sortBy: 'popular' }).then((h) => setRecommended(h.slice(0, 3)));
    setSavedCount(hackathonService.getSavedIds().length);

    // Check if user already has a team
    getUserTeam(user.id, user.email).then((existingTeam) => {
      if (!existingTeam) {
        setShowTeamPopup(true);
      }
      setCheckingTeam(false);
    }).catch(() => {
      setCheckingTeam(false);
    });
  }, [user]);

  if (!user) return null;

  const { score, missing } = getProfileCompleteness(user as any);
  const firstName = user.fullName.split(' ')[0];

  const stats = [
    { label: 'Applications', value: applications.length, icon: FileText, color: 'text-nexzen-accent', bg: 'bg-nexzen-accent/15', link: '/my/applications' },
    { label: 'Teams', value: teams.length, icon: Users, color: 'text-nexzen-violet', bg: 'bg-nexzen-violet/15', link: '/my/teams' },
    { label: 'Saved', value: savedCount, icon: Bookmark, color: 'text-nexzen-cyan', bg: 'bg-nexzen-cyan/15', link: '/my/saved' },
    { label: 'Unread', value: unreadCount, icon: Calendar, color: 'text-yellow-400', bg: 'bg-yellow-500/15', link: '#' },
  ];

  return (
    <div className="min-h-screen bg-nexzen-bg bg-grid">
      {/* Team Selection Popup - shows when user has no team */}
      {showTeamPopup && !showCreateTeam && !showJoinTeam && (
        <TeamSelectionPopup
          onCreateTeam={() => { setShowTeamPopup(false); setShowCreateTeam(true); }}
          onJoinTeam={() => { setShowTeamPopup(false); setShowJoinTeam(true); }}
        />
      )}

      {/* Create Team Modal */}
      {showCreateTeam && (
        <CreateTeamModal
          user={user}
          onClose={() => { setShowCreateTeam(false); }}
          onSuccess={(teamCode) => {
            setShowCreateTeam(false);
          }}
        />
      )}

      {/* Join Team Modal */}
      {showJoinTeam && (
        <JoinTeamModal
          user={user}
          onClose={() => { setShowJoinTeam(false); }}
          onSuccess={() => {
            setShowJoinTeam(false);
          }}
        />
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-20">
        {/* Welcome */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="flex items-center justify-between mb-8 flex-wrap gap-4">
          <div className="flex items-center gap-4">
            <img
              src={user.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(user.fullName)}&background=6366F1&color=fff`}
              alt={user.fullName} className="w-14 h-14 rounded-2xl border border-white/15 object-cover"
            />
            <div>
              <p className="text-nexzen-muted text-sm">{greeting()},</p>
              <h1 className="text-2xl font-extrabold text-nexzen-text">{firstName} 👋</h1>
            </div>
          </div>
          <Link to="/hackathons">
            <Button variant="primary" iconRight={<ArrowRight size={14} />}>Explore Hackathons</Button>
          </Link>
        </motion.div>

        {/* Profile completion */}
        {score < 100 && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
            className="glass rounded-2xl border border-nexzen-accent/20 p-5 mb-8 flex items-center justify-between gap-4 flex-wrap">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <p className="text-sm font-semibold text-nexzen-text">Profile {score}% complete</p>
                {missing.length > 0 && <span className="text-xs text-nexzen-muted">— Add: {missing.slice(0, 3).join(', ')}</span>}
              </div>
              <div className="h-2 bg-white/8 rounded-full overflow-hidden">
                <motion.div initial={{ width: 0 }} animate={{ width: `${score}%` }} transition={{ duration: 1, delay: 0.3 }}
                  className="h-full bg-gradient-to-r from-nexzen-accent to-nexzen-violet rounded-full" />
              </div>
            </div>
            <Link to="/profile/edit"><Button variant="secondary" size="sm">Complete Profile</Button></Link>
          </motion.div>
        )}

        {/* Stats grid */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.15 }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
          {stats.map((s, i) => (
            <motion.div key={s.label} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 + i * 0.07 }}>
              <Link to={s.link} className="glass rounded-2xl border border-white/8 p-5 hover:border-white/15 transition-all group block">
                <div className={cn('w-10 h-10 rounded-xl flex items-center justify-center mb-3', s.bg)}>
                  <s.icon size={18} className={s.color} />
                </div>
                <p className="text-2xl font-extrabold text-nexzen-text">{s.value}</p>
                <p className="text-xs text-nexzen-muted mt-1">{s.label}</p>
              </Link>
            </motion.div>
          ))}
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            {/* Recent applications */}
            <section>
              <div className="flex items-center justify-between mb-4">
                <h2 className="font-bold text-nexzen-text">Recent Applications</h2>
                <Link to="/my/applications" className="text-xs text-nexzen-accent hover:underline">View all →</Link>
              </div>
              {applications.length === 0 ? (
                <div className="glass rounded-2xl border border-white/8 p-8 text-center">
                  <p className="text-nexzen-muted text-sm mb-2">No applications yet.</p>
                  <Link to="/hackathons" className="text-nexzen-accent text-sm hover:underline">Find a hackathon to apply →</Link>
                </div>
              ) : (
                <div className="space-y-3">
                  {applications.slice(0, 3).map((app) => (
                    <div key={app.id} className="glass rounded-xl border border-white/8 p-4 flex items-center gap-4 hover:border-white/15 transition-all">
                      <img src={app.hackathonLogo} alt={app.hackathonName}
                        className="w-10 h-10 rounded-xl object-cover flex-shrink-0"
                        onError={(e) => { (e.target as HTMLImageElement).src = 'https://ui-avatars.com/api/?name=H&background=6366F1&color=fff'; }} />
                      <div className="flex-1 min-w-0">
                        <p className="font-semibold text-nexzen-text text-sm truncate">{app.hackathonName}</p>
                        <p className="text-xs text-nexzen-muted">{timeAgo(app.appliedAt)}</p>
                      </div>
                      <span className={cn('px-2.5 py-1 rounded-full text-xs font-semibold border capitalize', STATUS_COLORS[app.status] || 'bg-white/5 text-nexzen-muted border-white/10')}>
                        {STATUS_LABELS[app.status] || app.status}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </section>

            {/* Recommended hackathons */}
            <section>
              <div className="flex items-center justify-between mb-4">
                <h2 className="font-bold text-nexzen-text">Recommended for You</h2>
                <Link to="/hackathons" className="text-xs text-nexzen-accent hover:underline">View all →</Link>
              </div>
              <div className="space-y-4">
                {recommended.map((h) => <HackathonCard key={h.id} hackathon={h} />)}
              </div>
            </section>
          </div>

          {/* Right panel */}
          <div className="space-y-6">
            {unreadCount > 0 && (
              <div className="glass rounded-2xl border border-nexzen-accent/20 p-5">
                <div className="flex items-center gap-2 mb-3">
                  <p className="font-bold text-nexzen-text">Notifications</p>
                  <Badge variant="accent" size="xs">{unreadCount}</Badge>
                </div>
                <div className="space-y-3">
                  {notifications.filter((n) => !n.isRead).slice(0, 3).map((n) => (
                    <div key={n.id} className="flex gap-2">
                      <div className="w-2 h-2 rounded-full bg-nexzen-accent mt-1.5 flex-shrink-0" />
                      <div>
                        <p className="text-xs font-semibold text-nexzen-text">{n.title}</p>
                        <p className="text-xs text-nexzen-muted">{n.message}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="glass rounded-2xl border border-white/8 p-5">
              <p className="font-bold text-nexzen-text mb-3">Quick Actions</p>
              <div className="space-y-1">
                {[
                  { to: '/teams/create', label: 'Create a Team', icon: '👥' },
                  { to: '/teams/join', label: 'Find a Team', icon: '🔍' },
                  { to: `/profile/${user.id}`, label: 'View My Profile', icon: '👤' },
                  { to: '/my/saved', label: 'Saved Hackathons', icon: '🔖' },
                  { to: '/events', label: 'Upcoming Events', icon: '📅' },
                ].map((l) => (
                  <Link key={l.to} to={l.to}
                    className="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-white/5 transition-all text-sm text-nexzen-muted hover:text-nexzen-text">
                    <span>{l.icon}</span>{l.label}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

