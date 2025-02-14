'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { updateDailyWordsGoal } from '@/actions/settings.action'
import { toast } from 'react-hot-toast'

interface DailyNotesSettingsProps {
  currentWordsGoal: number
}

const MIN_WORDS = 100
const MAX_WORDS = 10000

export function DailyNotesSettings({
  currentWordsGoal,
}: DailyNotesSettingsProps) {
  const [wordsGoal, setWordsGoal] = useState(currentWordsGoal)
  const [isSaving, setIsSaving] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value)
    if (!isNaN(value)) {
      setWordsGoal(value)
    }
  }

  const handleSave = async () => {
    if (wordsGoal < MIN_WORDS || wordsGoal > MAX_WORDS) {
      toast.error(`Word goal must be between ${MIN_WORDS} and ${MAX_WORDS}`)
      return
    }

    setIsSaving(true)
    try {
      const result = await updateDailyWordsGoal(wordsGoal)
      if (result.success) {
        if (result.goal) {
          setWordsGoal(result.goal)
        }
        toast.success('Daily words goal updated')
      } else {
        toast.error('Failed to update daily words goal')
      }
    } catch (error) {
      toast.error('Failed to update daily words goal')
    } finally {
      setIsSaving(false)
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Daily Notes Settings</CardTitle>
        <CardDescription>
          Configure your daily notes preferences.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="wordsGoal">Daily Words Goal</Label>
          <div className="flex gap-2">
            <Input
              id="wordsGoal"
              type="number"
              min={MIN_WORDS}
              max={MAX_WORDS}
              value={wordsGoal}
              onChange={handleChange}
              className="max-w-[200px]"
            />
            <Button
              onClick={handleSave}
              disabled={isSaving || wordsGoal === currentWordsGoal}
            >
              {isSaving ? 'Saving...' : 'Save'}
            </Button>
          </div>
          <p className="text-sm text-muted-foreground">
            Set your daily writing goal ({MIN_WORDS}-{MAX_WORDS} words). Current
            goal: {currentWordsGoal} words
          </p>
        </div>
      </CardContent>
    </Card>
  )
}
