'use client'

import { useState } from 'react'
import { Card, CardContent } from './ui/card'
import { Input } from './ui/input'
import { Button } from './ui/button'
import { Loader2Icon, PlusIcon, XIcon } from 'lucide-react'
import { createNote } from '@/actions/note.action'
import { Separator } from './ui/separator'
import toast from 'react-hot-toast'

function CreateNote() {
  const [title, setTitle] = useState('')
  const [tags, setTags] = useState<string[]>([])
  const [currentTag, setCurrentTag] = useState('')
  const [isPosting, setIsPosting] = useState(false)

  const handleAddTag = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && currentTag.trim()) {
      e.preventDefault()
      if (!tags.includes(currentTag.trim())) {
        setTags([...tags, currentTag.trim()])
      }
      setCurrentTag('')
    }
  }

  const removeTag = (tagToRemove: string) => {
    setTags(tags.filter((tag) => tag !== tagToRemove))
  }

  const handleSubmit = async () => {
    if (!title.trim()) return

    setIsPosting(true)
    try {
      const result = await createNote(title, tags)
      if (result.success) {
        setTitle('')
        setTags([])
        toast.success('Note created successfully!')
      }
    } catch (error) {
      console.error('Failed to create the note:', error)
      toast.error('Failed to create the note :(')
    } finally {
      setIsPosting(false)
    }
  }

  return (
    <Card className="mb-6">
      <CardContent>
        <div className="space-y-2">
          <Input
            placeholder="Write the title of your note..."
            className="min-h-[80px] resize-none border-none focus-visible:ring-0 p-0 text-base"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            disabled={isPosting}
          />
          <Separator />
          {tags.length > 0 && (
            <div className="flex flex-wrap gap-2 min-h-[32px] bg-secondary/20 p-2 rounded-md">
              {tags.map((tag) => (
                <span
                  key={tag}
                  className="bg-primary/10 text-primary px-3 py-1 rounded-full flex items-center gap-1 text-sm"
                >
                  {tag}
                  <button
                    onClick={() => removeTag(tag)}
                    className="hover:text-destructive transition-colors"
                  >
                    <XIcon className="size-4" />
                  </button>
                </span>
              ))}
            </div>
          )}
          <div className="flex gap-2">
            <Input
              placeholder="Add tags..."
              value={currentTag}
              onChange={(e) => setCurrentTag(e.target.value)}
              onKeyDown={handleAddTag}
              disabled={isPosting}
            />
            <Button
              size="sm"
              variant="secondary"
              onClick={() => {
                if (currentTag.trim()) {
                  if (!tags.includes(currentTag.trim())) {
                    setTags([...tags, currentTag.trim()])
                  }
                  setCurrentTag('')
                }
              }}
              disabled={!currentTag.trim() || isPosting}
            >
              Add Tag
            </Button>
            {tags.length > 0 && (
              <Button
                size="sm"
                variant="ghost"
                onClick={() => setTags([])}
                className="text-muted-foreground"
              >
                Clear All
              </Button>
            )}
          </div>
        </div>
        <div className="flex items-center justify-between pt-4">
          <Button
            className="flex items-center"
            onClick={handleSubmit}
            disabled={!title.trim() || isPosting}
          >
            {isPosting ? (
              <>
                <Loader2Icon className="size-4 mr-2 animate-spin" />
                Posting...
              </>
            ) : (
              <>
                <PlusIcon className="size-4 mr-2" />
                Create Note
              </>
            )}
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

export default CreateNote
