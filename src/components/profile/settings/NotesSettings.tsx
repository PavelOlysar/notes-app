'use client'

import { useState, useEffect } from 'react'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { updateNoteFontSize } from '@/actions/settings.action'
import { toast } from 'react-hot-toast'

const fontSizes = [
  { value: 'sm', label: 'Small' },
  { value: 'base', label: 'Medium' },
  { value: 'lg', label: 'Large' },
  { value: 'xl', label: 'Extra Large' },
]

interface NotesSettingsProps {
  initialFontSize: string
}

export function NotesSettings({ initialFontSize }: NotesSettingsProps) {
  const [fontSize, setFontSize] = useState<string>(initialFontSize)

  useEffect(() => {
    setFontSize(initialFontSize)
  }, [initialFontSize])

  const handleFontSizeChange = async (newSize: string) => {
    try {
      const result = await updateNoteFontSize(newSize)
      if (result.success) {
        setFontSize(newSize)
        toast.success('Font size updated')
      } else {
        toast.error('Failed to update font size')
        setFontSize(fontSize)
      }
    } catch (error) {
      toast.error('Failed to update font size')
      setFontSize(fontSize)
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Notes Settings</CardTitle>
        <CardDescription>
          Configure general notes settings and preferences.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <label className="text-sm font-medium">Note Font Size</label>
          <Select
            value={fontSize}
            onValueChange={handleFontSizeChange}
            defaultValue={initialFontSize}
          >
            <SelectTrigger className="w-full">
              <SelectValue>
                {fontSizes.find((size) => size.value === fontSize)?.label ||
                  'Medium'}
              </SelectValue>
            </SelectTrigger>
            <SelectContent>
              {fontSizes.map((size) => (
                <SelectItem key={size.value} value={size.value}>
                  {size.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </CardContent>
    </Card>
  )
}
