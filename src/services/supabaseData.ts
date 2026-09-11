import { supabase } from '../lib/supabase';
import type { Hackathon, Event, User } from '../types';

export const supabaseData = {
  async getFeaturedHackathons(): Promise<Hackathon[]> {
    if (!supabase) return [];

    const { data, error } = await supabase.from('hackathons').select('*').eq('featured', true).limit(6);
    if (error) throw error;
    return (data ?? []) as Hackathon[];
  },

  async getFeaturedEvents(): Promise<Event[]> {
    if (!supabase) return [];

    const { data, error } = await supabase.from('events').select('*').eq('featured', true).limit(3);
    if (error) throw error;
    return (data ?? []) as Event[];
  },

  async getCurrentUserProfile(userId: string): Promise<User | null> {
    if (!supabase) return null;

    const { data, error } = await supabase.from('profiles').select('*').eq('id', userId).single();
    if (error) {
      if (error.code === 'PGRST116') return null;
      throw error;
    }

    return data as User | null;
  },
};
