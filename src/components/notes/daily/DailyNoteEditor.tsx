'use client'

import { useState } from 'react'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import { updateDailyNote } from '@/actions/dailyNote.action'
import { toast } from 'react-hot-toast'

interface DailyNoteEditorProps {
  noteId: string
  initialContent: string
}

export default function DailyNoteEditor({
  noteId,
  initialContent,
}: DailyNoteEditorProps) {
  const [content, setContent] = useState(initialContent)
  const [isSaving, setIsSaving] = useState(false)

  const wordCount = content.trim() ? content.trim().split(/\s+/).length : 0
  const charCount = content.length

  const handleSave = async () => {
    setIsSaving(true)
    try {
      const result = await updateDailyNote(noteId, content)
      if (result.success) {
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
      <div className="flex justify-between items-center">
        <div className="text-sm text-muted-foreground space-x-4">
          <span>
            {wordCount} {wordCount === 1 ? 'word' : 'words'}
          </span>
          <span>
            {charCount} {charCount === 1 ? 'character' : 'characters'}
          </span>
        </div>
        <Button onClick={handleSave} disabled={isSaving} size="sm">
          {isSaving ? 'Saving...' : 'Save'}
        </Button>
      </div>
      <Textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        className="min-h-[500px] p-4 text-base leading-relaxed resize-none bg-background"
        placeholder="Write your daily note here..."
      />
    </div>
  )
}
