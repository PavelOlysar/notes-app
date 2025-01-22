import { Note } from '@prisma/client'
import NoteCard from './NoteCard'

interface NotesListProps {
  notes: Pick<Note, 'id' | 'title' | 'tags' | 'createdAt' | 'updatedAt'>[]
}

export default function NotesList({ notes }: NotesListProps) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {notes.map((note) => (
        <NoteCard key={note.id} note={note} />
      ))}
    </div>
  )
}
