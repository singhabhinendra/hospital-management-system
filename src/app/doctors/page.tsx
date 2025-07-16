'use client'

import { useState, useEffect } from 'react'

interface Doctor {
  _id: string
  firstName: string
  lastName: string
  email: string
  phone: string
  employeeId: string
  department: string
  specialization: string
  qualification: string
  experience: number
  consultationFee: number
  status: string
  schedule: {
    [key: string]: {
      start: string
      end: string
      isAvailable: boolean
    }
  }
  createdAt: string
}

export default function DoctorsPage() {
  const [doctors, setDoctors] = useState<Doctor[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [showAddForm, setShowAddForm] = useState(false)
  const [editingDoctor, setEditingDoctor] = useState<Doctor | null>(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [filterDepartment, setFilterDepartment] = useState('all')
  const [newDoctor, setNewDoctor] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    department: '',
    specialization: '',
    qualification: '',
    experience: '',
    consultationFee: '',
    schedule: {
      monday: { start: '09:00', end: '17:00', isAvailable: true },
      tuesday: { start: '09:00', end: '17:00', isAvailable: true },
      wednesday: { start: '09:00', end: '17:00', isAvailable: true },
      thursday: { start: '09:00', end: '17:00', isAvailable: true },
      friday: { start: '09:00', end: '17:00', isAvailable: true },
      saturday: { start: '09:00', end: '13:00', isAvailable: false },
      sunday: { start: '09:00', end: '13:00', isAvailable: false }
    }
  })

  const departments = [
    'Cardiology', 'Neurology', 'Orthopedics', 'Pediatrics', 'Emergency',
    'Radiology', 'Pathology', 'Surgery', 'Internal Medicine', 'Psychiatry'
  ]

  const specializations = {
    'Cardiology': ['Interventional Cardiology', 'Cardiac Surgery', 'Electrophysiology'],
    'Neurology': ['Neurological Surgery', 'Stroke Care', 'Epilepsy'],
    'Orthopedics': ['Joint Replacement', 'Sports Medicine', 'Spine Surgery'],
    'Pediatrics': ['Neonatology', 'Pediatric Surgery', 'Child Development'],
    'Emergency': ['Trauma Care', 'Critical Care', 'Emergency Medicine'],
    'Radiology': ['Diagnostic Imaging', 'Interventional Radiology', 'Nuclear Medicine'],
    'Pathology': ['Clinical Pathology', 'Anatomical Pathology', 'Molecular Pathology'],
    'Surgery': ['General Surgery', 'Laparoscopic Surgery', 'Vascular Surgery'],
    'Internal Medicine': ['Gastroenterology', 'Endocrinology', 'Rheumatology'],
    'Psychiatry': ['Child Psychiatry', 'Addiction Medicine', 'Geriatric Psychiatry']
  }

  // Fetch doctors
  const fetchDoctors = async () => {
    try {
      setIsLoading(true)
      const token = localStorage.getItem('token')
      const response = await fetch('http://localhost:5000/api/v1/doctors?limit=50', {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      })

      if (response.ok) {
        const data = await response.json()
        setDoctors(data.data?.doctors || [])
      } else {
        console.error('Failed to fetch doctors')
      }
    } catch (error) {
      console.error('Error fetching doctors:', error)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchDoctors()
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const token = localStorage.getItem('token')
      const doctorData = {
        ...newDoctor,
        experience: parseInt(newDoctor.experience),
        consultationFee: parseFloat(newDoctor.consultationFee)
      }

      const url = editingDoctor 
        ? `http://localhost:5000/api/v1/doctors/${editingDoctor._id}`
        : 'http://localhost:5000/api/v1/doctors'
      
      const method = editingDoctor ? 'PUT' : 'POST'

      const response = await fetch(url, {
        method,
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(doctorData)
      })

      if (response.ok) {
        setShowAddForm(false)
        setEditingDoctor(null)
        setNewDoctor({
          firstName: '', lastName: '', email: '', phone: '', department: '',
          specialization: '', qualification: '', experience: '', consultationFee: '',
          schedule: {
            monday: { start: '09:00', end: '17:00', isAvailable: true },
            tuesday: { start: '09:00', end: '17:00', isAvailable: true },
            wednesday: { start: '09:00', end: '17:00', isAvailable: true },
            thursday: { start: '09:00', end: '17:00', isAvailable: true },
            friday: { start: '09:00', end: '17:00', isAvailable: true },
            saturday: { start: '09:00', end: '13:00', isAvailable: false },
            sunday: { start: '09:00', end: '13:00', isAvailable: false }
          }
        })
        fetchDoctors()
      } else {
        console.error('Failed to save doctor')
      }
    } catch (error) {
      console.error('Error saving doctor:', error)
    }
  }

  const handleEdit = (doctor: Doctor) => {
    setEditingDoctor(doctor)
    setNewDoctor({
      firstName: doctor.firstName,
      lastName: doctor.lastName,
      email: doctor.email,
      phone: doctor.phone,
      department: doctor.department,
      specialization: doctor.specialization,
      qualification: doctor.qualification,
      experience: doctor.experience.toString(),
      consultationFee: doctor.consultationFee.toString(),
      schedule: doctor.schedule || {
        monday: { start: '09:00', end: '17:00', isAvailable: true },
        tuesday: { start: '09:00', end: '17:00', isAvailable: true },
        wednesday: { start: '09:00', end: '17:00', isAvailable: true },
        thursday: { start: '09:00', end: '17:00', isAvailable: true },
        friday: { start: '09:00', end: '17:00', isAvailable: true },
        saturday: { start: '09:00', end: '13:00', isAvailable: false },
        sunday: { start: '09:00', end: '13:00', isAvailable: false }
      }
    })
    setShowAddForm(true)
  }

  const handleDelete = async (doctorId: string) => {
    if (!confirm('Are you sure you want to delete this doctor?')) return

    try {
      const token = localStorage.getItem('token')
      const response = await fetch(`http://localhost:5000/api/v1/doctors/${doctorId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      })

      if (response.ok) {
        fetchDoctors()
      }
    } catch (error) {
      console.error('Error deleting doctor:', error)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setNewDoctor({
      ...newDoctor,
      [e.target.name]: e.target.value
    })
  }

  const handleScheduleChange = (day: string, field: string, value: string | boolean) => {
    setNewDoctor({
      ...newDoctor,
      schedule: {
        ...newDoctor.schedule,
        [day]: {
          ...newDoctor.schedule[day],
          [field]: value
        }
      }
    })
  }

  const filteredDoctors = doctors.filter(doctor => {
    const matchesSearch = 
      doctor.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doctor.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doctor.department.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doctor.specialization.toLowerCase().includes(searchTerm.toLowerCase())
    
    const matchesDepartment = filterDepartment === 'all' || doctor.department === filterDepartment
    
    return matchesSearch && matchesDepartment
  })

  const inputClassName = "w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 bg-white placeholder-gray-500"

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-900">Doctors Management</h1>
        <button
          onClick={() => {setShowAddForm(true); setEditingDoctor(null)}}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md font-medium transition-colors"
        >
          👨‍⚕️ Add New Doctor
        </button>
      </div>

      {/* Search and Filter */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <input
              type="text"
              placeholder="Search doctors by name, department, or specialization..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className={inputClassName}
              style={{ color: '#111827', backgroundColor: '#ffffff' }}
            />
          </div>
          <div className="md:w-48">
            <select
              value={filterDepartment}
              onChange={(e) => setFilterDepartment(e.target.value)}
              className={inputClassName}
              style={{ color: '#111827', backgroundColor: '#ffffff' }}
            >
              <option value="all">All Departments</option>
              {departments.map(dept => (
                <option key={dept} value={dept}>{dept}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Total Doctors</p>
              <p className="text-3xl font-bold text-blue-600">{doctors.length}</p>
            </div>
            <div className="text-blue-500 text-3xl">👨‍⚕️</div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Available Today</p>
              <p className="text-3xl font-bold text-green-600">{doctors.filter(d => d.status === 'active').length}</p>
            </div>
            <div className="text-green-500 text-3xl">✅</div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Departments</p>
              <p className="text-3xl font-bold text-purple-600">{new Set(doctors.map(d => d.department)).size}</p>
            </div>
            <div className="text-purple-500 text-3xl">🏥</div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Avg Experience</p>
              <p className="text-3xl font-bold text-orange-600">
                {doctors.length ? Math.round(doctors.reduce((sum, d) => sum + d.experience, 0) / doctors.length) : 0}y
              </p>
            </div>
            <div className="text-orange-500 text-3xl">📊</div>
          </div>
        </div>
      </div>

      {/* Doctors List */}
      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        {isLoading ? (
          <div className="p-8 text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading doctors...</p>
          </div>
        ) : filteredDoctors.length === 0 ? (
          <div className="p-8 text-center">
            <p className="text-gray-500">No doctors found</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Doctor</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Department</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Specialization</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Experience</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Fee</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredDoctors.map((doctor) => (
                  <tr key={doctor._id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <div className="text-sm font-medium text-gray-900">
                          Dr. {doctor.firstName} {doctor.lastName}
                        </div>
                        <div className="text-sm text-gray-500">{doctor.email}</div>
                        <div className="text-sm text-gray-500">{doctor.phone}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{doctor.department}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{doctor.specialization}</div>
                      <div className="text-sm text-gray-500">{doctor.qualification}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{doctor.experience} years</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">${doctor.consultationFee}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                        doctor.status === 'active' 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-red-100 text-red-800'
                      }`}>
                        {doctor.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <button 
                        onClick={() => handleEdit(doctor)}
                        className="text-blue-600 hover:text-blue-900 mr-3"
                      >
                        Edit
                      </button>
                      <button 
                        onClick={() => handleDelete(doctor._id)}
                        className="text-red-600 hover:text-red-900"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Add/Edit Doctor Modal */}
      {showAddForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-4xl max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-900">
                {editingDoctor ? 'Edit Doctor' : 'Add New Doctor'}
              </h2>
              <button
                onClick={() => {setShowAddForm(false); setEditingDoctor(null)}}
                className="text-gray-400 hover:text-gray-600"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Personal Information */}
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-4">Personal Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">First Name</label>
                    <input
                      type="text"
                      name="firstName"
                      value={newDoctor.firstName}
                      onChange={handleChange}
                      required
                      className={inputClassName}
                      style={{ color: '#111827', backgroundColor: '#ffffff' }}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Last Name</label>
                    <input
                      type="text"
                      name="lastName"
                      value={newDoctor.lastName}
                      onChange={handleChange}
                      required
                      className={inputClassName}
                      style={{ color: '#111827', backgroundColor: '#ffffff' }}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                    <input
                      type="email"
                      name="email"
                      value={newDoctor.email}
                      onChange={handleChange}
                      required
                      className={inputClassName}
                      style={{ color: '#111827', backgroundColor: '#ffffff' }}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
                    <input
                      type="tel"
                      name="phone"
                      value={newDoctor.phone}
                      onChange={handleChange}
                      required
                      className={inputClassName}
                      style={{ color: '#111827', backgroundColor: '#ffffff' }}
                    />
                  </div>
                </div>
              </div>

              {/* Professional Information */}
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-4">Professional Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Department</label>
                    <select
                      name="department"
                      value={newDoctor.department}
                      onChange={handleChange}
                      required
                      className={inputClassName}
                      style={{ color: '#111827', backgroundColor: '#ffffff' }}
                    >
                      <option value="">Select Department</option>
                      {departments.map(dept => (
                        <option key={dept} value={dept}>{dept}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Specialization</label>
                    <select
                      name="specialization"
                      value={newDoctor.specialization}
                      onChange={handleChange}
                      required
                      className={inputClassName}
                      style={{ color: '#111827', backgroundColor: '#ffffff' }}
                    >
                      <option value="">Select Specialization</option>
                      {newDoctor.department && specializations[newDoctor.department]?.map(spec => (
                        <option key={spec} value={spec}>{spec}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Qualification</label>
                    <input
                      type="text"
                      name="qualification"
                      value={newDoctor.qualification}
                      onChange={handleChange}
                      placeholder="e.g., MBBS, MD"
                      required
                      className={inputClassName}
                      style={{ color: '#111827', backgroundColor: '#ffffff' }}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Experience (years)</label>
                    <input
                      type="number"
                      name="experience"
                      value={newDoctor.experience}
                      onChange={handleChange}
                      min="0"
                      max="50"
                      required
                      className={inputClassName}
                      style={{ color: '#111827', backgroundColor: '#ffffff' }}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Consultation Fee ($)</label>
                    <input
                      type="number"
                      name="consultationFee"
                      value={newDoctor.consultationFee}
                      onChange={handleChange}
                      min="0"
                      step="0.01"
                      required
                      className={inputClassName}
                      style={{ color: '#111827', backgroundColor: '#ffffff' }}
                    />
                  </div>
                </div>
              </div>

              {/* Schedule */}
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-4">Weekly Schedule</h3>
                <div className="space-y-3">
                  {Object.entries(newDoctor.schedule).map(([day, schedule]) => (
                    <div key={day} className="flex items-center space-x-4 p-3 bg-gray-50 rounded-lg">
                      <div className="w-24">
                        <span className="text-sm font-medium text-gray-700 capitalize">{day}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          checked={schedule.isAvailable}
                          onChange={(e) => handleScheduleChange(day, 'isAvailable', e.target.checked)}
                          className="rounded"
                        />
                        <span className="text-sm text-gray-600">Available</span>
                      </div>
                      {schedule.isAvailable && (
                        <>
                          <input
                            type="time"
                            value={schedule.start}
                            onChange={(e) => handleScheduleChange(day, 'start', e.target.value)}
                            className="px-2 py-1 border border-gray-300 rounded text-sm"
                            style={{ color: '#111827', backgroundColor: '#ffffff' }}
                          />
                          <span className="text-gray-500">to</span>
                          <input
                            type="time"
                            value={schedule.end}
                            onChange={(e) => handleScheduleChange(day, 'end', e.target.value)}
                            className="px-2 py-1 border border-gray-300 rounded text-sm"
                            style={{ color: '#111827', backgroundColor: '#ffffff' }}
                          />
                        </>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex justify-end space-x-4">
                <button
                  type="button"
                  onClick={() => {setShowAddForm(false); setEditingDoctor(null)}}
                  className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                >
                  {editingDoctor ? 'Update Doctor' : 'Add Doctor'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
