'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { User } from '@/services/auth';

interface HeaderProps {
  user?: User | null;
  onLogout?: () => void;
}

export default function Header({ user: propUser, onLogout }: HeaderProps = {}) {
  const router = useRouter();
  const { user: contextUser, logout: contextLogout } = useAuth();
  const [userName, setUserName] = useState('');
  const [userRole, setUserRole] = useState('');

  // Use prop user first, then context user, then localStorage fallback
  const currentUser = propUser || contextUser;

  useEffect(() => {
    if (currentUser) {
      setUserName(currentUser.fullName || currentUser.username || 'User');
      setUserRole(currentUser.role || 'User');
    } else {
      // Fallback to localStorage
      const name = localStorage.getItem('userName') || 'User';
      const role = localStorage.getItem('userRole') || 'User';
      setUserName(name);
      setUserRole(role);
    }
  }, [currentUser]);

  const handleLogout = async () => {
    try {
      // Use prop logout first, then context logout
      if (onLogout) {
        await onLogout();
      } else if (contextLogout) {
        await contextLogout();
      } else {
        // Fallback to manual localStorage cleanup
        localStorage.removeItem('isLoggedIn');
        localStorage.removeItem('userRole');
        localStorage.removeItem('userEmail');
        localStorage.removeItem('userName');
        localStorage.removeItem('auth_token');
        localStorage.removeItem('user_data');
      }
    } catch (error) {
      console.error('Logout error:', error);
      // Force cleanup even if logout fails
      localStorage.removeItem('isLoggedIn');
      localStorage.removeItem('userRole');
      localStorage.removeItem('userEmail');
      localStorage.removeItem('userName');
      localStorage.removeItem('auth_token');
      localStorage.removeItem('user_data');
    } finally {
      router.push('/login');
    }
  };

  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <div className="flex items-center">
            <h1 className="text-2xl font-bold text-gray-900">Hospital Management System</h1>
          </div>
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <div className="bg-blue-600 text-white w-8 h-8 rounded-full flex items-center justify-center">
                {userName.charAt(0).toUpperCase()}
              </div>
              <div className="flex flex-col">
                <span className="text-gray-900 font-medium">Welcome, {userName}</span>
                {userRole && (
                  <span className="text-xs text-gray-500 capitalize">{userRole}</span>
                )}
              </div>
            </div>
            <button
              onClick={handleLogout}
              className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}