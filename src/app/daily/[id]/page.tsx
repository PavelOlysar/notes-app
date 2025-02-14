import { currentUser } from '@clerk/nextjs/server'
import { getDailyNote } from '@/actions/dailyNote.action'
import { getCurrentUser } from '@/actions/user.action'
import { redirect } from 'next/navigation'
import DailyNoteEditor from '@/components/notes/daily/DailyNoteEditor'
import { formatDate } from '@/lib/utils'

interface DailyNotePageProps {
  params: {
    id: string
  }
}

export default async function DailyNotePage({ params }: DailyNotePageProps) {
  const clerkUser = await currentUser()
  if (!clerkUser) redirect('/')

  const [note, user] = await Promise.all([
    getDailyNote(params.id),
    getCurrentUser(),
  ])

  if (!note || !user) redirect('/daily')

  return (
    <div className="max-w-5xl mx-auto px-4 py-6">
      <h1 className="text-3xl font-bold mb-6">{formatDate(note.date)}</h1>
      <DailyNoteEditor
        noteId={note.id}
        initialContent={note.content}
        initialWordCount={note.wordCount}
        date={note.date}
        wordsGoal={user.dailyWordsGoal}
      />
    </div>
  )
}
