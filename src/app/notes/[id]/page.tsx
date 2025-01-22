import { currentUser } from '@clerk/nextjs/server'
import { getNote } from '@/actions/note.action'
import { redirect } from 'next/navigation'

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
    <div className="container py-6">
      <h1 className="text-3xl font-bold mb-4">{note.title}</h1>
      <div className="flex gap-2 mb-6">
        {note.tags.map((tag) => (
          <span key={tag} className="bg-primary/10 px-3 py-1 rounded-md">
            {tag}
          </span>
        ))}
      </div>
      <div className="prose prose-sm dark:prose-invert">{note.content}</div>
    </div>
  )
}
