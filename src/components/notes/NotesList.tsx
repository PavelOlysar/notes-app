import { Note } from '@prisma/client'
import NoteCard from './NoteCard'

interface NotesListProps {
  notes: Pick<Note, 'id' | 'title' | 'tags' | 'createdAt' | 'updatedAt'>[]
}

export default function NotesList({ notes }: NotesListProps) {
  return (
    <div className="max-w-4xl">
      {notes.map((note) => (
        <NoteCard key={note.id} note={note} />
      ))}
    </div>
  )
}
