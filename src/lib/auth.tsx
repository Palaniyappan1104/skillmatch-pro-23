// Simple authentication context for SkillMatch+ - Phase 1
// This will be replaced with proper authentication in Phase 2

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { mockUsers, User } from './mockData';

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check for stored user session
    const storedUser = localStorage.getItem('skillmatch-user');
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (error) {
        localStorage.removeItem('skillmatch-user');
      }
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string): Promise<{ success: boolean; error?: string }> => {
    setIsLoading(true);
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Mock authentication - in real app, this would call an API
    const foundUser = mockUsers.find(u => u.email === email);
    
    if (!foundUser) {
      setIsLoading(false);
      return { success: false, error: 'User not found' };
    }
    
    // For demo purposes, accept any password
    if (password.length < 3) {
      setIsLoading(false);
      return { success: false, error: 'Password must be at least 3 characters' };
    }
    
    setUser(foundUser);
    localStorage.setItem('skillmatch-user', JSON.stringify(foundUser));
    setIsLoading(false);
    
    return { success: true };
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('skillmatch-user');
  };

  const value = {
    user,
    login,
    logout,
    isLoading
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

// Demo credentials for easy testing
export const demoCredentials = {
  user: {
    email: 'alex.chen@email.com',
    password: 'demo123'
  },
  admin: {
    email: 'sarah.johnson@skillmatch.com',
    password: 'admin123'
  }
};