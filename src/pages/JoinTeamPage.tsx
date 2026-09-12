import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Search, Users, ArrowRight } from 'lucide-react';
import { teamService } from '../services/teams';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../components/ui/Toast';
import { Badge } from '../components/ui/Badge';
import { Button } from '../components/ui/Button';
import { EmptyState } from '../components/ui/EmptyState';
import { cn } from '../utils';
import { ALL_DOMAINS } from '../types';
import type { Team } from '../types';

export default function JoinTeamPage() {
  const { user } = useAuth();
  const { success } = useToast();
  const [teams, setTeams] = useState<Team[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [selectedDomain, setSelectedDomain] = useState('all');
  const [requestedIds, setRequestedIds] = useState<Set<string>>(new Set());

  useEffect(() => {
    teamService.getOpenTeams().then((t) => { setTeams(t); setLoading(false); });
  }, []);

  const filtered = teams.filter((t) => {
    const matchSearch = !search || t.name.toLowerCase().includes(search.toLowerCase()) || t.hackathonName?.toLowerCase().includes(search.toLowerCase());
    const matchDomain = selectedDomain === 'all' || (t.domains || []).includes(selectedDomain);
    return matchSearch && matchDomain;
  });

  const handleRequest = (team: Team) => {
    setRequestedIds((s) => new Set([...s, team.id]));
    success('Request Sent!', `Your request to join "${team.name}" has been sent to the team leader.`);
  };

  return (
    <div className="min-h-screen bg-nexzen-bg bg-grid">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-20">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="text-3xl font-extrabold text-nexzen-text mb-2">Find a <span className="gradient-text">Team</span></h1>
          <p className="text-nexzen-muted mb-8">Browse open teams and request to join one that matches your skills.</p>

          {/* Filters */}
          <div className="flex flex-wrap gap-3 mb-8">
            <div className="relative flex-1 min-w-64">
              <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-nexzen-subtle" />
              <input value={search} onChange={(e) => setSearch(e.target.value)}
                placeholder="Search teams or hackathons..." className="input-base pl-10" />
            </div>
            <select value={selectedDomain} onChange={(e) => setSelectedDomain(e.target.value)}
              className="input-base w-auto px-4 appearance-none">
              <option value="all">All Domains</option>
              {ALL_DOMAINS.map((d) => <option key={d} value={d} className="bg-nexzen-surface">{d}</option>)}
            </select>
          </div>

          <p className="text-sm text-nexzen-muted mb-4">
            <span className="text-nexzen-text font-semibold">{filtered.length}</span> open teams
          </p>

          {loading ? (
            <div className="space-y-4">{Array.from({ length: 4 }).map((_, i) => <div key={i} className="skeleton rounded-2xl h-36" />)}</div>
          ) : filtered.length === 0 ? (
            <EmptyState icon={<Users size={32} />} title="No open teams found" description="No teams match your filters. Try different domains or create your own team." />
          ) : (
            <div className="space-y-4">
              {filtered.map((team, i) => {
                const isFull = team.members.length >= team.maxSize;
                const hasRequested = requestedIds.has(team.id);
                const isMyTeam = team.members.some((m) => m.userId === user?.id);
                return (
                  <motion.div key={team.id} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.07 }}
                    className="glass rounded-2xl border border-white/8 p-5 flex items-start gap-4 hover:border-white/15 transition-all">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-nexzen-accent to-nexzen-violet flex items-center justify-center font-bold text-white text-lg flex-shrink-0">
                      {team.name[0]}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between flex-wrap gap-3">
                        <div>
                          <h3 className="font-bold text-nexzen-text">{team.name}</h3>
                          <p className="text-xs text-nexzen-muted mt-0.5">{team.hackathonName}</p>
                        </div>
                        <div className="flex items-center gap-3">
                          <span className="text-xs text-nexzen-muted">{team.members.length}/{team.maxSize} members</span>
                          {isMyTeam ? (
                            <Badge variant="success" size="sm">Joined</Badge>
                          ) : hasRequested ? (
                            <Badge variant="default" size="sm">Requested</Badge>
                          ) : isFull ? (
                            <Button variant="secondary" size="sm" disabled>Full</Button>
                          ) : (
                            <Button variant="primary" size="sm" iconRight={<ArrowRight size={13} />} onClick={() => handleRequest(team)}>
                              Request to Join
                            </Button>
                          )}
                        </div>
                      </div>
                      {team.description && <p className="text-xs text-nexzen-muted mt-2 line-clamp-2">{team.description}</p>}
                      <div className="flex items-center gap-2 mt-3 flex-wrap">
                        {(team.domains || []).map((d) => <Badge key={d} size="xs" variant="default">{d}</Badge>)}
                        {(team.lookingFor || []).map((r) => (
                          <span key={r} className="px-2 py-0.5 rounded-full border border-dashed border-nexzen-violet/40 text-nexzen-violet text-[10px]">
                            Looking: {r}
                          </span>
                        ))}
                      </div>
                      <div className="flex -space-x-2 mt-3">
                        {team.members.slice(0, 5).map((m, j) => (
                          <div key={j} className="w-6 h-6 rounded-full bg-gradient-to-br from-nexzen-accent to-nexzen-violet border-2 border-nexzen-bg flex items-center justify-center text-[9px] font-bold text-white" title={m.name}>
                            {m.name?.[0] || '?'}
                          </div>
                        ))}
                      </div>
                    </div>
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

