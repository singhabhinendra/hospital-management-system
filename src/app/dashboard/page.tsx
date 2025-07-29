'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/contexts/AuthContext'
import Dashboard from '@/components/Dashboard'
import Sidebar from '@/components/Sidebar'
import Header from '@/components/Header'
import PatientsPage from '../patients/page'
import DoctorsPage from '../doctors/page'
import AppointmentsPage from '../appointments/page'
import InventoryPage from '../inventory/page'
import BillingPage from '../billing/page'
import ReportsPage from '../reports/page'
import SettingsPage from '../settings/page'

export default function DashboardLayout() {
  const { isAuthenticated, isLoading } = useAuth()
  const router = useRouter()
  const [activeSection, setActiveSection] = useState('dashboard')

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push('/')
    }
  }, [isAuthenticated, isLoading, router])

  // Show loading spinner while checking authentication
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading Dashboard...</p>
        </div>
      </div>
    )
  }

  // Don't render the main app if not authenticated
  if (!isAuthenticated) {
    return null
  }

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar activeSection={activeSection} setActiveSection={setActiveSection} />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100">
          <div className="container mx-auto px-6 py-8">
            {activeSection === 'dashboard' && <Dashboard onNavigateToSection={setActiveSection} />}
            {activeSection === 'patients' && <PatientsPage />}
            {activeSection === 'doctors' && <DoctorsPage />}
            {activeSection === 'appointments' && <AppointmentsPage />}
            {activeSection === 'inventory' && <InventoryPage />}
            {activeSection === 'billing' && <BillingPage />}
            {activeSection === 'reports' && <ReportsPage />}
            {activeSection === 'settings' && <SettingsPage />}
          </div>
        </main>
      </div>
    </div>
  )
}
