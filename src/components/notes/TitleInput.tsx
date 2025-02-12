'use client'

import { useState } from 'react'
import { Input } from '@/components/ui/input'
import { updateNoteTitle } from '@/actions/note.action'
import { toast } from 'react-hot-toast'

interface TitleInputProps {
  noteId: string
  initialTitle: string
}

export default function TitleInput({ noteId, initialTitle }: TitleInputProps) {
  const [title, setTitle] = useState(initialTitle)
  const [isUpdating, setIsUpdating] = useState(false)

  const handleBlur = async () => {
    if (title.trim() === initialTitle) return

    setIsUpdating(true)
    const result = await updateNoteTitle(noteId, title)

    if (result.success) {
      toast.success('Title updated')
    } else {
      setTitle(initialTitle)
      toast.error('Failed to update title')
    }
    setIsUpdating(false)
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.currentTarget.blur()
    }
  }

  return (
    <Input
      value={title}
      onChange={(e) => setTitle(e.target.value)}
      onBlur={handleBlur}
      onKeyDown={handleKeyDown}
      disabled={isUpdating}
      placeholder="Untitled Note"
      className="text-4xl font-bold h-auto px-0 border-0 bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0"
      style={{ fontSize: '2.25rem' }}
    />
  )
}
