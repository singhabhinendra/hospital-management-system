'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function DashboardPage() {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [userName, setUserName] = useState('');
  const [currentPage, setCurrentPage] = useState('dashboard');

  useEffect(() => {
    // Check if user is logged in
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    const name = localStorage.getItem('userName') || 'User';
    
    if (isLoggedIn === 'true') {
      setIsAuthenticated(true);
      setUserName(name);
    } else {
      router.push('/login');
    }
    setLoading(false);
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('userRole');
    localStorage.removeItem('userEmail');
    localStorage.removeItem('userName');
    router.push('/login');
  };

  const handleHomeRedirect = () => {
    router.push('/landing');
  };

  const handlePageChange = (page: string) => {
    setCurrentPage(page);
    // Navigate to specific pages when implemented
    if (page !== 'dashboard') {
      router.push(`/${page}`);
    }
  };

  const menuItems = [
    { id: 'dashboard', name: 'Dashboard', icon: '📊', description: 'Overview & Statistics' },
    { id: 'patients', name: 'Patients', icon: '👥', description: 'Patient Management' },
    { id: 'doctors', name: 'Doctors', icon: '👨‍⚕️', description: 'Doctor Management' },
    { id: 'appointments', name: 'Appointments', icon: '📅', description: 'Appointment Scheduling' },
    { id: 'inventory', name: 'Inventory', icon: '💊', description: 'Medical Inventory' },
    { id: 'billing', name: 'Billing', icon: '💳', description: 'Billing & Payments' },
    { id: 'signup', name: 'User Registration', icon: '📝', description: 'Register New Users' },
    { id: 'landing', name: 'Home Page', icon: '🏠', description: 'Back to Landing' },
  ];

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-100 flex">
      {/* Sidebar */}
      <div className="bg-white w-64 shadow-lg">
        <div className="p-6">
          <div className="flex items-center cursor-pointer" onClick={handleHomeRedirect}>
            <div className="bg-blue-600 text-white p-2 rounded-lg mr-3 hover:bg-blue-700 transition-colors">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z" clipRule="evenodd" />
              </svg>
            </div>
            <h2 className="text-lg font-bold text-gray-900 hover:text-blue-600 transition-colors">
              Hospital HMS
            </h2>
          </div>
        </div>

        <nav className="mt-6">
          {menuItems.map((item) => (
            <div
              key={item.id}
              onClick={() => handlePageChange(item.id)}
              className={`flex items-center px-6 py-3 text-gray-700 hover:bg-blue-50 hover:text-blue-600 cursor-pointer transition-colors ${
                currentPage === item.id ? 'bg-blue-50 text-blue-600 border-r-2 border-blue-600' : ''
              }`}
            >
              <span className="text-xl mr-3">{item.icon}</span>
              <div>
                <div className="font-medium">{item.name}</div>
                <div className="text-xs text-gray-500">{item.description}</div>
              </div>
            </div>
          ))}
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="bg-white shadow-sm border-b border-gray-200">
          <div className="px-6 py-4">
            <div className="flex justify-between items-center">
              <div>
                <h1 className="text-2xl font-bold text-gray-900 capitalize">
                  {currentPage === 'dashboard' ? 'Dashboard Overview' : currentPage}
                </h1>
                <p className="text-sm text-gray-600">
                  {menuItems.find(item => item.id === currentPage)?.description}
                </p>
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

        {/* Page Content */}
        <main className="flex-1 p-6">
          {currentPage === 'dashboard' && (
            <div>
              {/* Stats Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <div className="bg-white overflow-hidden shadow rounded-lg hover:shadow-md transition-shadow">
                  <div className="p-5">
                    <div className="flex items-center">
                      <div className="flex-shrink-0">
                        <div className="text-3xl">👥</div>
                      </div>
                      <div className="ml-5 w-0 flex-1">
                        <dl>
                          <dt className="text-sm font-medium text-gray-500 truncate">Total Patients</dt>
                          <dd className="text-2xl font-bold text-gray-900">1,234</dd>
                        </dl>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-white overflow-hidden shadow rounded-lg hover:shadow-md transition-shadow">
                  <div className="p-5">
                    <div className="flex items-center">
                      <div className="flex-shrink-0">
                        <div className="text-3xl">👨‍⚕️</div>
                      </div>
                      <div className="ml-5 w-0 flex-1">
                        <dl>
                          <dt className="text-sm font-medium text-gray-500 truncate">Doctors</dt>
                          <dd className="text-2xl font-bold text-gray-900">56</dd>
                        </dl>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-white overflow-hidden shadow rounded-lg hover:shadow-md transition-shadow">
                  <div className="p-5">
                    <div className="flex items-center">
                      <div className="flex-shrink-0">
                        <div className="text-3xl">📅</div>
                      </div>
                      <div className="ml-5 w-0 flex-1">
                        <dl>
                          <dt className="text-sm font-medium text-gray-500 truncate">Today &apos Appointments</dt>
                          <dd className="text-2xl font-bold text-gray-900">89</dd>
                        </dl>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-white overflow-hidden shadow rounded-lg hover:shadow-md transition-shadow">
                  <div className="p-5">
                    <div className="flex items-center">
                      <div className="flex-shrink-0">
                        <div className="text-3xl">💊</div>
                      </div>
                      <div className="ml-5 w-0 flex-1">
                        <dl>
                          <dt className="text-sm font-medium text-gray-500 truncate">Medicines in Stock</dt>
                          <dd className="text-2xl font-bold text-gray-900">2,456</dd>
                        </dl>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Quick Actions */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                <div className="bg-white p-6 rounded-lg shadow">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
                  <div className="grid grid-cols-2 gap-4">
                    {menuItems.slice(1, 5).map((item) => (
                      <button
                        key={item.id}
                        onClick={() => handlePageChange(item.id)}
                        className="flex flex-col items-center p-4 border-2 border-gray-200 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-colors"
                      >
                        <span className="text-2xl mb-2">{item.icon}</span>
                        <span className="text-sm font-medium text-gray-700">{item.name}</span>
                      </button>
                    ))}
                  </div>
                </div>

                <div className="bg-white p-6 rounded-lg shadow">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">System Status</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Server Status</span>
                      <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">Online</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Database</span>
                      <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">Connected</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Last Backup</span>
                      <span className="text-sm text-gray-500">2 hours ago</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Active Users</span>
                      <span className="text-sm text-gray-900 font-medium">24</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Recent Activity */}
              <div className="bg-white shadow rounded-lg">
                <div className="px-6 py-4 border-b border-gray-200">
                  <h3 className="text-lg leading-6 font-medium text-gray-900">Recent Activity</h3>
                  <p className="mt-1 text-sm text-gray-500">Latest updates in your hospital</p>
                </div>
                <ul className="divide-y divide-gray-200">
                  <li className="px-6 py-4 hover:bg-gray-50">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10">
                          <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                            <span className="text-blue-600 font-medium">JD</span>
                          </div>
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">New patient registered</div>
                          <div className="text-sm text-gray-500">John Doe - ID: PAT001234</div>
                        </div>
                      </div>
                      <div className="text-sm text-gray-500">2 minutes ago</div>
                    </div>
                  </li>
                  <li className="px-6 py-4 hover:bg-gray-50">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10">
                          <div className="h-10 w-10 rounded-full bg-green-100 flex items-center justify-center">
                            <span className="text-green-600 font-medium">✓</span>
                          </div>
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">Appointment completed</div>
                          <div className="text-sm text-gray-500">Dr. Smith with Sarah Johnson</div>
                        </div>
                      </div>
                      <div className="text-sm text-gray-500">15 minutes ago</div>
                    </div>
                  </li>
                  <li className="px-6 py-4 hover:bg-gray-50">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10">
                          <div className="h-10 w-10 rounded-full bg-yellow-100 flex items-center justify-center">
                            <span className="text-yellow-600 font-medium">⚠</span>
                          </div>
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">Low inventory alert</div>
                          <div className="text-sm text-gray-500">Paracetamol - Only 10 units left</div>
                        </div>
                      </div>
                      <div className="text-sm text-gray-500">1 hour ago</div>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          )}

          {/* Placeholder for other pages */}
          {currentPage !== 'dashboard' && (
            <div className="bg-white rounded-lg shadow p-6">
              <div className="text-center">
                <div className="text-6xl mb-4">
                  {menuItems.find(item => item.id === currentPage)?.icon}
                </div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2 capitalize">
                  {currentPage} Management
                </h2>
                <p className="text-gray-600 mb-4">
                  {menuItems.find(item => item.id === currentPage)?.description}
                </p>
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <p className="text-blue-800">
                    This page will redirect to /{currentPage} when you implement the specific module.
                  </p>
                  <button
                    onClick={() => router.push(`/${currentPage}`)}
                    className="mt-2 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors"
                  >
                    Go to {currentPage.charAt(0).toUpperCase() + currentPage.slice(1)} Page
                  </button>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}