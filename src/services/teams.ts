import type { Team, TeamFormData } from '../types';
import { MOCK_TEAMS } from '../data/users';

const delay = (ms: number) => new Promise((res) => setTimeout(res, ms));
const TEAMS_KEY = 'nexzen_teams';

export const teamService = {
  async getOpenTeams(hackathonId?: string): Promise<Team[]> {
    await delay(400);
    const stored = this._getStoredTeams();
    const all = [...MOCK_TEAMS, ...stored];
    if (hackathonId) return all.filter((t) => t.hackathonId === hackathonId && t.status === 'open');
    return all.filter((t) => t.status === 'open');
  },

  async getMyTeams(userId: string): Promise<Team[]> {
    // Check Supabase first
    try {
      // Import dynamically to avoid circular dependencies if any
      const { getUserTeam } = await import('./teamSupabase');
      const supabaseTeam = await getUserTeam(userId);
      
      if (supabaseTeam) {
        const team: Team = {
          id: supabaseTeam.team_code || supabaseTeam.id,
          name: supabaseTeam.team_name,
          hackathonId: 'default',
          hackathonName: 'NEXZEN Hackathon',
          leaderId: supabaseTeam.leader_user_id,
          leaderName: supabaseTeam.leader_name,
          members: supabaseTeam.team_members?.map((m: any) => ({
            id: m.id,
            fullName: m.member_name,
            email: m.member_email,
            phone: m.member_phone,
            github: m.member_github,
            linkedin: m.member_linkedin,
            isLeader: m.is_leader,
            skills: []
          })) || [],
          maxSize: supabaseTeam.max_size || 4,
          status: supabaseTeam.status as any,
          domains: [],
          createdAt: supabaseTeam.created_at,
          college: supabaseTeam.leader_college
        };
        return [team];
      }
    } catch (e) {
      console.error('Failed to get Supabase team in getMyTeams', e);
    }

    // Fallback to mock
    await delay(300);
    const stored = this._getStoredTeams();
    const all = [...MOCK_TEAMS, ...stored];
    return all.filter(
      (t) => t.leaderId === userId || t.members.some((m) => m.userId === userId)
    );
  },

  async create(userId: string, data: TeamFormData): Promise<Team> {
    await delay(1000);
    const team: Team = {
      id: 'team-' + Date.now(),
      name: data.name,
      description: data.description,
      hackathonId: data.hackathonId,
      hackathonName: '',
      leaderId: userId,
      leaderName: 'You',
      members: data.members.map((m, i) => ({ ...m, id: 'm-' + i })),
      maxSize: data.maxSize,
      status: 'open' as const,
      domains: data.domains,
      createdAt: new Date().toISOString(),
    };
    const stored = this._getStoredTeams();
    localStorage.setItem(TEAMS_KEY, JSON.stringify([...stored, team]));
    return team;
  },

  _getStoredTeams(): Team[] {
    try {
      const s = localStorage.getItem(TEAMS_KEY);
      return s ? JSON.parse(s) : [];
    } catch {
      return [];
    }
  },
};

