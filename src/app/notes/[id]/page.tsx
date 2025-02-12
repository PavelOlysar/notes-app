import { currentUser } from '@clerk/nextjs/server'
import { getNote } from '@/actions/note.action'
import { redirect } from 'next/navigation'
import NoteEditor from '@/components/notes/NoteEditor'
import TagInput from '@/components/notes/TagInput'
import TitleInput from '@/components/notes/TitleInput'

interface NotePageProps {
  params: {
    id: string
  }
}

export default async function NotePage({ params }: NotePageProps) {
  const user = await currentUser()

  if (!user) {
    redirect('/')
  }

  const note = await getNote(params.id)

  if (!note) {
    redirect('/notes')
  }

  return (
    <div className="max-w-5xl mx-auto px-4 py-6">
      <div className="mb-4">
        <TitleInput noteId={note.id} initialTitle={note.title} />
      </div>
      <div className="mb-6">
        <TagInput noteId={note.id} initialTags={note.tags} />
      </div>
      <NoteEditor noteId={note.id} initialContent={note.content} />
    </div>
  )
}
