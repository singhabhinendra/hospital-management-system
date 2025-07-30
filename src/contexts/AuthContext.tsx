'use client'

import React, { createContext, useContext, useEffect, useState, ReactNode, useMemo, useCallback } from 'react';
import authService, { User, LoginCredentials, RegisterData } from '@/services/auth';

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (credentials: LoginCredentials) => Promise<void>;
  register: (userData: RegisterData) => Promise<void>;
  logout: () => Promise<void>;
  refreshUser: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [authChecked, setAuthChecked] = useState(false);

  // Memoize computed values
  const isAuthenticated = useMemo(() => !!user && authChecked, [user, authChecked]);

  // Memoize functions to prevent unnecessary re-renders
  const login = useCallback(async (credentials: LoginCredentials) => {
    setIsLoading(true);
    try {
      const authData = await authService.login(credentials);
      setUser(authData.user);
      setAuthChecked(true);
      
      // Ensure the token is properly stored
      if (authData.token) {
        localStorage.setItem('auth_token', authData.token);
      }
    } catch (error) {
      setAuthChecked(true);
      throw error;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const register = useCallback(async (userData: RegisterData) => {
    setIsLoading(true);
    try {
      const authData = await authService.register(userData);
      setUser(authData.user);
      setAuthChecked(true);
      
      // Ensure the token is properly stored
      if (authData.token) {
        localStorage.setItem('auth_token', authData.token);
      }
    } catch (error) {
      setAuthChecked(true);
      throw error;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const logout = useCallback(async () => {
    setIsLoading(true);
    try {
      await authService.logout();
      setUser(null);
      setAuthChecked(true);
      
      // Clear any remaining auth data
      localStorage.removeItem('auth_token');
      localStorage.removeItem('user_data');
    } catch (error) {
      console.error('Logout error:', error);
      // Even if logout fails, clear local state
      setUser(null);
      setAuthChecked(true);
      localStorage.removeItem('auth_token');
      localStorage.removeItem('user_data');
    } finally {
      setIsLoading(false);
    }
  }, []);

  const refreshUser = useCallback(async () => {
    if (!authService.isAuthenticated()) {
      setUser(null);
      setAuthChecked(true);
      return;
    }
    
    try {
      const userData = await authService.getCurrentUser();
      setUser(userData);
      setAuthChecked(true);
      
      // Cache user data for faster subsequent loads
      localStorage.setItem('user_data', JSON.stringify(userData));
    } catch (error) {
      console.error('Failed to refresh user data:', error);
      // If refresh fails, logout user
      await logout();
    }
  }, [logout]);

  // Check if user is already logged in on app start
  useEffect(() => {
    const checkAuth = async () => {
      try {
        // First check if we have a token
        const token = localStorage.getItem('auth_token');
        if (!token) {
          setAuthChecked(true);
          setIsLoading(false);
          return;
        }

        // Check if auth service thinks we're authenticated
        if (authService.isAuthenticated()) {
          // Try to get cached user data first for faster load
          const cachedUserData = localStorage.getItem('user_data');
          if (cachedUserData) {
            try {
              const userData = JSON.parse(cachedUserData);
              setUser(userData);
              setAuthChecked(true);
              setIsLoading(false);
              
              // Refresh user data in background
              refreshUser();
              return;
            } catch (error) {
              console.error('Failed to parse cached user data:', error);
              localStorage.removeItem('user_data');
            }
          }

          // If no cached data, fetch from server
          const userData = await authService.getCurrentUser();
          setUser(userData);
          setAuthChecked(true);
          
          // Cache the user data
          localStorage.setItem('user_data', JSON.stringify(userData));
        } else {
          // Token exists but is invalid, clean up
          localStorage.removeItem('auth_token');
          localStorage.removeItem('user_data');
          setUser(null);
          setAuthChecked(true);
        }
      } catch (error) {
        console.error('Auth check failed:', error);
        // If token is invalid, remove it
        authService.logout();
        localStorage.removeItem('auth_token');
        localStorage.removeItem('user_data');
        setUser(null);
        setAuthChecked(true);
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, [refreshUser]);

  // Handle storage events (when user logs out in another tab)
  useEffect(() => {
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'auth_token' && !e.newValue) {
        // Token was removed in another tab
        setUser(null);
        setAuthChecked(true);
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  // Memoize the context value to prevent unnecessary re-renders
  const value: AuthContextType = useMemo(() => ({
    user,
    isAuthenticated,
    isLoading,
    login,
    register,
    logout,
    refreshUser
  }), [user, isAuthenticated, isLoading, login, register, logout, refreshUser]);

  return (
    <AuthContext.Provider value={value}>
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

export default AuthContext;