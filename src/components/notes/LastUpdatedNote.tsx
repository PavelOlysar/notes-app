import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { getLastUpdatedNote } from '@/actions/note.action'
import Link from 'next/link'
import { formatDate } from '@/lib/utils'

export default async function LastUpdatedNote() {
  const note = await getLastUpdatedNote()

  if (!note) {
    return (
      <Card className="mb-6 h-60">
        <CardHeader>
          <CardTitle className="text-lg">Last Updated Note</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">No notes yet :(</p>
        </CardContent>
      </Card>
    )
  }

  return (
    <Link href={`/notes/${note.id}`}>
      <Card className="mb-6 h-60">
        <CardHeader>
          <CardTitle className="text-lg">Last Updated Note</CardTitle>
        </CardHeader>
        <CardContent className="h-[calc(200px-theme(spacing.14))]">
          <div className="flex flex-col justify-between h-full">
            <div className="space-y-2">
              <h3 className="font-medium line-clamp-1">{note.title}</h3>
              <div className="flex gap-2 flex-wrap">
                {note.tags.map((tag) => (
                  <span
                    key={tag}
                    className="bg-primary/10 px-2 py-1 rounded-md text-xs"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
            <p className="text-xs text-muted-foreground">
              Updated {formatDate(note.updatedAt)}
            </p>
          </div>
        </CardContent>
      </Card>
    </Link>
  )
}
