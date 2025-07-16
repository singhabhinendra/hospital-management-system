'use client'

import { useState, useEffect } from 'react'

interface Appointment {
  _id: string
  patientId: {
    _id: string
    firstName: string
    lastName: string
    email: string
  }
  doctorId: {
    _id: string
    firstName: string
    lastName: string
    department: string
  }
  appointmentDate: string
  appointmentTime: string
  type: string
  status: string
  notes?: string
  createdAt: string
}

export default function AppointmentsPage() {
  const [appointments, setAppointments] = useState<Appointment[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [showAddForm, setShowAddForm] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const [filterStatus, setFilterStatus] = useState('all')
  const [newAppointment, setNewAppointment] = useState({
    patientId: '',
    doctorId: '',
    appointmentDate: '',
    appointmentTime: '',
    type: 'consultation',
    notes: ''
  })
  const [patients, setPatients] = useState([])
  const [doctors, setDoctors] = useState([])

  // Fetch appointments
  const fetchAppointments = async () => {
    try {
      setIsLoading(true)
      const token = localStorage.getItem('token')
      const response = await fetch('http://localhost:5000/api/v1/appointments', {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      })

      if (response.ok) {
        const data = await response.json()
        setAppointments(data.appointments || [])
      } else {
        console.error('Failed to fetch appointments')
      }
    } catch (error) {
      console.error('Error fetching appointments:', error)
    } finally {
      setIsLoading(false)
    }
  }

  // Fetch patients and doctors for the form
  const fetchPatientsAndDoctors = async () => {
    try {
      const token = localStorage.getItem('token')
      
      // Fetch patients
      const patientsResponse = await fetch('http://localhost:5000/api/v1/patients', {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      })
      
      // Fetch doctors
      const doctorsResponse = await fetch('http://localhost:5000/api/v1/doctors', {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      })

      if (patientsResponse.ok) {
        const patientsData = await patientsResponse.json()
        setPatients(patientsData.patients || [])
      }

      if (doctorsResponse.ok) {
        const doctorsData = await doctorsResponse.json()
        setDoctors(doctorsData.doctors || [])
      }
    } catch (error) {
      console.error('Error fetching patients/doctors:', error)
    }
  }

  useEffect(() => {
    fetchAppointments()
    fetchPatientsAndDoctors()
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const token = localStorage.getItem('token')
      const response = await fetch('http://localhost:5000/api/v1/appointments', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(newAppointment)
      })

      if (response.ok) {
        setShowAddForm(false)
        setNewAppointment({
          patientId: '',
          doctorId: '',
          appointmentDate: '',
          appointmentTime: '',
          type: 'consultation',
          notes: ''
        })
        fetchAppointments()
      } else {
        console.error('Failed to create appointment')
      }
    } catch (error) {
      console.error('Error creating appointment:', error)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setNewAppointment({
      ...newAppointment,
      [e.target.name]: e.target.value
    })
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'scheduled':
        return 'bg-blue-100 text-blue-800'
      case 'completed':
        return 'bg-green-100 text-green-800'
      case 'cancelled':
        return 'bg-red-100 text-red-800'
      case 'no-show':
        return 'bg-gray-100 text-gray-800'
      default:
        return 'bg-yellow-100 text-yellow-800'
    }
  }

  const filteredAppointments = appointments.filter(appointment => {
    const matchesSearch = 
      appointment.patientId.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      appointment.patientId.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      appointment.doctorId.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      appointment.doctorId.lastName.toLowerCase().includes(searchTerm.toLowerCase())
    
    const matchesFilter = filterStatus === 'all' || appointment.status === filterStatus
    
    return matchesSearch && matchesFilter
  })

  const inputClassName = "w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 bg-white placeholder-gray-500"

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-900">Appointments Management</h1>
        <button
          onClick={() => setShowAddForm(true)}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md font-medium transition-colors"
        >
          📅 Schedule New Appointment
        </button>
      </div>

      {/* Search and Filter */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <input
              type="text"
              placeholder="Search appointments by patient or doctor name..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className={inputClassName}
              style={{ color: '#111827', backgroundColor: '#ffffff' }}
            />
          </div>
          <div className="md:w-48">
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className={inputClassName}
              style={{ color: '#111827', backgroundColor: '#ffffff' }}
            >
              <option value="all">All Status</option>
              <option value="scheduled">Scheduled</option>
              <option value="completed">Completed</option>
              <option value="cancelled">Cancelled</option>
              <option value="no-show">No Show</option>
            </select>
          </div>
        </div>
      </div>

      {/* Appointments List */}
      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        {isLoading ? (
          <div className="p-8 text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading appointments...</p>
          </div>
        ) : filteredAppointments.length === 0 ? (
          <div className="p-8 text-center">
            <p className="text-gray-500">No appointments found</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Patient</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Doctor</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date & Time</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredAppointments.map((appointment) => (
                  <tr key={appointment._id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <div className="text-sm font-medium text-gray-900">
                          {appointment.patientId.firstName} {appointment.patientId.lastName}
                        </div>
                        <div className="text-sm text-gray-500">{appointment.patientId.email}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <div className="text-sm font-medium text-gray-900">
                          Dr. {appointment.doctorId.firstName} {appointment.doctorId.lastName}
                        </div>
                        <div className="text-sm text-gray-500">{appointment.doctorId.department}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        {new Date(appointment.appointmentDate).toLocaleDateString()}
                      </div>
                      <div className="text-sm text-gray-500">{appointment.appointmentTime}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900 capitalize">{appointment.type}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(appointment.status)}`}>
                        {appointment.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <button className="text-blue-600 hover:text-blue-900 mr-3">Edit</button>
                      <button className="text-red-600 hover:text-red-900">Cancel</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Add Appointment Modal */}
      {showAddForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-900">Schedule New Appointment</h2>
              <button
                onClick={() => setShowAddForm(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Patient</label>
                  <select
                    name="patientId"
                    value={newAppointment.patientId}
                    onChange={handleChange}
                    required
                    className={inputClassName}
                    style={{ color: '#111827', backgroundColor: '#ffffff' }}
                  >
                    <option value="">Select Patient</option>
                    {patients.map((patient: any) => (
                      <option key={patient._id} value={patient._id}>
                        {patient.firstName} {patient.lastName}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Doctor</label>
                  <select
                    name="doctorId"
                    value={newAppointment.doctorId}
                    onChange={handleChange}
                    required
                    className={inputClassName}
                    style={{ color: '#111827', backgroundColor: '#ffffff' }}
                  >
                    <option value="">Select Doctor</option>
                    {doctors.map((doctor: any) => (
                      <option key={doctor._id} value={doctor._id}>
                        Dr. {doctor.firstName} {doctor.lastName} - {doctor.department}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Date</label>
                  <input
                    type="date"
                    name="appointmentDate"
                    value={newAppointment.appointmentDate}
                    onChange={handleChange}
                    required
                    className={inputClassName}
                    style={{ color: '#111827', backgroundColor: '#ffffff' }}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Time</label>
                  <input
                    type="time"
                    name="appointmentTime"
                    value={newAppointment.appointmentTime}
                    onChange={handleChange}
                    required
                    className={inputClassName}
                    style={{ color: '#111827', backgroundColor: '#ffffff' }}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Type</label>
                  <select
                    name="type"
                    value={newAppointment.type}
                    onChange={handleChange}
                    className={inputClassName}
                    style={{ color: '#111827', backgroundColor: '#ffffff' }}
                  >
                    <option value="consultation">Consultation</option>
                    <option value="follow-up">Follow-up</option>
                    <option value="surgery">Surgery</option>
                    <option value="emergency">Emergency</option>
                    <option value="routine-checkup">Routine Checkup</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Notes (Optional)</label>
                <textarea
                  name="notes"
                  value={newAppointment.notes}
                  onChange={handleChange}
                  rows={3}
                  className={inputClassName}
                  style={{ color: '#111827', backgroundColor: '#ffffff' }}
                  placeholder="Additional notes or instructions..."
                />
              </div>

              <div className="flex justify-end space-x-4">
                <button
                  type="button"
                  onClick={() => setShowAddForm(false)}
                  className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                >
                  Schedule Appointment
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
