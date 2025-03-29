import Sidebar from '@/components/Sidebar'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'My Notes - Notes App',
  description: 'View and manage all your notes in one place',
}

export default function NotesLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="max-w-7xl mx-auto px-4">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="hidden lg:block lg:col-span-3">
          <Sidebar />
        </div>
        <div className="lg:col-span-9">{children}</div>
      </div>
    </div>
  )
}
