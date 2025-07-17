'use client'

import { useState } from 'react'
import Dashboard from '@/components/Dashboard'
import Sidebar from '@/components/Sidebar'
import Header from '@/components/Header'

export default function Home() {
  const [activeSection, setActiveSection] = useState('dashboard')

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar activeSection={activeSection} setActiveSection={setActiveSection} />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100">
          <div className="container mx-auto px-6 py-8">
            {activeSection === 'dashboard' && <Dashboard />}
            {activeSection === 'patients' && <div>Patients Management</div>}
            {activeSection === 'doctors' && <div>Doctors Management</div>}
            {activeSection === 'appointments' && <div>Appointments</div>}
            {activeSection === 'inventory' && <div>Inventory Management</div>}
            {activeSection === 'billing' && <div>Billing System</div>}
          </div>
        </main>
      </div>
    </div>
  )
}
