import { Note } from '@prisma/client'
import Link from 'next/link'
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card'
import { formatDate } from '@/lib/utils'

interface NoteCardProps {
  note: Pick<Note, 'id' | 'title' | 'tags' | 'createdAt' | 'updatedAt'>
}

export default function NoteCard({ note }: NoteCardProps) {
  return (
    <Link href={`/notes/${note.id}`}>
      <Card className="hover:bg-muted/50 transition-colors">
        <CardHeader>
          <CardTitle className="line-clamp-1">{note.title}</CardTitle>
          <CardDescription>
            <div className="flex flex-wrap gap-2 mb-2">
              {note.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-xs bg-primary/10 px-2 py-1 rounded-md"
                >
                  {tag}
                </span>
              ))}
            </div>
            <div className="text-xs text-muted-foreground">
              Updated {formatDate(note.updatedAt)}
            </div>
          </CardDescription>
        </CardHeader>
      </Card>
    </Link>
  )
}
