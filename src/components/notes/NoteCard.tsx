import { Note } from '@prisma/client'
import Link from 'next/link'
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { formatDate } from '@/lib/utils'

interface NoteCardProps {
  note: Pick<Note, 'id' | 'title' | 'tags' | 'createdAt' | 'updatedAt'>
}

export default function NoteCard({ note }: NoteCardProps) {
  return (
    <Link href={`/notes/${note.id}`}>
      <Card className="hover:bg-muted/50 transition-colors h-[100px] flex flex-col">
        <CardHeader className="flex-1 space-y-2">
          <div className="flex items-center justify-between gap-2">
            <CardTitle className="line-clamp-1 flex-1 text-base">
              {note.title}
            </CardTitle>
            {note.tags.length > 0 && (
              <Badge variant="secondary" className="shrink-0">
                {note.tags.length} {note.tags.length === 1 ? 'tag' : 'tags'}
              </Badge>
            )}
          </div>
          <CardDescription className="flex flex-col h-full justify-between">
            <div className="flex-1" />
            <p className="text-xs text-muted-foreground">
              {formatDate(note.createdAt)}
            </p>
          </CardDescription>
        </CardHeader>
      </Card>
    </Link>
  )
}
