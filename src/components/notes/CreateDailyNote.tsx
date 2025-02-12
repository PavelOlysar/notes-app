import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { CalendarDays } from 'lucide-react'

export default function CreateDailyNote() {
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
          <Button className="w-full" size="sm">
            Create Today's Note
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
