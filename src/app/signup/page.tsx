'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function SignupPage() {
  const router = useRouter()
  const [signupData, setSignupData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: 'receptionist',
    department: '',
    phone: ''
  })
  const [termsAccepted, setTermsAccepted] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setIsLoading(true)
    
    console.log('Signup form submitted!', signupData)
    
    // Validation
    if (!signupData.firstName.trim()) {
      setError('First name is required!')
      setIsLoading(false)
      return
    }
    
    if (!signupData.lastName.trim()) {
      setError('Last name is required!')
      setIsLoading(false)
      return
    }
    
    if (!signupData.email.trim()) {
      setError('Email is required!')
      setIsLoading(false)
      return
    }
    
    if (!signupData.phone.trim()) {
      setError('Phone number is required!')
      setIsLoading(false)
      return
    }
    
    if (!signupData.password) {
      setError('Password is required!')
      setIsLoading(false)
      return
    }
    
    if (signupData.password !== signupData.confirmPassword) {
      setError('Passwords do not match!')
      setIsLoading(false)
      return
    }

    if (signupData.password.length < 6) {
      setError('Password must be at least 6 characters long!')
      setIsLoading(false)
      return
    }

    if (!termsAccepted) {
      setError('Please accept the Terms of Service and Privacy Policy!')
      setIsLoading(false)
      return
    }

    console.log('All validations passed, making API call...')

    try {
      const requestData = {
        username: signupData.email, // Use email as username
        email: signupData.email,
        password: signupData.password,
        firstName: signupData.firstName,
        lastName: signupData.lastName,
        phone: signupData.phone,
        role: signupData.role,
        department: signupData.department || undefined,
        position: signupData.role
      }
      
      console.log('Sending request:', requestData)

      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestData),
      })

      console.log('Response status:', response.status)
      const data = await response.json()
      console.log('Response data:', data)

      if (response.ok) {
        alert('Account created successfully! Please login.')
        router.push('/login')
      } else {
        console.error('Signup error:', data)
        setError(data.message || data.error || 'Failed to create account')
      }
    } catch (error) {
      console.error('Signup error:', error)
      setError('Failed to create account. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  const inputClassName = "w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 bg-white placeholder-gray-500"

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-green-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        {/* Back to Home Button */}
        <div className="flex justify-start">
          <button
            onClick={() => router.push('/')}
            className="flex items-center text-blue-600 hover:text-blue-800 transition-colors"
          >
            ← Back to Home
          </button>
        </div>
        
        <div>
          <div className="mx-auto h-16 w-16 flex items-center justify-center bg-blue-600 rounded-full shadow-lg">
            <span className="text-white text-3xl">🏥</span>
          </div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Create Your Account
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Join MediCare HMS today
          </p>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleSignup}>
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
              {error}
            </div>
          )}

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">First Name</label>
              <input
                type="text"
                value={signupData.firstName}
                onChange={(e) => setSignupData({...signupData, firstName: e.target.value})}
                required
                className={inputClassName}
                placeholder="John"
                style={{ color: '#111827', backgroundColor: '#ffffff' }}
                disabled={isLoading}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Last Name</label>
              <input
                type="text"
                value={signupData.lastName}
                onChange={(e) => setSignupData({...signupData, lastName: e.target.value})}
                required
                className={inputClassName}
                placeholder="Doe"
                style={{ color: '#111827', backgroundColor: '#ffffff' }}
                disabled={isLoading}
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
            <input
              type="email"
              value={signupData.email}
              onChange={(e) => setSignupData({...signupData, email: e.target.value})}
              required
              className={inputClassName}
              placeholder="john.doe@hospital.com"
              style={{ color: '#111827', backgroundColor: '#ffffff' }}
              disabled={isLoading}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
            <input
              type="tel"
              value={signupData.phone}
              onChange={(e) => setSignupData({...signupData, phone: e.target.value})}
              required
              className={inputClassName}
              placeholder="+1 (555) 123-4567"
              style={{ color: '#111827', backgroundColor: '#ffffff' }}
              disabled={isLoading}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Role</label>
            <select
              value={signupData.role}
              onChange={(e) => setSignupData({...signupData, role: e.target.value})}
              className={inputClassName}
              style={{ color: '#111827', backgroundColor: '#ffffff' }}
              disabled={isLoading}
            >
              <option value="receptionist">Receptionist</option>
              <option value="doctor">Doctor</option>
              <option value="nurse">Nurse</option>
              <option value="lab_technician">Lab Technician</option>
              <option value="pharmacist">Pharmacist</option>
              <option value="accountant">Accountant</option>
              <option value="admin">Administrator</option>
            </select>
          </div>

          {(signupData.role === 'doctor' || signupData.role === 'nurse') && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Department</label>
              <select
                value={signupData.department}
                onChange={(e) => setSignupData({...signupData, department: e.target.value})}
                className={inputClassName}
                style={{ color: '#111827', backgroundColor: '#ffffff' }}
                disabled={isLoading}                  >
                    <option value="">Select Department</option>
                    <option value="Administration">Administration</option>
                    <option value="Cardiology">Cardiology</option>
                    <option value="Dermatology">Dermatology</option>
                    <option value="Emergency">Emergency</option>
                    <option value="Endocrinology">Endocrinology</option>
                    <option value="Gastroenterology">Gastroenterology</option>
                    <option value="General Practice">General Practice</option>
                    <option value="Internal Medicine">Internal Medicine</option>
                    <option value="Laboratory">Laboratory</option>
                    <option value="Neurology">Neurology</option>
                    <option value="Oncology">Oncology</option>
                    <option value="Orthopedics">Orthopedics</option>
                    <option value="Pediatrics">Pediatrics</option>
                    <option value="Pharmacy">Pharmacy</option>
                    <option value="Radiology">Radiology</option>
                    <option value="Surgery">Surgery</option>
                  </select>
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
            <input
              type="password"
              value={signupData.password}
              onChange={(e) => setSignupData({...signupData, password: e.target.value})}
              required
              className={inputClassName}
              placeholder="••••••••"
              style={{ color: '#111827', backgroundColor: '#ffffff' }}
              disabled={isLoading}
              minLength={6}
            />
            <p className="text-xs text-gray-500 mt-1">Password must be at least 6 characters long</p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Confirm Password</label>
            <input
              type="password"
              value={signupData.confirmPassword}
              onChange={(e) => setSignupData({...signupData, confirmPassword: e.target.value})}
              required
              className={inputClassName}
              placeholder="••••••••"
              style={{ color: '#111827', backgroundColor: '#ffffff' }}
              disabled={isLoading}
            />
          </div>

          <div className="flex items-start">
            <input
              type="checkbox"
              id="terms"
              checked={termsAccepted}
              onChange={(e) => setTermsAccepted(e.target.checked)}
              required
              className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2 mt-1"
              disabled={isLoading}
            />
            <label htmlFor="terms" className="ml-3 text-sm text-gray-600">
              I agree to the <a href="#" className="text-blue-600 hover:underline">Terms of Service</a> and <a href="#" className="text-blue-600 hover:underline">Privacy Policy</a>
            </label>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white py-3 px-4 rounded-lg font-semibold transition-colors duration-300 flex items-center justify-center"
          >
            {isLoading ? (
              <>
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                Creating Account...
              </>
            ) : (
              'Create Account'
            )}
          </button>

          <div className="text-center">
            <p className="text-sm text-gray-600">
              Already have an account?{' '}
              <button
                type="button"
                onClick={() => router.push('/login')}
                className="text-blue-600 hover:underline font-medium"
                disabled={isLoading}
              >
                Sign in here
              </button>
            </p>
          </div>
        </form>
      </div>
    </div>
  )
}
