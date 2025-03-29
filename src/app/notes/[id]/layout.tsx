import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Note Details - Notes App',
  description: 'View and edit your note',
}

export default function NotePageLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <div className="max-w-5xl mx-auto px-4">{children}</div>
}
