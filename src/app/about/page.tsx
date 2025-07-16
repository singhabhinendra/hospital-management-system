'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function AboutPage() {
  const router = useRouter()

  const stats = [
    { number: "10,000+", label: "Healthcare Providers" },
    { number: "5M+", label: "Patients Served" },
    { number: "99.9%", label: "Uptime Guarantee" },
    { number: "24/7", label: "Support Available" }
  ]

  const team = [
    {
      name: "Dr. Sarah Johnson",
      role: "CEO & Co-Founder",
      bio: "Former Chief Medical Officer with 15 years in healthcare technology",
      image: "👩‍⚕️"
    },
    {
      name: "Michael Chen",
      role: "CTO & Co-Founder", 
      bio: "Software architect with expertise in healthcare systems and security",
      image: "👨‍💻"
    },
    {
      name: "Dr. James Williams",
      role: "Chief Medical Advisor",
      bio: "Practicing physician and healthcare workflow optimization expert",
      image: "👨‍⚕️"
    },
    {
      name: "Lisa Rodriguez",
      role: "VP of Product",
      bio: "Product strategist focused on user experience in healthcare software",
      image: "👩‍💼"
    }
  ]

  const timeline = [
    {
      year: "2018",
      title: "Company Founded",
      description: "Started with a vision to revolutionize hospital management"
    },
    {
      year: "2019",
      title: "First 100 Customers",
      description: "Reached our first milestone with small clinics and practices"
    },
    {
      year: "2020",
      title: "HIPAA Certification",
      description: "Achieved full HIPAA compliance and security certification"
    },
    {
      year: "2021",
      title: "Enterprise Launch",
      description: "Launched enterprise features for large hospital systems"
    },
    {
      year: "2022",
      title: "AI Integration",
      description: "Introduced AI-powered analytics and predictive insights"
    },
    {
      year: "2023",
      title: "Global Expansion",
      description: "Expanded operations to serve healthcare providers worldwide"
    }
  ]

  const values = [
    {
      icon: "🎯",
      title: "Patient-Centric",
      description: "Every feature we build puts patient care and outcomes first"
    },
    {
      icon: "🔒",
      title: "Security First",
      description: "Enterprise-grade security and privacy protection in everything we do"
    },
    {
      icon: "🚀",
      title: "Innovation",
      description: "Constantly pushing the boundaries of healthcare technology"
    },
    {
      icon: "🤝",
      title: "Partnership",
      description: "We work closely with healthcare providers to understand their needs"
    },
    {
      icon: "🌍",
      title: "Accessibility",
      description: "Making advanced healthcare technology accessible to all providers"
    },
    {
      icon: "📈",
      title: "Continuous Improvement",
      description: "Always evolving and improving based on user feedback"
    }
  ]

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
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            About MediCare HMS
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            We&apos;re on a mission to transform healthcare management through innovative technology, 
            making it easier for healthcare providers to focus on what matters most - patient care.
          </p>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
            {stats.map((stat, index) => (
              <div key={index} className="p-6">
                <div className="text-4xl font-bold text-blue-600 mb-2">{stat.number}</div>
                <div className="text-gray-600 font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-gray-900 mb-8">Our Mission</h2>
          <p className="text-xl text-gray-600 leading-relaxed mb-8">
            To empower healthcare providers with cutting-edge technology that streamlines operations, 
            improves patient outcomes, and reduces administrative burden. We believe that by simplifying 
            healthcare management, we can help providers deliver better care to more patients.
          </p>
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-8 rounded-2xl">
            <h3 className="text-2xl font-bold mb-4">Our Vision</h3>
            <p className="text-lg">
              A world where healthcare providers can focus entirely on patient care, 
              supported by intelligent, intuitive technology that handles the rest.
            </p>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-center text-gray-900 mb-12">Our Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {values.map((value, index) => (
              <div key={index} className="bg-white rounded-xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300">
                <div className="text-4xl mb-4">{value.icon}</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">{value.title}</h3>
                <p className="text-gray-600">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-center text-gray-900 mb-12">Meet Our Team</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, index) => (
              <div key={index} className="bg-white rounded-xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 text-center">
                <div className="text-6xl mb-4">{member.image}</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{member.name}</h3>
                <p className="text-blue-600 font-medium mb-3">{member.role}</p>
                <p className="text-gray-600 text-sm">{member.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-center text-gray-900 mb-12">Our Journey</h2>
          <div className="space-y-8">
            {timeline.map((event, index) => (
              <div key={index} className="flex items-start space-x-6">
                <div className="flex-shrink-0 w-24 text-right">
                  <span className="text-2xl font-bold text-blue-600">{event.year}</span>
                </div>
                <div className="flex-shrink-0 w-4 h-4 bg-blue-600 rounded-full mt-2"></div>
                <div className="flex-grow">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{event.title}</h3>
                  <p className="text-gray-600">{event.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Recognition Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-center text-gray-900 mb-12">Recognition & Awards</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                award: "Healthcare Innovation Award 2023",
                organization: "Healthcare Technology Association",
                description: "Best Hospital Management System"
              },
              {
                award: "Security Excellence Award 2022",
                organization: "HIMSS",
                description: "Outstanding Data Protection"
              },
              {
                award: "Customer Choice Award 2022",
                organization: "TrustRadius",
                description: "Highest Customer Satisfaction"
              }
            ].map((recognition, index) => (
              <div key={index} className="bg-white rounded-xl p-6 shadow-lg text-center">
                <div className="text-4xl mb-4">🏆</div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{recognition.award}</h3>
                <p className="text-blue-600 font-medium mb-2">{recognition.organization}</p>
                <p className="text-gray-600 text-sm">{recognition.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-white mb-6">
            Join Our Mission
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Ready to transform your healthcare practice? Let&apos;s build the future of healthcare together.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => router.push('/signup')}
              className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-3 rounded-lg font-semibold transition-colors"
            >
              Start Free Trial
            </button>
            <button
              onClick={() => router.push('/contact')}
              className="border-2 border-white text-white hover:bg-white hover:text-blue-600 px-8 py-3 rounded-lg font-semibold transition-colors"
            >
              Contact Us
            </button>
          </div>
        </div>
      </section>
    </div>
  )
}
