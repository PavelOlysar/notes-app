'use client'

import { Note } from '@prisma/client'
import Link from 'next/link'
import { Card, CardHeader } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { formatDate } from '@/lib/utils'
import { Trash2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { deleteNote } from '@/actions/note.action'
import { useState } from 'react'
import { toast } from 'react-hot-toast'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog'

interface NoteCardProps {
  note: Pick<Note, 'id' | 'title' | 'tags' | 'createdAt' | 'updatedAt'>
}

export default function NoteCard({ note }: NoteCardProps) {
  const [isDeleting, setIsDeleting] = useState(false)

  const handleDelete = async () => {
    setIsDeleting(true)
    try {
      const result = await deleteNote(note.id)
      if (result.success) {
        toast.success('Note deleted')
      } else {
        toast.error('Failed to delete note')
      }
    } catch (error) {
      toast.error('Failed to delete note')
    } finally {
      setIsDeleting(false)
    }
  }

  return (
    <div className="group relative">
      <Link href={`/notes/${note.id}`}>
        <Card className="hover:bg-muted/50 transition-colors h-16 mb-2">
          <CardHeader className="flex flex-row items-center justify-between h-full py-3">
            <h3 className="font-medium text-base line-clamp-1 flex-1">
              {note.title}
            </h3>
            <div className="flex items-center gap-4 mr-7">
              {note.tags.length > 0 && (
                <div className="flex gap-2">
                  {note.tags.slice(0, 2).map((tag) => (
                    <Badge
                      key={tag}
                      variant="secondary"
                      className="px-2 py-0.5"
                    >
                      {tag}
                    </Badge>
                  ))}
                  {note.tags.length > 2 && (
                    <span className="text-xs text-muted-foreground">
                      +{note.tags.length - 2}
                    </span>
                  )}
                </div>
              )}
              <span className="text-xs text-muted-foreground whitespace-nowrap">
                {formatDate(note.createdAt)}
              </span>
            </div>
          </CardHeader>
        </Card>
      </Link>
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            className="absolute right-2 top-1/2 -translate-y-1/2 opacity-100"
            disabled={isDeleting}
          >
            <Trash2 className="h-4 w-4 text-muted-foreground hover:text-destructive transition-colors" />
          </Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Note</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete "{note.title}"? This action cannot
              be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={isDeleting}>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              disabled={isDeleting}
              className="bg-destructive hover:bg-destructive/90"
            >
              {isDeleting ? 'Deleting...' : 'Delete'}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}
