import { useState, useEffect, useCallback } from 'react';

export type UserRole = 'admin' | 'paula';

export interface DashUser {
  id: string;
  name: string;
  email: string;
  role: UserRole;
}

interface AuthState {
  user: DashUser | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}

// Hardcoded credentials for MVP
const USERS: { identifier: string; password: string; user: DashUser }[] = [
  {
    identifier: 'parmasampa@gmail.com',
    password: 'Nomade163',
    user: {
      id: '1',
      name: 'Admin',
      email: 'parmasampa@gmail.com',
      role: 'admin',
    },
  },
  {
    identifier: 'paulaoraculos@gmail.com',
    password: 'desperta',
    user: {
      id: '2',
      name: 'Paula Oráculos',
      email: 'paulaoraculos@gmail.com',
      role: 'paula',
    },
  },
  {
    identifier: '559284916098',
    password: 'Paula Oráculos',
    user: {
      id: '3',
      name: 'Paula Oráculos',
      email: '559284916098',
      role: 'paula',
    },
  },
];

const STORAGE_KEY = 'dash_auth_session';

export const useDashAuth = () => {
  const [state, setState] = useState<AuthState>({
    user: null,
    isAuthenticated: false,
    isLoading: true,
  });

  // Load session from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        const user = JSON.parse(stored) as DashUser;
        setState({ user, isAuthenticated: true, isLoading: false });
      } catch {
        localStorage.removeItem(STORAGE_KEY);
        setState({ user: null, isAuthenticated: false, isLoading: false });
      }
    } else {
      setState({ user: null, isAuthenticated: false, isLoading: false });
    }
  }, []);

  const login = useCallback((identifier: string, password: string): { success: boolean; error?: string } => {
    const found = USERS.find(
      (u) => u.identifier.toLowerCase() === identifier.toLowerCase() && u.password === password
    );

    if (found) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(found.user));
      setState({ user: found.user, isAuthenticated: true, isLoading: false });
      return { success: true };
    }

    return { success: false, error: 'Credenciais inválidas. Verifique email/telefone e senha.' };
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem(STORAGE_KEY);
    setState({ user: null, isAuthenticated: false, isLoading: false });
  }, []);

  const hasRole = useCallback((role: UserRole): boolean => {
    if (!state.user) return false;
    // Admin has access to everything
    if (state.user.role === 'admin') return true;
    return state.user.role === role;
  }, [state.user]);

  const isAdmin = useCallback((): boolean => {
    return state.user?.role === 'admin';
  }, [state.user]);

  return {
    user: state.user,
    isAuthenticated: state.isAuthenticated,
    isLoading: state.isLoading,
    login,
    logout,
    hasRole,
    isAdmin,
  };
};
