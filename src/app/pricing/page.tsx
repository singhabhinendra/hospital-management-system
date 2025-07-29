'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function PricingPage() {
  const router = useRouter()
  const [billingCycle, setBillingCycle] = useState('monthly')

  const plans = [
    {
      name: "Starter",
      description: "Perfect for small clinics and practices",
      monthlyPrice: 99,
      yearlyPrice: 990,
      features: [
        "Up to 50 patients",
        "2 doctor profiles",
        "Basic appointment scheduling",
        "Patient records management",
        "Email support",
        "Mobile app access"
      ],
      color: "border-gray-200",
      buttonStyle: "bg-gray-600 hover:bg-gray-700 text-white"
    },
    {
      name: "Professional",
      description: "Ideal for growing medical practices",
      monthlyPrice: 299,
      yearlyPrice: 2990,
      features: [
        "Up to 500 patients",
        "10 doctor profiles",
        "Advanced scheduling",
        "Billing & invoicing",
        "Inventory management",
        "Basic reporting",
        "Phone & email support",
        "API access"
      ],
      color: "border-blue-500 ring-2 ring-blue-500",
      buttonStyle: "bg-blue-600 hover:bg-blue-700 text-white",
      popular: true
    },
    {
      name: "Enterprise",
      description: "For hospitals and large healthcare facilities",
      monthlyPrice: 799,
      yearlyPrice: 7990,
      features: [
        "Unlimited patients",
        "Unlimited staff profiles",
        "Multi-department management",
        "Advanced analytics",
        "Custom integrations",
        "White-label options",
        "24/7 priority support",
        "Dedicated account manager",
        "Custom training"
      ],
      color: "border-purple-500",
      buttonStyle: "bg-purple-600 hover:bg-purple-700 text-white"
    }
  ]

  const addons = [
    { name: "Telemedicine Module", price: 49, description: "Video consultations and remote monitoring" },
    { name: "Lab Integration", price: 99, description: "Connect with external laboratory systems" },
    { name: "Pharmacy Module", price: 79, description: "Prescription management and drug inventory" },
    { name: "Mobile App (Branded)", price: 199, description: "Custom branded mobile app for patients" },
    { name: "Advanced Analytics", price: 149, description: "AI-powered insights and predictive analytics" }
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
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            Simple, Transparent Pricing
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            Choose the perfect plan for your healthcare facility. All plans include a 30-day free trial.
          </p>
          
          {/* Billing Toggle */}
          <div className="flex items-center justify-center mb-12">
            <span className={`mr-3 ${billingCycle === 'monthly' ? 'text-gray-900 font-semibold' : 'text-gray-600'}`}>
              Monthly
            </span>
            <button
              onClick={() => setBillingCycle(billingCycle === 'monthly' ? 'yearly' : 'monthly')}
              className="relative inline-flex h-6 w-11 items-center rounded-full bg-gray-200 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  billingCycle === 'yearly' ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
            <span className={`ml-3 ${billingCycle === 'yearly' ? 'text-gray-900 font-semibold' : 'text-gray-600'}`}>
              Yearly
            </span>
            {billingCycle === 'yearly' && (
              <span className="ml-2 bg-green-100 text-green-800 text-xs font-medium px-2 py-1 rounded-full">
                Save 17%
              </span>
            )}
          </div>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {plans.map((plan, index) => (
              <div key={index} className={`bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 relative ${plan.color}`}>
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <span className="bg-blue-600 text-white px-4 py-2 rounded-full text-sm font-medium">
                      Most Popular
                    </span>
                  </div>
                )}
                
                <div className="text-center">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">{plan.name}</h3>
                  <p className="text-gray-600 mb-6">{plan.description}</p>
                  
                  <div className="mb-6">
                    <span className="text-5xl font-bold text-gray-900">
                      ${billingCycle === 'monthly' ? plan.monthlyPrice : plan.yearlyPrice}
                    </span>
                    <span className="text-gray-600 ml-2">
                      /{billingCycle === 'monthly' ? 'month' : 'year'}
                    </span>
                  </div>
                  
                  <button className={`w-full py-3 px-6 rounded-lg font-semibold transition-colors duration-300 ${plan.buttonStyle}`}>
                    Start Free Trial
                  </button>
                </div>
                
                <div className="mt-8">
                  <h4 className="text-lg font-semibold text-gray-900 mb-4">What&apos;s included:</h4>
                  <ul className="space-y-3">
                    {plan.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-start">
                        <div className="w-2 h-2 bg-green-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                        <span className="text-gray-700">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Add-ons Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Add-on Modules</h2>
            <p className="text-xl text-gray-600">Extend your HMS with specialized modules</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {addons.map((addon, index) => (
              <div key={index} className="bg-gray-50 rounded-xl p-6 hover:shadow-lg transition-shadow duration-300">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{addon.name}</h3>
                <p className="text-gray-600 mb-4">{addon.description}</p>
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-bold text-blue-600">${addon.price}/month</span>
                  <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors">
                    Add to Plan
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h2>
          </div>
          
          <div className="space-y-6">
            {[
              {
                question: "Is there a free trial available?",
                answer: "Yes! All plans come with a 30-day free trial. No credit card required to start."
              },
              {
                question: "Can I change plans at any time?",
                answer: "Absolutely. You can upgrade or downgrade your plan at any time. Changes take effect immediately."
              },
              {
                question: "What kind of support do you provide?",
                answer: "We provide email and phone support for all plans, with 24/7 priority support for Enterprise customers."
              },
              {
                question: "Is my data secure?",
                answer: "Yes, we use enterprise-grade security with end-to-end encryption and are HIPAA compliant."
              }
            ].map((faq, index) => (
              <div key={index} className="bg-white rounded-lg p-6 shadow-sm">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{faq.question}</h3>
                <p className="text-gray-600">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-white mb-6">
            Ready to Get Started?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Join thousands of healthcare providers using MediCare HMS
          </p>
          <button
            onClick={() => router.push('/signup')}
            className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300"
          >
            Start Your Free Trial
          </button>
        </div>
      </section>
    </div>
  )
}
