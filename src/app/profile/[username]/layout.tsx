import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Profile - Notes App',
  description: 'View and manage your profile settings',
}

export default function ProfileLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <div className="max-w-5xl mx-auto px-4">{children}</div>
}
