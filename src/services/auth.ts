import type { User, LoginCredentials, SignUpData } from '../types';
import { MOCK_USERS } from '../data/users';

const AUTH_KEY = 'nexzen_auth';
const TOKEN_KEY = 'nexzen_token';

// Simulate network delay
const delay = (ms: number) => new Promise((res) => setTimeout(res, ms));

export interface AuthResponse {
  user: User;
  token: string;
}

export interface AuthError {
  message: string;
  field?: string;
}

// ─── Mock Auth Service ────────────────────────────────────
// Replace each function body with real API calls when backend is ready.
// The function signatures and return types MUST stay the same.

export const authService = {
  /**
   * Log in with email/password.
   * TODO: Replace with: POST /api/auth/login
   */
  async login(credentials: LoginCredentials): Promise<AuthResponse> {
    await delay(800);

    // Demo credentials always work
    if (credentials.email === 'demo@nexzen.in') {
      const user = MOCK_USERS[2];
      const token = 'mock_token_' + Date.now();
      return { user, token };
    }

    // Simulate wrong password
    if (credentials.password !== 'password123') {
      throw { message: 'Invalid email or password. Try demo@nexzen.in / password123', field: 'password' } as AuthError;
    }

    const user = MOCK_USERS.find((u) => u.email === credentials.email);
    if (!user) {
      throw { message: 'No account found with this email.', field: 'email' } as AuthError;
    }

    const token = 'mock_token_' + Date.now();
    return { user, token };
  },

  /**
   * Sign up a new user.
   * TODO: Replace with: POST /api/auth/signup
   */
  async signup(data: SignUpData): Promise<AuthResponse> {
    await delay(1000);

    if (data.password !== data.confirmPassword) {
      throw { message: 'Passwords do not match.', field: 'confirmPassword' } as AuthError;
    }

    // Create new mock user
    const newUser: User = {
      id: 'u-' + Date.now(),
      email: data.email,
      fullName: data.fullName,
      mobile: data.mobile,
      avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(data.fullName)}&background=6366F1&color=fff&size=200&bold=true`,
      domains: [],
      skills: [],
      hackathonsParticipated: 0,
      hackathonsWon: 0,
      createdAt: new Date().toISOString(),
    };

    const token = 'mock_token_' + Date.now();
    return { user: newUser, token };
  },

  /**
   * Sign in with Google (mock).
   * TODO: Replace with: Google OAuth2 / Supabase Google Auth
   */
  async signInWithGoogle(): Promise<AuthResponse> {
    await delay(1200);

    const user = MOCK_USERS[0];
    const token = 'mock_google_token_' + Date.now();
    return { user, token };
  },

  /**
   * Send password reset email.
   * TODO: Replace with: POST /api/auth/forgot-password
   */
  async forgotPassword(email: string): Promise<{ message: string }> {
    await delay(800);
    if (!email.includes('@')) {
      throw { message: 'Please enter a valid email address.' } as AuthError;
    }
    return { message: `If an account exists for ${email}, a reset link has been sent.` };
  },

  /**
   * Log out.
   * TODO: Replace with: POST /api/auth/logout (invalidate token)
   */
  async logout(): Promise<void> {
    await delay(200);
    localStorage.removeItem(AUTH_KEY);
    localStorage.removeItem(TOKEN_KEY);
  },

  /**
   * Get the current user from localStorage.
   * TODO: Replace with: GET /api/auth/me (validate token with server)
   */
  getCurrentUser(): User | null {
    try {
      const stored = localStorage.getItem(AUTH_KEY);
      return stored ? JSON.parse(stored) : null;
    } catch {
      return null;
    }
  },

  /**
   * Get the current auth token.
   */
  getToken(): string | null {
    return localStorage.getItem(TOKEN_KEY);
  },

  /**
   * Persist auth state to localStorage.
   */
  persistAuth(user: User, token: string): void {
    localStorage.setItem(AUTH_KEY, JSON.stringify(user));
    localStorage.setItem(TOKEN_KEY, token);
  },

  /**
   * Clear auth state.
   */
  clearAuth(): void {
    localStorage.removeItem(AUTH_KEY);
    localStorage.removeItem(TOKEN_KEY);
  },
};

