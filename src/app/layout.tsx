import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { AuthProvider } from '@/contexts/AuthContext'
import GlobalStyles from '@/components/GlobalStyles'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Hospital Management System',
  description: 'Comprehensive hospital management and patient care system',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <GlobalStyles />
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  )
}
