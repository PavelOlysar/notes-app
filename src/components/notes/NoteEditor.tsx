'use client'

import { useState } from 'react'
import MDEditor from '@uiw/react-md-editor'
import { updateNote } from '@/actions/note.action'
import { Button } from '../ui/button'
import { EyeIcon, PencilIcon } from 'lucide-react'
import { toast } from 'react-hot-toast'
import { useTheme } from 'next-themes'

const fontSizeStyles = {
  sm: '[&_*]:!text-sm [&_.w-md-editor-text-pre]:!text-sm [&_.w-md-editor-text]:!text-sm [&_.w-md-editor-preview]:!text-sm',
  base: '[&_*]:!text-base [&_.w-md-editor-text-pre]:!text-base [&_.w-md-editor-text]:!text-base [&_.w-md-editor-preview]:!text-base',
  lg: '[&_*]:!text-lg [&_.w-md-editor-text-pre]:!text-lg [&_.w-md-editor-text]:!text-lg [&_.w-md-editor-preview]:!text-lg',
  xl: '[&_*]:!text-xl [&_.w-md-editor-text-pre]:!text-xl [&_.w-md-editor-text]:!text-xl [&_.w-md-editor-preview]:!text-xl',
}

interface NoteEditorProps {
  noteId: string
  initialContent: string
  fontSize?: string
}

export default function NoteEditor({
  noteId,
  initialContent,
  fontSize = 'base',
}: NoteEditorProps) {
  const [content, setContent] = useState(initialContent)
  const [isPreview, setIsPreview] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const { theme } = useTheme()

  const fontSizeClass =
    fontSizeStyles[fontSize as keyof typeof fontSizeStyles] || 'text-base'

  const handleSave = async () => {
    setIsSaving(true)
    try {
      const result = await updateNote(noteId, content)
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
    <div className={`prose prose-sm dark:prose-invert max-w-none`}>
      <div className="flex justify-between items-center">
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setIsPreview(!isPreview)}
          >
            {isPreview ? (
              <>
                <PencilIcon className="size-4" /> Edit
              </>
            ) : (
              <>
                <EyeIcon className="size-4" /> Preview
              </>
            )}
          </Button>
        </div>
        <Button onClick={handleSave} disabled={isSaving} size="sm">
          {isSaving ? 'Saving...' : 'Save'}
        </Button>
      </div>

      <div
        data-color-mode={theme}
        className={`${fontSizeClass} editor-wrapper`}
      >
        {isPreview ? (
          <MDEditor.Markdown
            source={content}
            className={`min-h-[500px] p-2 border rounded-sm`}
          />
        ) : (
          <MDEditor
            value={content}
            onChange={(value) => setContent(value || '')}
            preview="edit"
            hideToolbar={true}
            className={`min-h-[500px]`}
          />
        )}
      </div>
    </div>
  )
}
