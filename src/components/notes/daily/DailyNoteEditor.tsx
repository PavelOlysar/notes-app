'use client'

import { useState, useEffect } from 'react'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { updateDailyNote } from '@/actions/dailyNote.action'
import { toast } from 'react-hot-toast'
import { cn } from '@/lib/utils'

interface DailyNoteEditorProps {
  noteId: string
  initialContent: string
  initialWordCount: number
  date: Date
  wordsGoal: number
}

export default function DailyNoteEditor({
  noteId,
  initialContent,
  initialWordCount,
  date,
  wordsGoal,
}: DailyNoteEditorProps) {
  const [content, setContent] = useState(initialContent)
  const [wordCount, setWordCount] = useState(initialWordCount)
  const [isSaving, setIsSaving] = useState(false)

  // Check if note is from today
  const isToday = new Date(date).toDateString() === new Date().toDateString()

  // Word counting
  useEffect(() => {
    const words = content.trim() ? content.trim().split(/\s+/).length : 0
    setWordCount(words)
  }, [content])
  const progress = Math.min((wordCount / wordsGoal) * 100, 100)

  // Saving
  const handleSave = async () => {
    if (!isToday) return
    setIsSaving(true)
    try {
      const result = await updateDailyNote(noteId, content)
      if (result.success) {
        if (result.note) {
          setWordCount(result.note.wordCount)
        }
        toast.success('Note saved!')
      } else {
        toast.error('Failed to save note')
      }
    } catch (error) {
      toast.error('Failed to save note')
    } finally {
      setIsSaving(false)
    }
  }

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <div className="flex justify-between items-center text-sm">
          <div className="text-muted-foreground">
            <span>
              {wordCount} / {wordsGoal} words
            </span>
          </div>
          {isToday && (
            <>
              <span className="font-medium">{progress.toFixed(1)}%</span>
            </>
          )}
        </div>
        {isToday && <Progress value={progress} className="h-1.5" />}
      </div>
      {isToday && (
        <div className="flex justify-end">
          <Button onClick={handleSave} disabled={isSaving} size="sm">
            {isSaving ? 'Saving...' : 'Save'}
          </Button>
        </div>
      )}
      <Textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        className={cn(
          'min-h-[500px] p-4 text-base leading-relaxed resize-none bg-background',
          !isToday &&
            'cursor-not-allowed opacity-80 focus:ring-0 focus-visible:ring-0'
        )}
        placeholder="Write your daily note here..."
        readOnly={!isToday}
        tabIndex={isToday ? 0 : -1}
      />
    </div>
  )
}
