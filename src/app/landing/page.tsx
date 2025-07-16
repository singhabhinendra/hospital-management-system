'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function LandingPage() {
  const router = useRouter()

  const inputClassName = "w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 bg-white placeholder-gray-500"

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      {/* Header */}
      <nav className="bg-white/80 backdrop-blur-md shadow-lg sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <div className="text-3xl">🏥</div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">MediCare HMS</h1>
                <p className="text-sm text-gray-600">Hospital Management System</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <button
                onClick={() => router.push('/signup')}
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium transition-all duration-300 transform hover:scale-105"
              >
                Sign Up
              </button>
              <button
                onClick={() => router.push('/login')}
                className="border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white px-6 py-2 rounded-lg font-medium transition-all duration-300"
              >
                Login
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative overflow-hidden py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="space-y-4">
                <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
                  Modern
                  <span className="text-blue-600"> Healthcare</span>
                  <br />
                  Management
                </h1>
                <p className="text-xl text-gray-600 leading-relaxed">
                  Streamline your hospital operations with our comprehensive management system. 
                  From patient care to inventory management, we&apos;ve got you covered.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  onClick={() => router.push('/signup')}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
                >
                  Get Started Free
                </button>
                <button className="border-2 border-gray-300 text-gray-700 hover:border-blue-600 hover:text-blue-600 px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300">
                  Watch Demo
                </button>
              </div>
              <div className="flex items-center space-x-8 text-sm text-gray-600">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span>Free 30-day trial</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span>No setup fees</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span>24/7 support</span>
                </div>
              </div>
            </div>
            
            {/* Hero Image/Illustration */}
            <div className="relative">
              <div className="bg-gradient-to-br from-blue-400 to-blue-600 rounded-3xl p-8 shadow-2xl transform rotate-3 hover:rotate-0 transition-transform duration-500">
                <div className="bg-white rounded-2xl p-6 space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="text-2xl font-bold text-gray-900">Dashboard</div>
                    <div className="flex space-x-2">
                      <div className="w-3 h-3 bg-red-400 rounded-full"></div>
                      <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
                      <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-blue-50 p-4 rounded-lg">
                      <div className="text-2xl">👥</div>
                      <div className="text-lg font-semibold text-gray-900">1,234</div>
                      <div className="text-sm text-gray-600">Patients</div>
                    </div>
                    <div className="bg-green-50 p-4 rounded-lg">
                      <div className="text-2xl">👨‍⚕️</div>
                      <div className="text-lg font-semibold text-gray-900">56</div>
                      <div className="text-sm text-gray-600">Doctors</div>
                    </div>
                    <div className="bg-purple-50 p-4 rounded-lg">
                      <div className="text-2xl">📅</div>
                      <div className="text-lg font-semibold text-gray-900">89</div>
                      <div className="text-sm text-gray-600">Appointments</div>
                    </div>
                    <div className="bg-orange-50 p-4 rounded-lg">
                      <div className="text-2xl">💰</div>
                      <div className="text-lg font-semibold text-gray-900">$12.5K</div>
                      <div className="text-sm text-gray-600">Revenue</div>
                    </div>
                  </div>
                </div>
              </div>
              {/* Floating elements */}
              <div className="absolute -top-4 -right-4 bg-green-400 rounded-full p-3 shadow-lg animate-bounce">
                <div className="text-white text-xl">✨</div>
              </div>
              <div className="absolute -bottom-4 -left-4 bg-purple-400 rounded-full p-3 shadow-lg animate-pulse">
                <div className="text-white text-xl">💊</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Everything You Need to Manage Your Hospital
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our comprehensive solution provides all the tools necessary to run a modern healthcare facility efficiently and effectively.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: '👥',
                title: 'Patient Management',
                description: 'Complete patient records, medical history, and seamless appointment scheduling system.',
                color: 'from-blue-400 to-blue-600'
              },
              {
                icon: '👨‍⚕️',
                title: 'Doctor Management',
                description: 'Manage doctor profiles, schedules, specializations, and availability tracking.',
                color: 'from-green-400 to-green-600'
              },
              {
                icon: '📅',
                title: 'Appointment System',
                description: 'Smart scheduling system with conflict detection and automated reminders.',
                color: 'from-purple-400 to-purple-600'
              },
              {
                icon: '💰',
                title: 'Billing & Payments',
                description: 'Comprehensive billing system with insurance claims and payment tracking.',
                color: 'from-orange-400 to-orange-600'
              },
              {
                icon: '📦',
                title: 'Inventory Control',
                description: 'Real-time inventory tracking, automated alerts, and supplier management.',
                color: 'from-red-400 to-red-600'
              },
              {
                icon: '📊',
                title: 'Analytics & Reports',
                description: 'Detailed insights and reports for data-driven decision making.',
                color: 'from-indigo-400 to-indigo-600'
              }
            ].map((feature, index) => (
              <div key={index} className="group cursor-pointer">
                <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100">
                  <div className={`w-16 h-16 bg-gradient-to-br ${feature.color} rounded-2xl flex items-center justify-center text-3xl mb-6 group-hover:scale-110 transition-transform duration-300`}>
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">{feature.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">
              Trusted by Healthcare Providers Worldwide
            </h2>
            <p className="text-xl text-blue-100">
              Join thousands of hospitals and clinics using our platform
            </p>
          </div>
          
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { number: '500+', label: 'Hospitals' },
              { number: '50K+', label: 'Patients Served' },
              { number: '1K+', label: 'Doctors' },
              { number: '99.9%', label: 'Uptime' }
            ].map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl lg:text-5xl font-bold text-white mb-2">{stat.number}</div>
                <div className="text-blue-100 text-lg">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-gray-900 mb-6">
            Ready to Transform Your Hospital Management?
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Start your free trial today and see the difference our platform can make for your healthcare facility.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => router.push('/signup')}
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
            >
              Start Free Trial
            </button>
            <button className="border-2 border-gray-300 text-gray-700 hover:border-blue-600 hover:text-blue-600 px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300">
              Contact Sales
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <div className="text-3xl">🏥</div>
                <div>
                  <h3 className="text-xl font-bold">MediCare HMS</h3>
                  <p className="text-gray-400 text-sm">Hospital Management System</p>
                </div>
              </div>
              <p className="text-gray-400">
                Empowering healthcare providers with cutting-edge technology for better patient care.
              </p>
            </div>
            
            <div>
              <h4 className="text-lg font-semibold mb-4">Product</h4>
              <ul className="space-y-2 text-gray-400">
                <li><button onClick={() => router.push('/features')} className="hover:text-white transition-colors">Features</button></li>
                <li><button onClick={() => router.push('/pricing')} className="hover:text-white transition-colors">Pricing</button></li>
                <li><button onClick={() => router.push('/security')} className="hover:text-white transition-colors">Security</button></li>
                <li><button onClick={() => router.push('/features')} className="hover:text-white transition-colors">Integrations</button></li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-lg font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-gray-400">
                <li><button onClick={() => router.push('/documentation')} className="hover:text-white transition-colors">Documentation</button></li>
                <li><button onClick={() => router.push('/contact')} className="hover:text-white transition-colors">Help Center</button></li>
                <li><button onClick={() => router.push('/contact')} className="hover:text-white transition-colors">Contact Us</button></li>
                <li><button onClick={() => router.push('/contact')} className="hover:text-white transition-colors">Status</button></li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-lg font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-gray-400">
                <li><button onClick={() => router.push('/about')} className="hover:text-white transition-colors">About</button></li>
                <li><button onClick={() => router.push('/about')} className="hover:text-white transition-colors">Blog</button></li>
                <li><button onClick={() => router.push('/contact')} className="hover:text-white transition-colors">Careers</button></li>
                <li><button onClick={() => router.push('/privacy')} className="hover:text-white transition-colors">Privacy</button></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2025 MediCare HMS. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
