'use client'

import { memo } from 'react'

const LoadingSpinner = memo(() => (
  <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-green-50">
    <div className="text-center">
      <div className="relative">
        {/* Simple, fast loading spinner */}
        <div className="w-12 h-12 border-3 border-blue-200 border-t-blue-600 rounded-full animate-spin mx-auto"></div>
      </div>
      <p className="mt-4 text-gray-600 font-medium">Loading...</p>
    </div>
  </div>
))

LoadingSpinner.displayName = 'LoadingSpinner'

export default LoadingSpinner
