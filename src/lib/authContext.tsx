// Authentication context component for SkillMatch+
import React from 'react';
import { AuthProvider } from './auth';

interface AuthWrapperProps {
  children: React.ReactNode;
}

export const AuthWrapper: React.FC<AuthWrapperProps> = ({ children }) => {
  return <AuthProvider>{children}</AuthProvider>;
};