'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/contexts/AuthContext'
import LoadingSpinner from '@/components/LoadingSpinner'

export default function Home() {
  const { isAuthenticated, isLoading } = useAuth()
  const router = useRouter()
  const [showLanding, setShowLanding] = useState(false)

  useEffect(() => {
    if (!isLoading) {
      if (isAuthenticated) {
        router.push('/dashboard')
      } else {
        setShowLanding(true)
      }
    }
  }, [isAuthenticated, isLoading, router])

  // Show loading spinner while checking authentication
  if (isLoading) {
    return <LoadingSpinner />
  }

  // Show landing page for non-authenticated users
  if (!isAuthenticated && showLanding) {
    // Import landing page dynamically to reduce initial bundle
    const LandingPage = require('./landing/page').default
    return <LandingPage />
  }

  // Default loading state
  return <LoadingSpinner />
}
