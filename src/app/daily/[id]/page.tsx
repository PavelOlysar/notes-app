import { currentUser } from '@clerk/nextjs/server'
import { getDailyNote } from '@/actions/dailyNote.action'
import { redirect } from 'next/navigation'
import DailyNoteEditor from '@/components/notes/daily/DailyNoteEditor'
import { formatDate } from '@/lib/utils'

interface DailyNotePageProps {
  params: {
    id: string
  }
}

export default async function DailyNotePage({ params }: DailyNotePageProps) {
  const user = await currentUser()

  if (!user) {
    redirect('/')
  }

  const note = await getDailyNote(params.id)

  if (!note) {
    redirect('/daily')
  }

  return (
    <div className="max-w-5xl mx-auto px-4 py-6">
      <h1 className="text-3xl font-bold mb-6">{formatDate(note.date)}</h1>
      <DailyNoteEditor
        noteId={note.id}
        initialContent={note.content}
        initialWordCount={note.wordCount}
        date={note.date}
      />
    </div>
  )
}
