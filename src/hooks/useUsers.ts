import { useState, useCallback } from 'react';
import type { UserRole } from './useDashAuth';

export interface DashUserItem {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  createdAt: string;
}

// Mock data (in production, this would come from Supabase)
const MOCK_USERS: DashUserItem[] = [
  {
    id: '1',
    name: 'Admin',
    email: 'parmasampa@gmail.com',
    role: 'admin',
    createdAt: '2024-01-01T00:00:00Z',
  },
  {
    id: '2',
    name: 'Paula Oráculos',
    email: 'paulaoraculos@gmail.com',
    role: 'paula',
    createdAt: '2024-01-01T00:00:00Z',
  },
  {
    id: '3',
    name: 'Paula (Phone)',
    email: '559284916098',
    role: 'paula',
    createdAt: '2024-01-01T00:00:00Z',
  },
];

export const useUsers = () => {
  const [users, setUsers] = useState<DashUserItem[]>(MOCK_USERS);

  const addUser = useCallback((user: Omit<DashUserItem, 'id' | 'createdAt'>) => {
    const newUser: DashUserItem = {
      ...user,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
    };
    setUsers(prev => [...prev, newUser]);
    return newUser;
  }, []);

  const deleteUser = useCallback((id: string) => {
    // Prevent deleting the main admin
    if (id === '1') return false;
    setUsers(prev => prev.filter(u => u.id !== id));
    return true;
  }, []);

  const updateUser = useCallback((id: string, updates: Partial<DashUserItem>) => {
    setUsers(prev => prev.map(u => u.id === id ? { ...u, ...updates } : u));
  }, []);

  return {
    users,
    addUser,
    deleteUser,
    updateUser,
  };
};
