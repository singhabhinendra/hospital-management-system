'use client'

interface SidebarProps {
  activeSection: string
  setActiveSection: (section: string) => void
}

export default function Sidebar({ activeSection, setActiveSection }: SidebarProps) {
  const menuItems = [
    { id: 'dashboard', name: 'Dashboard', icon: '📊' },
    { id: 'patients', name: 'Patients', icon: '👥' },
    { id: 'doctors', name: 'Doctors', icon: '👨‍⚕️' },
    { id: 'appointments', name: 'Appointments', icon: '📅' },
    { id: 'inventory', name: 'Inventory', icon: '📦' },
    { id: 'billing', name: 'Billing', icon: '💰' },
    { id: 'reports', name: 'Reports', icon: '📋' },
    { id: 'settings', name: 'Settings', icon: '⚙️' },
  ]

  return (
    <div className="bg-white w-64 min-h-screen shadow-lg">
      <div className="p-6">
        <h2 className="text-2xl font-bold text-primary-600 mb-8">
          🏥 HMS
        </h2>
        <nav>
          <ul className="space-y-2">
            {menuItems.map((item) => (
              <li key={item.id}>
                <button
                  onClick={() => setActiveSection(item.id)}
                  className={`w-full text-left px-4 py-3 rounded-lg flex items-center space-x-3 transition-colors ${
                    activeSection === item.id
                      ? 'bg-primary-100 text-primary-700 border-r-4 border-primary-600'
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
