import { currentUser } from '@clerk/nextjs/server'
import { getNotes } from '@/actions/note.action'
import { redirect } from 'next/navigation'
import NotesList from '@/components/notes/NotesList'

export default async function Notes() {
  const user = await currentUser()

  if (!user) {
    redirect('/')
  }

  const notes = await getNotes()

  return (
    <div className="container py-6">
      <h1 className="text-2xl font-bold mb-6">Your Notes</h1>
      <NotesList notes={notes} />
    </div>
  )
}
