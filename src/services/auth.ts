import type { User, LoginCredentials, SignUpData } from '../types';
import { MOCK_USERS } from '../data/users';
import { supabase, hasSupabase } from '../lib/supabase';

const AUTH_KEY = 'nexzen_auth';
const TOKEN_KEY = 'nexzen_token';

const delay = (ms: number) => Promise.resolve();

export interface AuthResponse {
  user: User;
  token: string;
}

export interface AuthError {
  message: string;
  field?: string;
}

export const mapSupabaseUser = (su: any): User => ({
  id: su.id,
  email: su.email || '',
  fullName: su.user_metadata?.full_name || 'NEXZEN User',
  mobile: su.user_metadata?.mobile || '',
  avatar: su.user_metadata?.avatar_url || `https://ui-avatars.com/api/?name=${encodeURIComponent(su.user_metadata?.full_name || 'U')}&background=6366F1&color=fff&size=200&bold=true`,
  domains: [],
  skills: [],
  hackathonsParticipated: 0,
  hackathonsWon: 0,
  createdAt: su.created_at,
});

export const authService = {
  async login(credentials: LoginCredentials): Promise<AuthResponse> {
    if (hasSupabase && supabase) {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: credentials.email,
        password: credentials.password,
      });
      if (error) throw { message: error.message, field: error.message.toLowerCase().includes('password') ? 'password' : 'email' } as AuthError;
      return { user: mapSupabaseUser(data.user), token: data.session?.access_token || '' };
    }

    // Mock Fallback
    await delay(800);
    if (credentials.email === 'demo@nexzen.in') {
      return { user: MOCK_USERS[2], token: 'mock_token_' + Date.now() };
    }
    if (credentials.password !== 'password123') throw { message: 'Invalid email or password. Try demo@nexzen.in / password123', field: 'password' } as AuthError;
    const user = MOCK_USERS.find((u) => u.email === credentials.email);
    if (!user) throw { message: 'No account found with this email.', field: 'email' } as AuthError;
    return { user, token: 'mock_token_' + Date.now() };
  },

  async signup(data: SignUpData): Promise<AuthResponse> {
    if (hasSupabase && supabase) {
      const { data: resData, error } = await supabase.auth.signUp({
        email: data.email,
        password: data.password,
        options: {
          data: {
            full_name: data.fullName,
            mobile: data.mobile,
          }
        }
      });
      if (error) throw { message: error.message } as AuthError;
      if (!resData.user) throw { message: 'Sign up failed.' } as AuthError;
      return { user: mapSupabaseUser(resData.user), token: resData.session?.access_token || '' };
    }

    // Mock Fallback
    await delay(1000);
    if (data.password !== data.confirmPassword) throw { message: 'Passwords do not match.', field: 'confirmPassword' } as AuthError;
    const newUser: User = {
      id: 'u-' + Date.now(),
      email: data.email,
      fullName: data.fullName,
      mobile: data.mobile || '',
      avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(data.fullName)}&background=6366F1&color=fff&size=200&bold=true`,
      domains: [],
      skills: [],
      hackathonsParticipated: 0,
      hackathonsWon: 0,
      createdAt: new Date().toISOString(),
    };
    return { user: newUser, token: 'mock_token_' + Date.now() };
  },

  async signInWithGoogle(): Promise<AuthResponse | null> {
    if (hasSupabase && supabase) {
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: window.location.origin + '/dashboard',
        }
      });
        if (error) throw { message: error.message } as AuthError;
        if (data.url) window.location.assign(data.url);
        return null;
    }

    await delay(1200);
    return { user: MOCK_USERS[0], token: 'mock_google_token_' + Date.now() };
  },

  async signInWithGithub(): Promise<AuthResponse | null> {
    if (hasSupabase && supabase) {
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: 'github',
        options: {
          redirectTo: window.location.origin + '/dashboard',
        }
      });
        if (error) throw { message: error.message } as AuthError;
        if (data.url) window.location.assign(data.url);
        return null;
    }

    await delay(1200);
    return { user: MOCK_USERS[1], token: 'mock_github_token_' + Date.now() };
  },

  async forgotPassword(email: string): Promise<{ message: string }> {
    if (hasSupabase && supabase) {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: window.location.origin + '/reset-password',
      });
      if (error) throw { message: error.message } as AuthError;
      return { message: 'Password reset link sent.' };
    }

    await delay(800);
    if (!email.includes('@')) throw { message: 'Please enter a valid email address.' } as AuthError;
    return { message: `If an account exists for ${email}, a reset link has been sent.` };
  },

  async logout(): Promise<void> {
    if (hasSupabase && supabase) {
      await supabase.auth.signOut();
    } else {
      await delay(200);
    }
    localStorage.removeItem(AUTH_KEY);
    localStorage.removeItem(TOKEN_KEY);
  },

  getCurrentUser(): User | null {
    try {
      const stored = localStorage.getItem(AUTH_KEY);
      return stored ? JSON.parse(stored) : null;
    } catch {
      return null;
    }
  },

  getToken(): string | null {
    return localStorage.getItem(TOKEN_KEY);
  },

  persistAuth(user: User, token: string): void {
    localStorage.setItem(AUTH_KEY, JSON.stringify(user));
    if (token) localStorage.setItem(TOKEN_KEY, token);
  },

  clearAuth(): void {
    localStorage.removeItem(AUTH_KEY);
    localStorage.removeItem(TOKEN_KEY);
  },
};

