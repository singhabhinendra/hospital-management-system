'use client'

import { useRouter } from 'next/navigation'

export default function PrivacyPage() {
  const router = useRouter()

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

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="bg-white rounded-2xl shadow-lg p-8">
          <div className="text-center mb-12">
            <div className="text-6xl mb-6">🔒</div>
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Privacy Policy</h1>
            <p className="text-gray-600">Last updated: January 1, 2024</p>
          </div>

          <div className="prose prose-lg max-w-none">
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Introduction</h2>
              <p className="text-gray-700 mb-4">
                At MediCare HMS, we are committed to protecting your privacy and ensuring the security of your personal and health information. 
                This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our hospital management system.
              </p>
              <p className="text-gray-700">
                We are fully compliant with the Health Insurance Portability and Accountability Act (HIPAA) and other applicable privacy regulations.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Information We Collect</h2>
              
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Personal Information</h3>
              <ul className="list-disc pl-6 mb-4 text-gray-700">
                <li>Name, email address, phone number</li>
                <li>Professional credentials and license information</li>
                <li>Employment information and department</li>
                <li>Login credentials and access preferences</li>
              </ul>

              <h3 className="text-xl font-semibold text-gray-900 mb-3">Health Information (PHI)</h3>
              <ul className="list-disc pl-6 mb-4 text-gray-700">
                <li>Patient medical records and health history</li>
                <li>Treatment plans and medication information</li>
                <li>Diagnostic results and test outcomes</li>
                <li>Billing and insurance information</li>
              </ul>

              <h3 className="text-xl font-semibold text-gray-900 mb-3">Technical Information</h3>
              <ul className="list-disc pl-6 mb-4 text-gray-700">
                <li>IP addresses and device information</li>
                <li>Browser type and operating system</li>
                <li>Usage patterns and system interactions</li>
                <li>Login times and access logs</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">How We Use Your Information</h2>
              
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Primary Uses</h3>
              <ul className="list-disc pl-6 mb-4 text-gray-700">
                <li>Provide and maintain our hospital management services</li>
                <li>Process and manage patient care activities</li>
                <li>Enable communication between healthcare providers</li>
                <li>Generate reports and analytics for healthcare operations</li>
              </ul>

              <h3 className="text-xl font-semibold text-gray-900 mb-3">Secondary Uses</h3>
              <ul className="list-disc pl-6 mb-4 text-gray-700">
                <li>Improve our services and user experience</li>
                <li>Ensure system security and prevent fraud</li>
                <li>Comply with legal and regulatory requirements</li>
                <li>Provide customer support and technical assistance</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Information Sharing and Disclosure</h2>
              
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-4">
                <p className="text-yellow-800 font-semibold">
                  We do not sell, trade, or rent your personal information to third parties.
                </p>
              </div>

              <h3 className="text-xl font-semibold text-gray-900 mb-3">Permitted Disclosures</h3>
              <ul className="list-disc pl-6 mb-4 text-gray-700">
                <li>With your explicit consent</li>
                <li>To authorized healthcare providers involved in patient care</li>
                <li>As required by law or legal process</li>
                <li>To prevent serious harm to health or safety</li>
                <li>For payment and healthcare operations purposes</li>
              </ul>

              <h3 className="text-xl font-semibold text-gray-900 mb-3">Service Providers</h3>
              <p className="text-gray-700 mb-4">
                We may share information with trusted service providers who assist us in operating our platform, 
                conducting business, or servicing you. These providers are bound by strict confidentiality agreements 
                and are only permitted to use your information for specified purposes.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Data Security</h2>
              
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Technical Safeguards</h3>
              <ul className="list-disc pl-6 mb-4 text-gray-700">
                <li>End-to-end encryption using AES-256 standards</li>
                <li>Secure data transmission via TLS 1.3</li>
                <li>Multi-factor authentication for all accounts</li>
                <li>Regular security audits and penetration testing</li>
                <li>24/7 security monitoring and threat detection</li>
              </ul>

              <h3 className="text-xl font-semibold text-gray-900 mb-3">Administrative Safeguards</h3>
              <ul className="list-disc pl-6 mb-4 text-gray-700">
                <li>Role-based access controls</li>
                <li>Regular employee security training</li>
                <li>Incident response procedures</li>
                <li>Business continuity planning</li>
              </ul>

              <h3 className="text-xl font-semibold text-gray-900 mb-3">Physical Safeguards</h3>
              <ul className="list-disc pl-6 mb-4 text-gray-700">
                <li>Secure data centers with biometric access</li>
                <li>Environmental controls and monitoring</li>
                <li>Redundant backup systems</li>
                <li>Equipment disposal procedures</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Your Rights</h2>
              
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Access and Control</h3>
              <ul className="list-disc pl-6 mb-4 text-gray-700">
                <li>Right to access your personal information</li>
                <li>Right to request corrections or updates</li>
                <li>Right to request deletion of your data</li>
                <li>Right to restrict processing of your information</li>
                <li>Right to data portability</li>
              </ul>

              <h3 className="text-xl font-semibold text-gray-900 mb-3">HIPAA Rights</h3>
              <ul className="list-disc pl-6 mb-4 text-gray-700">
                <li>Right to request restrictions on use and disclosure</li>
                <li>Right to request confidential communications</li>
                <li>Right to inspect and copy your health information</li>
                <li>Right to amend your health information</li>
                <li>Right to an accounting of disclosures</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Data Retention</h2>
              <p className="text-gray-700 mb-4">
                We retain your information only as long as necessary to fulfill the purposes outlined in this privacy policy, 
                unless a longer retention period is required or permitted by law. Healthcare records are typically retained 
                for a minimum of 7 years or as required by applicable regulations.
              </p>
              <p className="text-gray-700">
                When we no longer need your information, we will securely delete or anonymize it in accordance with 
                our data retention and disposal procedures.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">International Data Transfers</h2>
              <p className="text-gray-700 mb-4">
                Your information may be transferred to and processed in countries other than your own. We ensure that 
                such transfers comply with applicable data protection laws and implement appropriate safeguards to 
                protect your information.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Children&apos;s Privacy</h2>
              <p className="text-gray-700 mb-4">
                Our services are not intended for individuals under the age of 18, except when accessing patient portals 
                with parental consent or as authorized representatives. We do not knowingly collect personal information 
                from children under 18 without appropriate consent.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Changes to This Policy</h2>
              <p className="text-gray-700 mb-4">
                We may update this Privacy Policy from time to time to reflect changes in our practices or applicable laws. 
                We will notify you of any material changes by posting the updated policy on our website and, where required, 
                obtaining your consent.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Contact Information</h2>
              <p className="text-gray-700 mb-4">
                If you have any questions about this Privacy Policy or our privacy practices, please contact us:
              </p>
              
              <div className="bg-gray-50 rounded-lg p-6">
                <h3 className="font-semibold text-gray-900 mb-2">Privacy Officer</h3>
                <p className="text-gray-700 mb-1">Email: privacy@medicare-hms.com</p>
                <p className="text-gray-700 mb-1">Phone: +1 (555) 123-4567</p>
                <p className="text-gray-700 mb-1">Address: 123 Healthcare Drive, Medical City, MC 12345</p>
              </div>
            </section>

            <div className="border-t border-gray-200 pt-8">
              <p className="text-sm text-gray-500 text-center">
                This Privacy Policy is effective as of January 1, 2024, and was last updated on January 1, 2024.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
