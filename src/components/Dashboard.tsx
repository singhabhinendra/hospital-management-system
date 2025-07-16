'use client'

import { useState, useEffect } from 'react'

interface DashboardProps {
  onNavigateToSection?: (section: string) => void
}

export default function Dashboard({ onNavigateToSection }: DashboardProps) {
  const [currentTime, setCurrentTime] = useState<string>('')

  useEffect(() => {
    // Set the time only on the client side to avoid hydration mismatch
    setCurrentTime(new Date().toLocaleString())
  }, [])
  const stats = [
    { title: 'Total Patients', value: '1,234', change: '+12%', icon: '👥' },
    { title: 'Doctors Available', value: '89', change: '+3%', icon: '👨‍⚕️' },
    { title: 'Appointments Today', value: '156', change: '+8%', icon: '📅' },
    { title: 'Revenue This Month', value: '$45,678', change: '+15%', icon: '💰' },
  ]

  const recentPatients = [
    { id: 1, name: 'John Doe', age: 45, condition: 'Hypertension', lastVisit: '2024-01-15' },
    { id: 2, name: 'Jane Smith', age: 32, condition: 'Diabetes', lastVisit: '2024-01-14' },
    { id: 3, name: 'Mike Johnson', age: 58, condition: 'Heart Disease', lastVisit: '2024-01-13' },
  ]

  const upcomingAppointments = [
    { id: 1, patient: 'Sarah Wilson', doctor: 'Dr. Brown', time: '10:00 AM', type: 'Consultation' },
    { id: 2, patient: 'Tom Anderson', doctor: 'Dr. Smith', time: '11:30 AM', type: 'Follow-up' },
    { id: 3, patient: 'Lisa Davis', doctor: 'Dr. Johnson', time: '2:00 PM', type: 'Surgery' },
  ]

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <div className="text-sm text-gray-500">
          {currentTime && `Last updated: ${currentTime}`}
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">{stat.title}</p>
                <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
                <p className="text-sm text-green-600 font-medium">{stat.change}</p>
              </div>
              <div className="text-4xl">{stat.icon}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Charts and Tables */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Patients */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Recent Patients</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full table-auto">
              <thead>
                <tr className="bg-gray-50">
                  <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Name</th>
                  <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Age</th>
                  <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Condition</th>
                  <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Last Visit</th>
                </tr>
              </thead>
              <tbody>
                {recentPatients.map((patient) => (
                  <tr key={patient.id} className="border-t">
                    <td className="px-4 py-2 text-sm text-gray-900">{patient.name}</td>
                    <td className="px-4 py-2 text-sm text-gray-600">{patient.age}</td>
                    <td className="px-4 py-2 text-sm text-gray-600">{patient.condition}</td>
                    <td className="px-4 py-2 text-sm text-gray-600">{patient.lastVisit}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Upcoming Appointments */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Today&apos;s Appointments</h2>
          <div className="space-y-4">
            {upcomingAppointments.map((appointment) => (
              <div key={appointment.id} className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
                <div>
                  <p className="font-medium text-gray-900">{appointment.patient}</p>
                  <p className="text-sm text-gray-600">with {appointment.doctor}</p>
                  <p className="text-sm text-gray-500">{appointment.type}</p>
                </div>
                <div className="text-right">
                  <p className="font-medium text-primary-600">{appointment.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Quick Actions</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <button 
            onClick={() => onNavigateToSection?.('patients')}
            className="bg-primary-600 hover:bg-primary-700 text-white p-4 rounded-lg text-center transition-colors"
          >
            <div className="text-2xl mb-2">➕</div>
            <div className="font-medium">Add Patient</div>
          </button>
          <button 
            onClick={() => onNavigateToSection?.('appointments')}
            className="bg-medical-600 hover:bg-medical-700 text-white p-4 rounded-lg text-center transition-colors"
          >
            <div className="text-2xl mb-2">📅</div>
            <div className="font-medium">Schedule Appointment</div>
          </button>
          <button 
            onClick={() => onNavigateToSection?.('reports')}
            className="bg-yellow-600 hover:bg-yellow-700 text-white p-4 rounded-lg text-center transition-colors"
          >
            <div className="text-2xl mb-2">📋</div>
            <div className="font-medium">View Reports</div>
          </button>
          <button 
            onClick={() => onNavigateToSection?.('settings')}
            className="bg-purple-600 hover:bg-purple-700 text-white p-4 rounded-lg text-center transition-colors"
          >
            <div className="text-2xl mb-2">⚙️</div>
            <div className="font-medium">Settings</div>
          </button>
        </div>
      </div>
    </div>
  )
}
