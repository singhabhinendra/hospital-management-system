'use client'

import { useRouter, usePathname } from 'next/navigation'

interface SidebarProps {
  activeSection: string
  setActiveSection: (section: string) => void
}

export default function Sidebar({ activeSection, setActiveSection }: SidebarProps) {
  const router = useRouter()
  const pathname = usePathname()

  const menuItems = [
    { id: 'dashboard', name: 'Dashboard', icon: '📊', path: '/dashboard' },
    { id: 'patients', name: 'Patients', icon: '👥', path: '/patients' },
    { id: 'doctors', name: 'Doctors', icon: '👨‍⚕️', path: '/doctors' },
    { id: 'appointments', name: 'Appointments', icon: '📅', path: '/appointments' },
    { id: 'inventory', name: 'Inventory', icon: '📦', path: '/inventory' },
    { id: 'billing', name: 'Billing', icon: '💰', path: '/billing' },
    { id: 'reports', name: 'Reports', icon: '📋', path: '/reports' },
    { id: 'settings', name: 'Settings', icon: '⚙️', path: '/settings' },
  ]

  const handleNavigation = (item: typeof menuItems[0]) => {
    // Update local state for immediate UI feedback
    setActiveSection(item.id)
    // Navigate to the actual route
    router.push(item.path)
  }

  const isActive = (item: typeof menuItems[0]) => {
    // Check both pathname and activeSection for accuracy
    return pathname === item.path || activeSection === item.id
  }

  return (
    <div className="bg-white w-64 min-h-screen shadow-lg">
      <div className="p-6">
        <h2 className="text-2xl font-bold text-blue-600 mb-8">
          🏥 HMS
        </h2>
        <nav>
          <ul className="space-y-2">
            {menuItems.map((item) => (
              <li key={item.id}>
                <button
                  onClick={() => handleNavigation(item)}
                  className={`w-full text-left px-4 py-3 rounded-lg flex items-center space-x-3 transition-colors ${
                    isActive(item)
                      ? 'bg-blue-100 text-blue-700 border-r-4 border-blue-600'
                      : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  <span className="text-xl">{item.icon}</span>
                  <span className="font-medium">{item.name}</span>
                </button>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </div>
  )
}
