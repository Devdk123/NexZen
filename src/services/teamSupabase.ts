import { supabase, hasSupabase } from '../lib/supabase';

// Types
export interface TeamMemberData {
  name: string;
  email: string;
  phone: string;
  github: string;
  linkedin: string;
}

export interface CreateTeamData {
  teamName: string;
  leaderUserId: string;
  leaderName: string;
  leaderEmail: string;
  leaderPhone: string;
  leaderCollege: string;
  leaderGithub: string;
  leaderLinkedin: string;
  members: TeamMemberData[];
}

export const generateTeamCode = async (): Promise<string> => {
  if (!hasSupabase || !supabase) {
    return `NX-${Math.random().toString(36).substring(2, 8).toUpperCase()}`;
  }

  let isUnique = false;
  let code = '';
  
  while (!isUnique) {
    const randomChars = Math.random().toString(36).substring(2, 8).toUpperCase();
    code = `NX-${randomChars}`;
    
    const { data, error } = await supabase
      .from('teams')
      .select('team_code')
      .eq('team_code', code)
      .single();
      
    if (error && error.code === 'PGRST116') {
      // PGRST116 means no rows returned, which means the code is unique
      isUnique = true;
    } else if (!data) {
       isUnique = true;
    }
  }
  
  return code;
};

export const createTeam = async (data: CreateTeamData) => {
  if (!hasSupabase || !supabase) {
    return {
      team: { id: 'mock-team-id', team_name: data.teamName, status: data.members.length >= 3 ? 'full' : 'open' },
      teamCode: await generateTeamCode()
    };
  }

  try {
    const teamCode = await generateTeamCode();
    const totalMembers = data.members.length + 1; // +1 for leader
    const status = totalMembers >= 4 ? 'full' : 'open';

    // 1. Create team
    const { data: teamData, error: teamError } = await supabase
      .from('teams')
      .insert({
        team_code: teamCode,
        team_name: data.teamName,
        leader_user_id: data.leaderUserId,
        leader_name: data.leaderName,
        leader_email: data.leaderEmail,
        leader_phone: data.leaderPhone,
        leader_college: data.leaderCollege,
        leader_github: data.leaderGithub,
        leader_linkedin: data.leaderLinkedin,
        max_size: 4,
        status: status
      })
      .select()
      .single();

    if (teamError) throw teamError;

    // 2. Insert leader as member
    const { error: leaderError } = await supabase
      .from('team_members')
      .insert({
        team_id: teamData.id,
        member_name: data.leaderName,
        member_email: data.leaderEmail,
        member_phone: data.leaderPhone,
        member_github: data.leaderGithub,
        member_linkedin: data.leaderLinkedin,
        is_leader: true
      });

    if (leaderError) throw leaderError;

    // 3. Insert other members
    if (data.members.length > 0) {
      const membersToInsert = data.members.map(member => ({
        team_id: teamData.id,
        member_name: member.name,
        member_email: member.email,
        member_phone: member.phone,
        member_github: member.github,
        member_linkedin: member.linkedin,
        is_leader: false
      }));

      const { error: membersError } = await supabase
        .from('team_members')
        .insert(membersToInsert);

      if (membersError) throw membersError;
    }

    return { team: teamData, teamCode };
  } catch (error) {
    console.error('Error creating team:', error);
    throw error;
  }
};

export const joinTeam = async (teamCode: string, memberData: TeamMemberData) => {
  if (!hasSupabase || !supabase) {
    return { id: 'mock-team-id', team_name: 'Mock Team' };
  }

  try {
    // 1. Get team
    const { data: team, error: teamError } = await supabase
      .from('teams')
      .select('*, team_members!inner(count)')
      .eq('team_code', teamCode)
      .single();

    if (teamError) throw new Error('Team not found');
    if (!team) throw new Error('Team not found');

    // Supabase returns count as an array if not careful, but usually as an object.
    const currentMemberCount = team.team_members?.[0]?.count || 0;
    
    // 2. Check if full
    if (currentMemberCount >= team.max_size || team.status === 'full') {
      throw new Error('Team is full');
    }

    // 3. Insert member
    const { error: insertError } = await supabase
      .from('team_members')
      .insert({
        team_id: team.id,
        member_name: memberData.name,
        member_email: memberData.email,
        member_phone: memberData.phone,
        member_github: memberData.github,
        member_linkedin: memberData.linkedin,
        is_leader: false
      });

    if (insertError) throw insertError;

    // 4. Update status if now full
    if (currentMemberCount + 1 >= team.max_size) {
      const { error: updateError } = await supabase
        .from('teams')
        .update({ status: 'full' })
        .eq('id', team.id);
        
      if (updateError) throw updateError;
    }

    // 5. Return updated team
    const { data: updatedTeam, error: refetchError } = await supabase
      .from('teams')
      .select('*, team_members(*)')
      .eq('id', team.id)
      .single();
      
    if (refetchError) throw refetchError;
    return updatedTeam;

  } catch (error) {
    console.error('Error joining team:', error);
    throw error;
  }
};

export const getTeamByCode = async (code: string) => {
  if (!hasSupabase || !supabase) {
    return null;
  }

  try {
    const { data, error } = await supabase
      .from('teams')
      .select('*, team_members(*)')
      .eq('team_code', code)
      .single();

    if (error && error.code !== 'PGRST116') throw error;
    return data || null;
  } catch (error) {
    console.error('Error fetching team by code:', error);
    return null;
  }
};

export const getUserTeam = async (userId: string, userEmail?: string) => {
  if (!hasSupabase || !supabase) {
    return null;
  }

  try {
    // Check by leader_user_id
    if (userId) {
      const { data: leaderTeam, error: leaderError } = await supabase
        .from('teams')
        .select('*, team_members(*)')
        .eq('leader_user_id', userId)
        .single();
        
      if (!leaderError && leaderTeam) return leaderTeam;
    }

    let emailToCheck = userEmail;

    if (userId && !emailToCheck) {
      const { data: { user } } = await supabase.auth.getUser();
      if (user && user.email) {
        emailToCheck = user.email;
      }
    }

    // Check by email in team_members
    if (emailToCheck) {
      const { data: memberData, error: memberError } = await supabase
        .from('team_members')
        .select('team_id')
        .eq('member_email', emailToCheck)
        .single();

      if (!memberError && memberData) {
        const { data: teamData, error: teamError } = await supabase
          .from('teams')
          .select('*, team_members(*)')
          .eq('id', memberData.team_id)
          .single();
          
        if (!teamError && teamData) return teamData;
      }
    }

    return null;
  } catch (error) {
    console.error('Error fetching user team:', error);
    return null;
  }
};

export const getTeamById = async (teamId: string) => {
  if (!hasSupabase || !supabase) {
    return null;
  }

  try {
    const { data, error } = await supabase
      .from('teams')
      .select('*, team_members(*)')
      .eq('id', teamId)
      .single();

    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Error fetching team by ID:', error);
    return null;
  }
};
