import { createContext, useContext, useState, ReactNode } from 'react';

export type UserRole = 'CUSTOMER' | 'MERCHANT' | 'ADMIN' | 'DRIVER';

export interface User {
  name: string;
  email: string;
  memberSince: string;
  membership: {
    status: string;
    tier: string;
    nextBilling: string;
  };
  role: UserRole;
  isWholesale: boolean; // Keep for backward compatibility or specific wholesale flag
  merchantStatus?: 'PENDING' | 'APPROVED' | 'REJECTED';
}

interface AuthContextType {
  user: User | null;
  login: (userData: User) => void;
  logout: () => void;
  updateUser: (userData: Partial<User>) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  const login = (userData: User) => setUser(userData);
  const logout = () => setUser(null);
  const updateUser = (userData: Partial<User>) => {
    setUser(prev => prev ? { ...prev, ...userData } : null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, updateUser }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
