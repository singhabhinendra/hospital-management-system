import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Features - MediCare HMS',
  description: 'Comprehensive hospital management features'
}

export default function FeaturesLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
