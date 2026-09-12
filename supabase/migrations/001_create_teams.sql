-- ============================================================
-- NEXZEN Team Management Tables
-- Run this in Supabase SQL Editor: https://supabase.com/dashboard
-- ============================================================

-- Teams table
CREATE TABLE IF NOT EXISTS teams (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  team_code VARCHAR(10) UNIQUE NOT NULL,
  team_name VARCHAR(100) NOT NULL,
  leader_user_id UUID NOT NULL,
  leader_name VARCHAR(100) NOT NULL,
  leader_email VARCHAR(255) NOT NULL,
  leader_phone VARCHAR(20),
  leader_college VARCHAR(200),
  leader_github VARCHAR(255),
  leader_linkedin VARCHAR(255),
  max_size INT DEFAULT 4,
  status VARCHAR(20) DEFAULT 'open',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Team members table
CREATE TABLE IF NOT EXISTS team_members (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  team_id UUID REFERENCES teams(id) ON DELETE CASCADE,
  member_name VARCHAR(100),
  member_email VARCHAR(255) NOT NULL,
  member_phone VARCHAR(20),
  member_github VARCHAR(255),
  member_linkedin VARCHAR(255),
  is_leader BOOLEAN DEFAULT FALSE,
  joined_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE teams ENABLE ROW LEVEL SECURITY;
ALTER TABLE team_members ENABLE ROW LEVEL SECURITY;

-- Policies
CREATE POLICY "Anyone can read teams" ON teams FOR SELECT USING (true);
CREATE POLICY "Authenticated users can create teams" ON teams FOR INSERT WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "Leader can update own team" ON teams FOR UPDATE USING (leader_user_id = auth.uid());
CREATE POLICY "Anyone can read team_members" ON team_members FOR SELECT USING (true);
CREATE POLICY "Authenticated users can add members" ON team_members FOR INSERT WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "Can delete members from own team" ON team_members FOR DELETE USING (
  EXISTS (SELECT 1 FROM teams WHERE teams.id = team_members.team_id AND teams.leader_user_id = auth.uid())
);
