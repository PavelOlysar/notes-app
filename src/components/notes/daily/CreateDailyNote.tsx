'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { CalendarDays } from 'lucide-react'
import { createDailyNote, getTodayNote } from '@/actions/dailyNote.action'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { toast } from 'react-hot-toast'

export default function CreateDailyNote() {
  const router = useRouter()
  const [isCreating, setIsCreating] = useState(false)

  const handleCreate = async () => {
    setIsCreating(true)
    try {
      const todayNote = await getTodayNote()

      if (todayNote) {
        router.push(`/daily/${todayNote.id}`)
        return
      }

      const result = await createDailyNote()
      if (result.success) {
        toast.success("Created today's note")
        if (result.note) {
          router.push(`/daily/${result.note.id}`)
        } else {
          toast.error('Failed to create daily note')
        }
      } else {
        toast.error('Failed to create daily note')
      }
    } catch (error) {
      toast.error('Failed to create daily note')
    } finally {
      setIsCreating(false)
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Daily Note</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <CalendarDays className="h-4 w-4" />
            <span>
              {new Date().toLocaleDateString('en-US', {
                weekday: 'long',
                month: 'long',
                day: 'numeric',
              })}
            </span>
          </div>
          <Button
            className="w-full"
            size="sm"
            onClick={handleCreate}
            disabled={isCreating}
          >
            {isCreating ? 'Opening...' : "Open Today's Note"}
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
