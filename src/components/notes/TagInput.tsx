'use client'

import { useState } from 'react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { X as XIcon, Plus as PlusIcon } from 'lucide-react'
import { updateNoteTags } from '@/actions/note.action'
import { toast } from 'react-hot-toast'

interface TagInputProps {
  noteId: string
  initialTags: string[]
}

export default function TagInput({ noteId, initialTags }: TagInputProps) {
  const [tags, setTags] = useState<string[]>(initialTags)
  const [input, setInput] = useState('')
  const [isUpdating, setIsUpdating] = useState(false)

  const handleAddTag = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim()) return

    const newTag = input.trim().toLowerCase()
    if (tags.includes(newTag)) {
      toast.error('Tag already exists')
      return
    }

    setIsUpdating(true)
    const newTags = [...tags, newTag]
    const result = await updateNoteTags(noteId, newTags)

    if (result.success) {
      setTags(newTags)
      setInput('')
      toast.success('Tag added')
    } else {
      toast.error('Failed to add tag')
    }
    setIsUpdating(false)
  }

  const removeTag = async (tagToRemove: string) => {
    setIsUpdating(true)
    const newTags = tags.filter((tag) => tag !== tagToRemove)
    const result = await updateNoteTags(noteId, newTags)

    if (result.success) {
      setTags(newTags)
      toast.success('Tag removed')
    } else {
      toast.error('Failed to remove tag')
    }
    setIsUpdating(false)
  }

  return (
    <div className="space-y-4">
      <form onSubmit={handleAddTag} className="flex gap-2">
        <Input
          placeholder="Add a tag..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          disabled={isUpdating}
          className="text-base"
        />
        <Button
          type="submit"
          size="icon"
          disabled={isUpdating || !input.trim()}
          className="h-10 w-10"
        >
          <PlusIcon className="h-5 w-5" />
        </Button>
      </form>
      <div className="flex flex-wrap gap-3">
        {tags.map((tag) => (
          <Badge
            key={tag}
            variant="secondary"
            className="px-3 py-1.5 text-sm font-medium flex items-center"
          >
            <p>{tag}</p>
            <button
              onClick={() => removeTag(tag)}
              className="ml-2 hover:text-destructive transition-colors"
              disabled={isUpdating}
            >
              <XIcon className="h-5 w-5" />
            </button>
          </Badge>
        ))}
      </div>
    </div>
  )
}
