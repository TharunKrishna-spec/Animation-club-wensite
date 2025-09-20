import React, { createContext, useState, useContext, ReactNode } from 'react';
import type { User } from '../types';

// This informs TypeScript that the `google` object from the Google Identity Services
// script can exist on the `window` object.
declare global {
  interface Window {
    google?: any;
  }
}

interface AuthContextType {
  user: User | null;
  login: (credential: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(() => {
    const storedUser = localStorage.getItem('user');
    try {
      return storedUser ? JSON.parse(storedUser) : null;
    } catch (error) {
      console.error("Failed to parse user from localStorage", error);
      return null;
    }
  });

  const login = (credential: string) => {
    try {
      const decoded: { 
        name: string; 
        email: string; 
        picture: string;
        given_name?: string;
        family_name?: string;
      } = JSON.parse(atob(credential.split('.')[1]));
      const userData: User = {
        name: decoded.name,
        email: decoded.email,
        picture: decoded.picture,
        given_name: decoded.given_name,
        family_name: decoded.family_name,
      };
      localStorage.setItem('user', JSON.stringify(userData));
      setUser(userData);
    } catch (error) {
      console.error("Failed to decode credential:", error);
    }
  };

  const logout = () => {
    localStorage.removeItem('user');
    setUser(null);
    // Also sign out from Google
    if (window.google && window.google.accounts && window.google.accounts.id) {
        window.google.accounts.id.disableAutoSelect();
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};