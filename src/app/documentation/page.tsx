'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function DocumentationPage() {
  const router = useRouter()
  const [searchQuery, setSearchQuery] = useState('')
  const [activeCategory, setActiveCategory] = useState('getting-started')

  const categories = [
    { id: 'getting-started', name: 'Getting Started', icon: '🚀' },
    { id: 'user-guides', name: 'User Guides', icon: '📖' },
    { id: 'api-docs', name: 'API Documentation', icon: '⚡' },
    { id: 'tutorials', name: 'Tutorials', icon: '🎓' },
    { id: 'troubleshooting', name: 'Troubleshooting', icon: '🔧' },
    { id: 'integrations', name: 'Integrations', icon: '🔗' }
  ]

  const documentation = {
    'getting-started': [
      {
        title: "Quick Start Guide",
        description: "Get up and running with MediCare HMS in 5 minutes",
        tags: ["setup", "installation", "basics"]
      },
      {
        title: "System Requirements",
        description: "Hardware and software requirements for optimal performance",
        tags: ["requirements", "hardware", "software"]
      },
      {
        title: "Initial Setup",
        description: "Configure your hospital management system for first use",
        tags: ["configuration", "setup", "admin"]
      },
      {
        title: "User Account Setup",
        description: "Create and manage user accounts for staff members",
        tags: ["users", "accounts", "permissions"]
      }
    ],
    'user-guides': [
      {
        title: "Patient Management",
        description: "Complete guide to managing patient records and information",
        tags: ["patients", "records", "management"]
      },
      {
        title: "Appointment Scheduling",
        description: "How to schedule, modify, and manage appointments",
        tags: ["appointments", "scheduling", "calendar"]
      },
      {
        title: "Billing and Invoicing",
        description: "Process payments, generate invoices, and manage billing",
        tags: ["billing", "invoices", "payments"]
      },
      {
        title: "Inventory Management",
        description: "Track medical supplies, equipment, and medications",
        tags: ["inventory", "supplies", "equipment"]
      },
      {
        title: "Reports and Analytics",
        description: "Generate reports and analyze hospital performance data",
        tags: ["reports", "analytics", "data"]
      }
    ],
    'api-docs': [
      {
        title: "Authentication API",
        description: "JWT-based authentication and authorization endpoints",
        tags: ["auth", "jwt", "security"]
      },
      {
        title: "Patient API",
        description: "CRUD operations for patient data management",
        tags: ["patients", "crud", "endpoints"]
      },
      {
        title: "Appointment API",
        description: "Manage appointments programmatically",
        tags: ["appointments", "api", "scheduling"]
      },
      {
        title: "Billing API",
        description: "Integration endpoints for billing and payment processing",
        tags: ["billing", "payments", "integration"]
      },
      {
        title: "Webhooks",
        description: "Real-time notifications for system events",
        tags: ["webhooks", "notifications", "events"]
      }
    ],
    'tutorials': [
      {
        title: "Setting Up Your First Department",
        description: "Step-by-step tutorial for department configuration",
        tags: ["departments", "setup", "tutorial"]
      },
      {
        title: "Importing Patient Data",
        description: "How to bulk import existing patient records",
        tags: ["import", "patients", "data-migration"]
      },
      {
        title: "Customizing Report Templates",
        description: "Create custom report templates for your needs",
        tags: ["reports", "templates", "customization"]
      },
      {
        title: "Integration with Laboratory Systems",
        description: "Connect external lab systems for seamless workflow",
        tags: ["integration", "laboratory", "workflow"]
      }
    ],
    'troubleshooting': [
      {
        title: "Login Issues",
        description: "Resolve common authentication and login problems",
        tags: ["login", "authentication", "issues"]
      },
      {
        title: "Performance Optimization",
        description: "Tips to improve system performance and response times",
        tags: ["performance", "optimization", "speed"]
      },
      {
        title: "Data Backup and Recovery",
        description: "How to backup and restore your hospital data",
        tags: ["backup", "recovery", "data"]
      },
      {
        title: "Browser Compatibility",
        description: "Supported browsers and compatibility issues",
        tags: ["browser", "compatibility", "support"]
      }
    ],
    'integrations': [
      {
        title: "Electronic Health Records (EHR)",
        description: "Connect with popular EHR systems like Epic, Cerner",
        tags: ["ehr", "epic", "cerner"]
      },
      {
        title: "Laboratory Information Systems",
        description: "Integrate with LIS for automated lab result imports",
        tags: ["lis", "laboratory", "results"]
      },
      {
        title: "Pharmacy Management",
        description: "Connect with pharmacy systems for prescription management",
        tags: ["pharmacy", "prescriptions", "medications"]
      },
      {
        title: "Telemedicine Platforms",
        description: "Integration with video conferencing and telemedicine",
        tags: ["telemedicine", "video", "remote"]
      }
    ]
  }

  const filteredDocs = documentation[activeCategory]?.filter(doc =>
    doc.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    doc.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
    doc.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
  ) || []

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Header */}
      <nav className="bg-white/80 backdrop-blur-md shadow-lg sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <button onClick={() => router.push('/')} className="flex items-center space-x-3">
                <div className="text-3xl">🏥</div>
                <div>
                  <h1 className="text-2xl font-bold text-gray-900">MediCare HMS</h1>
                  <p className="text-sm text-gray-600">Hospital Management System</p>
                </div>
              </button>
            </div>
            <div className="flex items-center space-x-4">
              <button
                onClick={() => router.push('/signup')}
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium transition-all duration-300"
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
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="text-6xl mb-6">📚</div>
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            Documentation Center
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            Everything you need to know about using MediCare HMS effectively. From quick start guides to advanced integrations.
          </p>
          
          {/* Search Bar */}
          <div className="max-w-2xl mx-auto">
            <div className="relative">
              <input
                type="text"
                placeholder="Search documentation..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-6 py-4 pl-12 text-lg border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none"
              />
              <div className="absolute left-4 top-1/2 transform -translate-y-1/2">
                <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Documentation Content */}
      <section className="pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Sidebar */}
            <div className="lg:w-1/4">
              <div className="bg-white rounded-xl shadow-lg p-6 sticky top-24">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Categories</h3>
                <nav className="space-y-2">
                  {categories.map((category) => (
                    <button
                      key={category.id}
                      onClick={() => setActiveCategory(category.id)}
                      className={`w-full text-left px-4 py-3 rounded-lg transition-all duration-200 flex items-center space-x-3 ${
                        activeCategory === category.id
                          ? 'bg-blue-100 text-blue-700 border-l-4 border-blue-500'
                          : 'hover:bg-gray-50 text-gray-700'
                      }`}
                    >
                      <span className="text-xl">{category.icon}</span>
                      <span className="font-medium">{category.name}</span>
                    </button>
                  ))}
                </nav>
              </div>
            </div>

            {/* Main Content */}
            <div className="lg:w-3/4">
              <div className="mb-6">
                <h2 className="text-3xl font-bold text-gray-900 mb-2">
                  {categories.find(cat => cat.id === activeCategory)?.name}
                </h2>
                <p className="text-gray-600">
                  {searchQuery ? `Search results for "${searchQuery}"` : 'Browse documentation articles'}
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {filteredDocs.map((doc, index) => (
                  <div key={index} className="bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 p-6 cursor-pointer group">
                    <h3 className="text-xl font-semibold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors">
                      {doc.title}
                    </h3>
                    <p className="text-gray-600 mb-4">{doc.description}</p>
                    <div className="flex flex-wrap gap-2">
                      {doc.tags.map((tag, tagIndex) => (
                        <span
                          key={tagIndex}
                          className="bg-blue-100 text-blue-800 text-xs font-medium px-2 py-1 rounded-full"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              {filteredDocs.length === 0 && (
                <div className="text-center py-12">
                  <div className="text-6xl mb-4">🔍</div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">No results found</h3>
                  <p className="text-gray-600">Try searching with different keywords or browse categories.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Popular Articles */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-center text-gray-900 mb-12">Popular Articles</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "Quick Start Guide",
                category: "Getting Started",
                views: "15.2k views",
                icon: "🚀"
              },
              {
                title: "Patient Management",
                category: "User Guides",
                views: "12.8k views",
                icon: "👥"
              },
              {
                title: "API Authentication",
                category: "API Documentation",
                views: "9.4k views",
                icon: "🔐"
              }
            ].map((article, index) => (
              <div key={index} className="bg-white rounded-xl p-6 shadow-lg hover:shadow-2xl transition-shadow duration-300">
                <div className="text-3xl mb-4">{article.icon}</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{article.title}</h3>
                <p className="text-blue-600 text-sm mb-2">{article.category}</p>
                <p className="text-gray-500 text-sm">{article.views}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-white mb-6">
            Need More Help?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Can&apos;t find what you&apos;re looking for? Our support team is here to help.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-3 rounded-lg font-semibold transition-colors">
              Contact Support
            </button>
            <button className="border-2 border-white text-white hover:bg-white hover:text-blue-600 px-8 py-3 rounded-lg font-semibold transition-colors">
              Schedule Demo
            </button>
          </div>
        </div>
      </section>
    </div>
  )
}
