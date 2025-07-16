'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function SecurityPage() {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState('security')

  const securityFeatures = [
    {
      icon: "🔒",
      title: "End-to-End Encryption",
      description: "All data is encrypted in transit and at rest using AES-256 encryption standards."
    },
    {
      icon: "🛡️",
      title: "HIPAA Compliance",
      description: "Fully compliant with HIPAA regulations for protected health information (PHI)."
    },
    {
      icon: "🔐",
      title: "Multi-Factor Authentication",
      description: "Enhanced security with SMS, email, or authenticator app verification."
    },
    {
      icon: "👥",
      title: "Role-Based Access Control",
      description: "Granular permissions ensure staff only access what they need."
    },
    {
      icon: "📊",
      title: "Audit Trails",
      description: "Complete logging of all system activities for compliance and security monitoring."
    },
    {
      icon: "🔄",
      title: "Automatic Backups",
      description: "Daily encrypted backups with point-in-time recovery options."
    }
  ]

  const certifications = [
    {
      name: "HIPAA",
      description: "Health Insurance Portability and Accountability Act",
      status: "Certified"
    },
    {
      name: "SOC 2 Type II",
      description: "Security, Availability, and Confidentiality",
      status: "Certified"
    },
    {
      name: "ISO 27001",
      description: "Information Security Management",
      status: "In Progress"
    },
    {
      name: "GDPR",
      description: "General Data Protection Regulation",
      status: "Compliant"
    }
  ]

  const securityPractices = [
    {
      category: "Data Protection",
      practices: [
        "AES-256 encryption for all data",
        "Encrypted data transmission via TLS 1.3",
        "Zero-knowledge architecture",
        "Regular penetration testing",
        "Automated vulnerability scanning"
      ]
    },
    {
      category: "Access Management",
      practices: [
        "Multi-factor authentication",
        "Single sign-on (SSO) integration",
        "Session timeout controls",
        "Password policy enforcement",
        "Account lockout protection"
      ]
    },
    {
      category: "Infrastructure Security",
      practices: [
        "AWS cloud infrastructure",
        "DDoS protection",
        "Firewall protection",
        "Intrusion detection systems",
        "24/7 security monitoring"
      ]
    },
    {
      category: "Compliance & Auditing",
      practices: [
        "Complete audit trails",
        "Regular compliance audits",
        "Data retention policies",
        "Incident response procedures",
        "Employee security training"
      ]
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50">
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
          <div className="text-6xl mb-6">🔐</div>
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            Enterprise-Grade Security
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Your patient data deserves the highest level of protection. Our comprehensive security framework ensures complete HIPAA compliance and industry-leading data protection.
          </p>
        </div>
      </section>

      {/* Security Features Grid */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-center text-gray-900 mb-12">Security Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {securityFeatures.map((feature, index) => (
              <div key={index} className="bg-white rounded-xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300">
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Certifications */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-center text-gray-900 mb-12">Certifications & Compliance</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {certifications.map((cert, index) => (
              <div key={index} className="bg-gray-50 rounded-xl p-6 text-center hover:shadow-lg transition-shadow duration-300">
                <h3 className="text-lg font-bold text-gray-900 mb-2">{cert.name}</h3>
                <p className="text-sm text-gray-600 mb-3">{cert.description}</p>
                <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${
                  cert.status === 'Certified' ? 'bg-green-100 text-green-800' :
                  cert.status === 'Compliant' ? 'bg-blue-100 text-blue-800' :
                  'bg-yellow-100 text-yellow-800'
                }`}>
                  {cert.status}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Security Practices */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-center text-gray-900 mb-12">Security Practices</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {securityPractices.map((category, index) => (
              <div key={index} className="bg-white rounded-xl p-8 shadow-lg">
                <h3 className="text-2xl font-semibold text-gray-900 mb-6">{category.category}</h3>
                <ul className="space-y-3">
                  {category.practices.map((practice, practiceIndex) => (
                    <li key={practiceIndex} className="flex items-start">
                      <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                      <span className="text-gray-700">{practice}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Security Process */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-center text-gray-900 mb-12">Our Security Process</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              {
                step: "1",
                title: "Risk Assessment",
                description: "Continuous identification and evaluation of security risks"
              },
              {
                step: "2",
                title: "Implementation",
                description: "Deploy appropriate security controls and measures"
              },
              {
                step: "3",
                title: "Monitoring",
                description: "24/7 monitoring and threat detection systems"
              },
              {
                step: "4",
                title: "Response",
                description: "Rapid incident response and remediation procedures"
              }
            ].map((process, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 bg-blue-600 text-white rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">
                  {process.step}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">{process.title}</h3>
                <p className="text-gray-600">{process.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Incident Response */}
      <section className="py-20 bg-gradient-to-r from-red-600 to-pink-600">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-white mb-6">
            24/7 Security Monitoring
          </h2>
          <p className="text-xl text-red-100 mb-8">
            Our security team monitors your system around the clock, ready to respond to any security incidents within minutes.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-white">
            <div>
              <div className="text-3xl font-bold">< 5 min</div>
              <div className="text-red-100">Incident Detection</div>
            </div>
            <div>
              <div className="text-3xl font-bold">< 15 min</div>
              <div className="text-red-100">Response Time</div>
            </div>
            <div>
              <div className="text-3xl font-bold">99.99%</div>
              <div className="text-red-100">Uptime SLA</div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Security Team */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-gray-900 mb-6">
            Questions About Security?
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Our security team is available to answer any questions about our security practices and compliance.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-semibold transition-colors">
              Contact Security Team
            </button>
            <button className="border-2 border-gray-300 text-gray-700 hover:border-gray-400 px-8 py-3 rounded-lg font-semibold transition-colors">
              Download Security Whitepaper
            </button>
          </div>
        </div>
      </section>
    </div>
  )
}
