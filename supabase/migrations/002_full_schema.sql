-- ============================================================
-- NEXZEN Full Database Schema
-- Run this in Supabase SQL Editor
-- ============================================================

-- 1. PROFILES TABLE (Extends auth.users)
CREATE TABLE IF NOT EXISTS profiles (
  id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  full_name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  avatar TEXT,
  mobile VARCHAR(20),
  gender VARCHAR(50),
  date_of_birth DATE,
  bio TEXT,
  
  -- Education
  college VARCHAR(255),
  course VARCHAR(100),
  degree VARCHAR(100),
  branch VARCHAR(100),
  current_year INT,
  graduation_year INT,
  city VARCHAR(100),
  state VARCHAR(100),
  
  -- Skills & Links (Using JSONB for arrays/objects)
  domains JSONB DEFAULT '[]'::jsonb,
  skills JSONB DEFAULT '[]'::jsonb,
  github TEXT,
  linkedin TEXT,
  instagram TEXT,
  youtube TEXT,
  portfolio TEXT,
  other_links JSONB DEFAULT '[]'::jsonb,
  live_projects JSONB DEFAULT '[]'::jsonb,
  
  -- Stats
  hackathons_participated INT DEFAULT 0,
  hackathons_won INT DEFAULT 0,
  resume_url TEXT,
  
  created_at TIMESTAMPTZ DEFAULT NOW(),
  last_active TIMESTAMPTZ DEFAULT NOW()
);

-- 2. HACKATHONS TABLE
CREATE TABLE IF NOT EXISTS hackathons (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  slug VARCHAR(255) UNIQUE NOT NULL,
  organizer VARCHAR(255) NOT NULL,
  logo TEXT,
  banner TEXT,
  description TEXT,
  short_description TEXT,
  mode VARCHAR(50), -- 'online' | 'offline' | 'hybrid'
  location TEXT,
  city VARCHAR(100),
  
  -- Dates
  registration_deadline TIMESTAMPTZ NOT NULL,
  start_date TIMESTAMPTZ NOT NULL,
  end_date TIMESTAMPTZ NOT NULL,
  
  -- Details
  prize_pool VARCHAR(100),
  prize_breakdown JSONB DEFAULT '[]'::jsonb,
  min_team_size INT DEFAULT 1,
  max_team_size INT DEFAULT 4,
  allow_individual BOOLEAN DEFAULT TRUE,
  
  -- Tags & Rules (JSONB)
  domains JSONB DEFAULT '[]'::jsonb,
  tags JSONB DEFAULT '[]'::jsonb,
  eligibility JSONB DEFAULT '[]'::jsonb,
  skills JSONB DEFAULT '[]'::jsonb,
  sponsors JSONB DEFAULT '[]'::jsonb,
  timeline JSONB DEFAULT '[]'::jsonb,
  problem_statements JSONB DEFAULT '[]'::jsonb,
  judging_criteria JSONB DEFAULT '[]'::jsonb,
  rules JSONB DEFAULT '[]'::jsonb,
  faqs JSONB DEFAULT '[]'::jsonb,
  important_links JSONB DEFAULT '[]'::jsonb,
  
  registration_status VARCHAR(50) DEFAULT 'open',
  difficulty VARCHAR(50) DEFAULT 'open',
  participants_count INT DEFAULT 0,
  teams_count INT DEFAULT 0,
  is_featured BOOLEAN DEFAULT FALSE,
  website_url TEXT,
  
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. EVENTS TABLE
CREATE TABLE IF NOT EXISTS events (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  slug VARCHAR(255) UNIQUE NOT NULL,
  organizer VARCHAR(255) NOT NULL,
  logo TEXT,
  banner TEXT,
  description TEXT,
  short_description TEXT,
  category VARCHAR(100),
  mode VARCHAR(50),
  location TEXT,
  city VARCHAR(100),
  
  date TIMESTAMPTZ NOT NULL,
  end_date TIMESTAMPTZ,
  registration_deadline TIMESTAMPTZ,
  registration_status VARCHAR(50) DEFAULT 'open',
  
  is_free BOOLEAN DEFAULT TRUE,
  price VARCHAR(50),
  
  tags JSONB DEFAULT '[]'::jsonb,
  domains JSONB DEFAULT '[]'::jsonb,
  speakers JSONB DEFAULT '[]'::jsonb,
  agenda JSONB DEFAULT '[]'::jsonb,
  faqs JSONB DEFAULT '[]'::jsonb,
  sponsors JSONB DEFAULT '[]'::jsonb,
  
  website_url TEXT,
  participants_count INT DEFAULT 0,
  is_featured BOOLEAN DEFAULT FALSE,
  
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. APPLICATIONS TABLE
CREATE TABLE IF NOT EXISTS applications (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  hackathon_id UUID REFERENCES hackathons(id) ON DELETE CASCADE,
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  type VARCHAR(50) NOT NULL, -- 'individual' | 'team'
  team_id UUID, -- Optional foreign key to teams table if applicable
  status VARCHAR(50) DEFAULT 'applied', -- 'applied', 'under_review', 'shortlisted', 'selected', 'rejected'
  notes TEXT,
  
  applied_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  
  UNIQUE(hackathon_id, user_id) -- User can only apply once per hackathon
);

-- 5. SAVED HACKATHONS (Bookmarks)
CREATE TABLE IF NOT EXISTS saved_hackathons (
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  hackathon_id UUID REFERENCES hackathons(id) ON DELETE CASCADE,
  saved_at TIMESTAMPTZ DEFAULT NOW(),
  PRIMARY KEY (user_id, hackathon_id)
);

-- 6. NOTIFICATIONS
CREATE TABLE IF NOT EXISTS notifications (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  title VARCHAR(255) NOT NULL,
  message TEXT NOT NULL,
  type VARCHAR(50) DEFAULT 'system', -- 'application' | 'team' | 'hackathon' | 'system'
  is_read BOOLEAN DEFAULT FALSE,
  link TEXT,
  icon TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);


-- ==========================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- ==========================================

-- Enable RLS
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE hackathons ENABLE ROW LEVEL SECURITY;
ALTER TABLE events ENABLE ROW LEVEL SECURITY;
ALTER TABLE applications ENABLE ROW LEVEL SECURITY;
ALTER TABLE saved_hackathons ENABLE ROW LEVEL SECURITY;
ALTER TABLE notifications ENABLE ROW LEVEL SECURITY;

-- Profiles
DROP POLICY IF EXISTS "Public profiles are viewable by everyone" ON profiles;
DROP POLICY IF EXISTS "Users can insert their own profile" ON profiles;
DROP POLICY IF EXISTS "Users can update own profile" ON profiles;

CREATE POLICY "Public profiles are viewable by everyone" ON profiles FOR SELECT USING (true);
CREATE POLICY "Users can insert their own profile" ON profiles FOR INSERT WITH CHECK (auth.uid() = id);
CREATE POLICY "Users can update own profile" ON profiles FOR UPDATE USING (auth.uid() = id);

-- Hackathons & Events
DROP POLICY IF EXISTS "Hackathons are viewable by everyone" ON hackathons;
DROP POLICY IF EXISTS "Events are viewable by everyone" ON events;

CREATE POLICY "Hackathons are viewable by everyone" ON hackathons FOR SELECT USING (true);
CREATE POLICY "Events are viewable by everyone" ON events FOR SELECT USING (true);

-- Applications
DROP POLICY IF EXISTS "Users can view own applications" ON applications;
DROP POLICY IF EXISTS "Users can insert own applications" ON applications;
DROP POLICY IF EXISTS "Users can update own applications" ON applications;

CREATE POLICY "Users can view own applications" ON applications FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own applications" ON applications FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own applications" ON applications FOR UPDATE USING (auth.uid() = user_id);

-- Saved Hackathons
DROP POLICY IF EXISTS "Users can view own saved hackathons" ON saved_hackathons;
DROP POLICY IF EXISTS "Users can save hackathons" ON saved_hackathons;
DROP POLICY IF EXISTS "Users can unsave hackathons" ON saved_hackathons;

CREATE POLICY "Users can view own saved hackathons" ON saved_hackathons FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can save hackathons" ON saved_hackathons FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can unsave hackathons" ON saved_hackathons FOR DELETE USING (auth.uid() = user_id);

-- Notifications
DROP POLICY IF EXISTS "Users can view own notifications" ON notifications;
DROP POLICY IF EXISTS "Users can update own notifications" ON notifications;

CREATE POLICY "Users can view own notifications" ON notifications FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can update own notifications" ON notifications FOR UPDATE USING (auth.uid() = user_id);


-- ==========================================
-- AUTO-CREATE PROFILE TRIGGER
-- ==========================================
-- This function automatically creates a profile when a user signs up.

CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger AS $$
BEGIN
  INSERT INTO public.profiles (id, full_name, email, mobile)
  VALUES (
    new.id, 
    new.raw_user_meta_data->>'full_name', 
    new.email,
    new.raw_user_meta_data->>'mobile'
  );
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger the function on insert to auth.users
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();
