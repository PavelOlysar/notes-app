import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Wiki - Notes App',
  description: 'Documentation and guides for the Notes App',
}

export default function WikiLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="max-w-7xl mx-auto px-4">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-12">{children}</div>
      </div>
    </div>
  )
}
