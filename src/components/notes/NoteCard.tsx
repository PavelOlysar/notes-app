import { Note } from '@prisma/client'
import Link from 'next/link'
import { Card, CardHeader } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { formatDate } from '@/lib/utils'

interface NoteCardProps {
  note: Pick<Note, 'id' | 'title' | 'tags' | 'createdAt' | 'updatedAt'>
}

export default function NoteCard({ note }: NoteCardProps) {
  return (
    <Link href={`/notes/${note.id}`}>
      <Card className="hover:bg-muted/50 transition-colors h-16 mb-2">
        <CardHeader className="flex flex-row items-center justify-between h-full py-3">
          <h3 className="font-medium text-base line-clamp-1 flex-1">
            {note.title}
          </h3>
          <div className="flex items-center gap-4">
            {note.tags.length > 0 && (
              <div className="flex gap-2">
                {note.tags.slice(0, 2).map((tag) => (
                  <Badge key={tag} variant="secondary" className="px-2 py-0.5">
                    {tag}
                  </Badge>
                ))}
                {note.tags.length > 2 && (
                  <span className="text-xs text-muted-foreground">
                    +{note.tags.length - 2}
                  </span>
                )}
              </div>
            )}
            <span className="text-xs text-muted-foreground whitespace-nowrap">
              {formatDate(note.createdAt)}
            </span>
          </div>
        </CardHeader>
      </Card>
    </Link>
  )
}
