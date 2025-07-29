'use client'

import { useAuth } from '@/contexts/AuthContext'
import { useRouter } from 'next/navigation'

export default function Header() {
  const { user, logout } = useAuth()
  const router = useRouter()

  const handleLogout = async () => {
    try {
      await logout()
      // Force redirect to login page
      router.push('/login')
    } catch (error) {
      console.error('Logout error:', error)
    }
  }

  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <div className="flex justify-start">
            <h1 className="text-xl md:text-2xl font-bold text-gray-900">
              Hospital Management System
            </h1>
          </div>
          <div className="flex items-center space-x-2 md:space-x-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                <span className="text-white text-sm font-medium">
                  {user?.fullName?.split(' ').map(n => n[0]).join('') || 'U'}
                </span>
              </div>
              <div className="hidden sm:block text-left">
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
              className="bg-red-600 hover:bg-red-700 text-white px-3 py-2 md:px-4 rounded-md text-xs md:text-sm font-medium transition-colors flex items-center space-x-1"
            >
              <span>🚪</span>
              <span className="hidden sm:inline">Logout</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  )
}
