import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import type { User, LoginCredentials, SignUpData } from '../types';
import { authService } from '../services/auth';

interface AuthContextValue {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (credentials: LoginCredentials) => Promise<void>;
  signup: (data: SignUpData) => Promise<void>;
  signInWithGoogle: () => Promise<void>;
  logout: () => Promise<void>;
  updateUser: (updates: Partial<User>) => void;
}

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Restore session from localStorage
    const stored = authService.getCurrentUser();
    if (stored) setUser(stored);
    setIsLoading(false);
  }, []);

  const login = useCallback(async (credentials: LoginCredentials) => {
    const { user, token } = await authService.login(credentials);
    authService.persistAuth(user, token);
    setUser(user);
  }, []);

  const signup = useCallback(async (data: SignUpData) => {
    const { user, token } = await authService.signup(data);
    authService.persistAuth(user, token);
    setUser(user);
  }, []);

  const signInWithGoogle = useCallback(async () => {
    const { user, token } = await authService.signInWithGoogle();
    authService.persistAuth(user, token);
    setUser(user);
  }, []);

  const logout = useCallback(async () => {
    await authService.logout();
    authService.clearAuth();
    setUser(null);
  }, []);

  const updateUser = useCallback((updates: Partial<User>) => {
    if (!user) return;
    const updated = { ...user, ...updates };
    setUser(updated);
    authService.persistAuth(updated, authService.getToken() || '');
  }, [user]);

  return (
    <AuthContext.Provider value={{ user, isAuthenticated: !!user, isLoading, login, signup, signInWithGoogle, logout, updateUser }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used inside AuthProvider');
  return ctx;
}
