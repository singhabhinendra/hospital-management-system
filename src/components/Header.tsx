'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function Header() {
  const router = useRouter();
  const [userName, setUserName] = useState('');

  useEffect(() => {
    const name = localStorage.getItem('userName') || 'User';
    setUserName(name);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('userRole');
    localStorage.removeItem('userEmail');
    localStorage.removeItem('userName');
    router.push('/login');
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
              <span className="text-gray-700">Welcome, {userName}</span>
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