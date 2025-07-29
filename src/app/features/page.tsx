'use client'

import { useRouter } from 'next/navigation'

export default function FeaturesPage() {
  const router = useRouter()

  const features = [
    {
      category: "Patient Management",
      icon: "👥",
      color: "from-blue-400 to-blue-600",
      items: [
        "Complete patient registration and profile management",
        "Medical history tracking and documentation",
        "Insurance information and claims processing",
        "Patient portal for self-service access",
        "Appointment scheduling integration",
        "Emergency contact management"
      ]
    },
    {
      category: "Doctor & Staff Management", 
      icon: "👨‍⚕️",
      color: "from-green-400 to-green-600",
      items: [
        "Doctor profile and credential management",
        "Schedule and availability tracking",
        "Department and specialization assignment",
        "Performance analytics and reporting",
        "Staff role-based access control",
        "Continuing education tracking"
      ]
    },
    {
      category: "Appointment System",
      icon: "📅", 
      color: "from-purple-400 to-purple-600",
      items: [
        "Smart scheduling with conflict detection",
        "Automated appointment reminders",
        "Walk-in and emergency appointment handling",
        "Appointment status tracking",
        "Resource allocation and room management",
        "Patient check-in and queue management"
      ]
    },
    {
      category: "Billing & Financial",
      icon: "💰",
      color: "from-orange-400 to-orange-600", 
      items: [
        "Comprehensive invoice generation",
        "Insurance claim processing and tracking",
        "Multiple payment method support",
        "Financial reporting and analytics",
        "Revenue cycle management",
        "Billing compliance and audit trails"
      ]
    },
    {
      category: "Inventory Management",
      icon: "📦",
      color: "from-red-400 to-red-600",
      items: [
        "Real-time stock level monitoring",
        "Automated low-stock alerts",
        "Supplier and vendor management",
        "Expiry date tracking and alerts",
        "Batch and lot number tracking",
        "Equipment maintenance scheduling"
      ]
    },
    {
      category: "Analytics & Reports",
      icon: "📊",
      color: "from-indigo-400 to-indigo-600",
      items: [
        "Comprehensive financial reports",
        "Patient flow and demographics analysis",
        "Staff performance metrics",
        "Inventory usage patterns",
        "Compliance and regulatory reporting",
        "Custom dashboard creation"
      ]
    }
  ]

  return (
    {
      category: "Patient Management",
      icon: "👥",
      color: "from-blue-400 to-blue-600",
      items: [
        "Complete patient registration and profile management",
        "Medical history tracking and documentation",
        "Insurance information and claims processing",
        "Patient portal for self-service access",
        "Appointment scheduling integration",
        "Emergency contact management"
      ]
    },
    {
      category: "Doctor & Staff Management", 
      icon: "👨‍⚕️",
      color: "from-green-400 to-green-600",
      items: [
        "Doctor profile and credential management",
        "Schedule and availability tracking",
        "Department and specialization assignment",
        "Performance analytics and reporting",
        "Staff role-based access control",
        "Continuing education tracking"
      ]
    },
    {
      category: "Appointment System",
      icon: "📅", 
      color: "from-purple-400 to-purple-600",
      items: [
        "Smart scheduling with conflict detection",
        "Automated appointment reminders",
        "Walk-in and emergency appointment handling",
        "Appointment status tracking",
        "Resource allocation and room management",
        "Patient check-in and queue management"
      ]
    },
    {
      category: "Billing & Financial",
      icon: "💰",
      color: "from-orange-400 to-orange-600", 
      items: [
        "Comprehensive invoice generation",
        "Insurance claim processing and tracking",
        "Multiple payment method support",
        "Financial reporting and analytics",
        "Revenue cycle management",
        "Billing compliance and audit trails"
      ]
    },
    {
      category: "Inventory Management",
      icon: "📦",
      color: "from-red-400 to-red-600",
      items: [
        "Real-time stock level monitoring",
        "Automated low-stock alerts",
        "Supplier and vendor management",
        "Expiry date tracking and alerts",
        "Batch and lot number tracking",
        "Equipment maintenance scheduling"
      ]
    },
    {
      category: "Analytics & Reports",
      icon: "📊",
      color: "from-indigo-400 to-indigo-600",
      items: [
        "Comprehensive financial reports",
        "Patient flow and demographics analysis",
        "Staff performance metrics",
        "Inventory usage patterns",
        "Compliance and regulatory reporting",
        "Custom dashboard creation"
      ]
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
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
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h1 className="text-5xl font-bold text-gray-900 mb-6">
              Comprehensive HMS Features
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Discover all the powerful features that make MediCare HMS the leading hospital management solution
            </p>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {features.map((feature, index) => (
              <div key={feature.category} className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300">
                <div className="flex items-center mb-6">
                  <div className={`w-16 h-16 bg-gradient-to-br ${feature.color} rounded-2xl flex items-center justify-center text-3xl mr-4`}>
                    {feature.icon}
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900">{feature.category}</h3>
                </div>
                <ul className="space-y-3">
                  {feature.items.map((item, itemIndex) => (
                    <li key={itemIndex} className="flex items-start">
                      <div className="w-2 h-2 bg-green-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                      <span className="text-gray-700">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-white mb-6">
            Ready to Experience These Features?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Start your free trial today and see how these features can transform your hospital operations
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => router.push('/signup')}
              className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300"
            >
              Start Free Trial
            </button>
            <button
              onClick={() => router.push('/')}
              className="border-2 border-white text-white hover:bg-white hover:text-blue-600 px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300"
            >
              Learn More
            </button>
          </div>
        </div>
      </section>
    </div>
  )
}
