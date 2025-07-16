'use client'

import { useAuth } from '@/contexts/AuthContext'

export default function Header() {
  const { user, logout } = useAuth()

  const handleLogout = async () => {
    try {
      await logout()
    } catch (error) {
      console.error('Logout error:', error)
    }
  }

  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-6 md:justify-start md:space-x-10">
          <div className="flex justify-start lg:w-0 lg:flex-1">
            <h1 className="text-2xl font-bold text-gray-900">
              Hospital Management System
            </h1>
          </div>
          <div className="hidden md:flex items-center justify-end md:flex-1 lg:w-0">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-primary-500 rounded-full flex items-center justify-center">
                  <span className="text-white text-sm font-medium">
                    {user?.fullName?.split(' ').map(n => n[0]).join('') || 'U'}
                  </span>
                </div>
                <div className="text-left">
                  <span className="text-sm font-medium text-gray-700 block">
                    {user?.fullName || 'User'}
                  </span>
                  <span className="text-xs text-gray-500 block">
                    {user?.role ? user.role.charAt(0).toUpperCase() + user.role.slice(1) : 'Role'}
                  </span>
                </div>
              </div>
              <button 
                onClick={handleLogout}
                className="bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}
