import { currentUser } from '@clerk/nextjs/server'
import { getNotes } from '@/actions/note.action'
import { redirect } from 'next/navigation'
import NotesList from '@/components/notes/NotesList'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export default async function Notes() {
  const user = await currentUser()

  if (!user) {
    redirect('/')
  }

  const notes = await getNotes()

  return (
    <Card>
      <CardHeader>
        <CardTitle>Your Notes</CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        <NotesList notes={notes} />
      </CardContent>
    </Card>
  )
}
