import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Users, Plus, ExternalLink } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { teamService } from '../services/teams';
import { EmptyState } from '../components/ui/EmptyState';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { cn } from '../utils';
import type { Team } from '../types';

export default function MyTeamsPage() {
  const { user } = useAuth();
  const [teams, setTeams] = useState<Team[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;
    teamService.getMyTeams(user.id).then((t) => { setTeams(t); setLoading(false); });
  }, [user]);

  if (!user) return null;

  return (
    <div className="min-h-screen bg-nexzen-bg bg-grid">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 pb-20">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-extrabold text-nexzen-text">My <span className="gradient-text">Teams</span></h1>
              <p className="text-nexzen-muted text-sm mt-1">{teams.length} team{teams.length !== 1 ? 's' : ''}</p>
            </div>
            <div className="flex gap-2">
              <Link to="/teams/join"><Button variant="secondary" size="sm" icon={<Users size={14} />}>Find Team</Button></Link>
              <Link to="/teams/create"><Button variant="primary" size="sm" icon={<Plus size={14} />}>Create Team</Button></Link>
            </div>
          </div>

          {loading ? (
            <div className="space-y-4">{Array.from({ length: 2 }).map((_, i) => <div key={i} className="skeleton rounded-2xl h-36" />)}</div>
          ) : teams.length === 0 ? (
            <EmptyState icon={<Users size={32} />} title="No teams yet"
              description="You haven't joined or created any teams yet. Find a team to join or create your own."
              action={
                <div className="flex gap-3">
                  <Link to="/teams/join"><Button variant="secondary">Find a Team</Button></Link>
                  <Link to="/teams/create"><Button variant="primary">Create a Team</Button></Link>
                </div>
              } />
          ) : (
            <div className="space-y-4">
              {teams.map((team, i) => {
                const isLeader = team.leaderId === user.id;
                return (
                  <motion.div key={team.id} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}
                    className="glass rounded-2xl border border-white/8 p-5 hover:border-white/15 transition-all">
                    <div className="flex items-start justify-between gap-4 flex-wrap">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-nexzen-accent to-nexzen-violet flex items-center justify-center font-bold text-white text-lg flex-shrink-0">
                          {team.name[0]}
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <h3 className="font-bold text-nexzen-text">{team.name}</h3>
                            {isLeader && <Badge variant="accent" size="xs">Leader</Badge>}
                            <Badge size="xs" className={cn('border capitalize', team.status === 'open' ? 'bg-green-500/15 text-green-400 border-green-500/30' : 'bg-white/5 text-nexzen-muted border-white/10')}>
                              {team.status}
                            </Badge>
                          </div>
                          <p className="text-xs text-nexzen-muted mt-0.5">{team.hackathonName}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-xs text-nexzen-subtle">{team.members.length}/{team.maxSize} members</p>
                      </div>
                    </div>

                    {team.description && (
                      <p className="text-xs text-nexzen-muted mt-3 line-clamp-2 leading-relaxed">{team.description}</p>
                    )}

                    {/* Members */}
                    <div className="flex items-center gap-2 mt-4">
                      <div className="flex -space-x-2">
                        {team.members.slice(0, 5).map((m, j) => (
                          <div key={j} className="w-7 h-7 rounded-full bg-gradient-to-br from-nexzen-accent to-nexzen-violet border-2 border-nexzen-bg flex items-center justify-center text-[10px] font-bold text-white"
                            title={m.name}>
                            {m.name?.[0] || '?'}
                          </div>
                        ))}
                      </div>
                      <span className="text-xs text-nexzen-subtle">{team.members.length} member{team.members.length !== 1 ? 's' : ''}</span>
                    </div>

                    {/* Domains */}
                    {team.domains && team.domains.length > 0 && (
                      <div className="flex flex-wrap gap-1.5 mt-3">
                        {team.domains.map((d) => <Badge key={d} size="xs" variant="default">{d}</Badge>)}
                      </div>
                    )}
                  </motion.div>
                );
              })}
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
}
