import { currentUser } from '@clerk/nextjs/server'
import { getDailyNotes } from '@/actions/dailyNote.action'
import { redirect } from 'next/navigation'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import Link from 'next/link'
import { formatDate } from '@/lib/utils'

export default async function DailyNotes() {
  const user = await currentUser()

  if (!user) {
    redirect('/')
  }

  const notes = await getDailyNotes()

  return (
    <div className="max-w-5xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Daily Notes</h1>
      <div className="space-y-4">
        {notes.map((note) => (
          <Link key={note.id} href={`/daily/${note.id}`}>
            <Card className="hover:bg-muted/50 transition-colors mb-2">
              <CardContent className="py-4">
                <div className="flex items-center justify-between">
                  <p className="font-medium">{formatDate(note.date)}</p>
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-muted-foreground">
                      {note.wordCount} words
                    </span>
                    <div className="w-[100px] h-1.5 bg-secondary rounded-full overflow-hidden">
                      <div
                        className="h-full bg-primary transition-all"
                        style={{
                          width: `${Math.min(
                            (note.wordCount / 750) * 100,
                            100
                          )}%`,
                        }}
                      />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  )
}
