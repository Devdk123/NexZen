import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Code2, Briefcase, Camera, Video, Globe, Edit, ExternalLink } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { Badge } from '../components/ui/Badge';
import { Button } from '../components/ui/Button';
import { Skeleton } from '../components/ui/Skeleton';
import { cn, getProfileCompleteness } from '../utils';
import { MOCK_USERS } from '../data/users';
import type { User } from '../types';

export default function ProfilePage() {
  const { id } = useParams<{ id: string }>();
  const { user: currentUser } = useAuth();
  const [profile, setProfile] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // If viewing own profile, use currentUser directly
    if (currentUser && currentUser.id === id) {
      setProfile(currentUser);
      setLoading(false);
      return;
    }
    // For other users, try MOCK_USERS fallback (or Supabase in the future)
    setTimeout(() => {
      const found = MOCK_USERS.find((u) => u.id === id) || null;
      setProfile(found);
      setLoading(false);
    }, 400);
  }, [id, currentUser]);

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-12 space-y-4">
        <Skeleton className="h-32 w-full rounded-2xl" />
        <Skeleton className="h-8 w-1/2" />
        <Skeleton className="h-4 w-full" />
      </div>
    );
  }

  const displayUser = profile || currentUser;
  if (!displayUser) return (
    <div className="min-h-screen bg-nexzen-bg flex items-center justify-center">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-nexzen-text mb-2">Profile not found</h2>
        <Link to="/hackathons" className="text-nexzen-accent hover:underline">Browse Hackathons</Link>
      </div>
    </div>
  );

  const isOwnProfile = currentUser?.id === displayUser.id;
  const { score } = getProfileCompleteness(displayUser as any);

  const socialLinks = [
    { href: displayUser.github, icon: <Code2 size={16} />, label: 'GitHub' },
    { href: displayUser.linkedin, icon: <Briefcase size={16} />, label: 'LinkedIn' },
    { href: displayUser.instagram, icon: <Camera size={16} />, label: 'Instagram' },
    { href: displayUser.youtube, icon: <Video size={16} />, label: 'YouTube' },
    { href: displayUser.portfolio, icon: <Globe size={16} />, label: 'Portfolio' },
  ].filter((s) => s.href);

  return (
    <div className="min-h-screen bg-nexzen-bg bg-dots">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 pb-20">
        {/* Profile header */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          className="glass rounded-2xl border border-white/8 p-8 mb-6">
          <div className="flex flex-col sm:flex-row items-start gap-6">
            {/* Avatar with ring */}
            <div className="relative flex-shrink-0">
              <div className="w-24 h-24 rounded-full p-0.5 bg-gradient-to-br from-nexzen-accent via-nexzen-violet to-nexzen-cyan">
                <img
                  src={displayUser.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(displayUser.fullName)}&background=6366F1&color=fff&size=200`}
                  alt={displayUser.fullName}
                  className="w-full h-full rounded-full object-cover border-2 border-nexzen-bg"
                />
              </div>
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between flex-wrap gap-3">
                <div>
                  <h1 className="text-2xl font-extrabold text-nexzen-text">{displayUser.fullName}</h1>
                  <p className="text-nexzen-muted text-sm mt-0.5">{displayUser.college}</p>
                  <p className="text-nexzen-subtle text-xs mt-0.5">
                    {displayUser.course} · {displayUser.branch} · {displayUser.currentYear}
                  </p>
                </div>
                {isOwnProfile && (
                  <Link to="/profile/edit">
                    <Button variant="secondary" size="sm" icon={<Edit size={14} />}>Edit Profile</Button>
                  </Link>
                )}
              </div>

              {displayUser.bio && (
                <p className="text-nexzen-muted text-sm mt-3 leading-relaxed max-w-xl">{displayUser.bio}</p>
              )}

              {/* Social links */}
              {socialLinks.length > 0 && (
                <div className="flex gap-2 mt-4 flex-wrap">
                  {socialLinks.map((s) => (
                    <a key={s.label} href={s.href!} target="_blank" rel="noopener noreferrer"
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl glass border border-white/10 text-xs text-nexzen-muted hover:text-nexzen-accent hover:border-nexzen-accent/30 transition-all">
                      {s.icon}{s.label}
                    </a>
                  ))}
                </div>
              )}

              {/* Profile strength */}
              <div className="mt-4">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-xs text-nexzen-subtle">Profile strength</span>
                  <span className="text-xs font-semibold text-nexzen-accent">{score}%</span>
                </div>
                <div className="h-1.5 bg-white/8 rounded-full w-48">
                  <div className="h-full bg-gradient-to-r from-nexzen-accent to-nexzen-violet rounded-full" style={{ width: `${score}%` }} />
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Domains & Skills */}
          <div className="md:col-span-2 space-y-5">
            {displayUser.domains && displayUser.domains.length > 0 && (
              <div className="glass rounded-2xl border border-white/8 p-6">
                <h2 className="font-bold text-nexzen-text mb-3">Domains</h2>
                <div className="flex flex-wrap gap-2">
                  {displayUser.domains.map((d) => (
                    <Badge key={d} variant="accent" size="sm">{d}</Badge>
                  ))}
                </div>
              </div>
            )}

            {displayUser.skills && displayUser.skills.length > 0 && (
              <div className="glass rounded-2xl border border-white/8 p-6">
                <h2 className="font-bold text-nexzen-text mb-3">Skills</h2>
                <div className="flex flex-wrap gap-2">
                  {displayUser.skills.map((s) => (
                    <span key={s} className="px-2.5 py-1 rounded-lg bg-white/5 border border-white/10 text-xs text-nexzen-muted">{s}</span>
                  ))}
                </div>
              </div>
            )}

            {displayUser.liveProjects && displayUser.liveProjects.length > 0 && (
              <div className="glass rounded-2xl border border-white/8 p-6">
                <h2 className="font-bold text-nexzen-text mb-4">Projects</h2>
                <div className="space-y-3">
                  {displayUser.liveProjects.map((p: any) => (
                    <div key={p.id} className="flex items-center justify-between gap-3 py-2 border-b border-white/5 last:border-0">
                      <div>
                        <p className="font-semibold text-nexzen-text text-sm">{p.name}</p>
                        {p.description && <p className="text-xs text-nexzen-muted mt-0.5 line-clamp-1">{p.description}</p>}
                      </div>
                      <a href={p.url} target="_blank" rel="noopener noreferrer"
                        className="flex items-center gap-1 text-xs text-nexzen-accent hover:underline flex-shrink-0">
                        <ExternalLink size={12} />View
                      </a>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-5">
            <div className="glass rounded-2xl border border-white/8 p-5">
              <h3 className="font-bold text-nexzen-text mb-4">Education</h3>
              <div className="space-y-2 text-sm">
                <p className="font-medium text-nexzen-text">{displayUser.college}</p>
                <p className="text-nexzen-muted">{displayUser.degree} in {displayUser.branch}</p>
                <p className="text-nexzen-subtle text-xs">{displayUser.currentYear} · Graduating {displayUser.graduationYear}</p>
                <p className="text-nexzen-subtle text-xs">{displayUser.city}, {displayUser.state}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
