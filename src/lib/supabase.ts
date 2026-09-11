import { createClient, type SupabaseClient } from '@supabase/supabase-js';

const supabaseUrl = (import.meta.env.VITE_SUPABASE_URL as string | undefined)?.trim();
const supabaseAnonKey = (import.meta.env.VITE_SUPABASE_ANON_KEY as string | undefined)?.trim();

export const supabase: SupabaseClient | null = supabaseUrl && supabaseAnonKey
  ? createClient(supabaseUrl, supabaseAnonKey, {
      auth: {
        persistSession: true,
        autoRefreshToken: true,
        detectSessionInUrl: true,
      },
    })
  : null;

export const hasSupabase = Boolean(supabase);

export function getSupabaseSetupHint(): string | null {
  if (hasSupabase) return null;
  return 'Add VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY to enable Supabase backend connectivity.';
}
