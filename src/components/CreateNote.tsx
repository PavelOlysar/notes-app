'use client'

import { useUser } from '@clerk/nextjs'
import { useState } from 'react'
import { Card, CardContent } from './ui/card'
import { Input } from './ui/input'
import { Button } from './ui/button'
import { Loader2Icon, PlusIcon } from 'lucide-react'

function CreateNote() {
  const { user } = useUser()
  const [content, setContent] = useState('')
  const [isPosting, setIsPosting] = useState(false)

  const handleSubmit = async () => {}

  return (
    <Card className="mb-6">
      <CardContent>
        <div className="space-y-2">
          <Input
            placeholder="Write the title of your note..."
            className="min-h-[100px] resize-none border-none focus-visible:ring-0 p-0 text-base"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            disabled={isPosting}
          />
        </div>
        <div className="flex items-center justify-between border-t pt-4">
          <Button
            className="flex items-center"
            onClick={handleSubmit}
            disabled={!content.trim() || isPosting}
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
