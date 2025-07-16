import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { AuthProvider } from '@/contexts/AuthContext'
import GlobalStyles from '@/components/GlobalStyles'

// Optimize font loading
const inter = Inter({ 
  subsets: ['latin'],
  display: 'swap', // Improve font loading performance
  preload: true
})

export const metadata: Metadata = {
  title: 'Hospital Management System',
  description: 'Comprehensive hospital management and patient care system',
  viewport: 'width=device-width, initial-scale=1',
  robots: 'index, follow',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        {/* Preload critical resources */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="//localhost:5000" />
      </head>
      <body className={inter.className}>
        <GlobalStyles />
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  )
}
