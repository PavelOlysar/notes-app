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
            <Card className="hover:bg-muted/50 transition-colors">
              <CardContent className="py-4">
                <div className="flex items-center justify-between">
                  <p className="font-medium">{formatDate(note.date)}</p>
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  )
}
