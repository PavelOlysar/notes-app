'use client'

import { useTheme } from 'next-themes'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { cn } from '@/lib/utils'
import { updateTheme } from '@/actions/settings.action'
import { useEffect, useState } from 'react'

const colorModes = [
  {
    id: 'system',
    name: 'System',
    className: 'bg-gradient-to-r from-white to-zinc-950 border border-zinc-200',
  },
  {
    id: 'light',
    name: 'Light',
    className: 'bg-white border border-zinc-200',
  },
  {
    id: 'dark',
    name: 'Dark',
    className: 'bg-zinc-950 border border-zinc-800',
  },
  {
    id: 'forest',
    name: 'Forest',
    className: 'bg-[#2f7c4d] border border-emerald-600',
  },
  {
    id: 'valentine',
    name: 'Valentine',
    className: 'bg-[#ff6b6b] border border-red-400',
  },
  {
    id: 'ocean',
    name: 'Ocean',
    className: 'bg-[#0ea5e9] border border-blue-400',
  },
  {
    id: 'rocky',
    name: 'Rocky',
    className: 'bg-[#8B7355] border border-stone-600',
  },
]
interface AppearanceSettingsProps {
  initialTheme: string
}

export function AppearanceSettings({ initialTheme }: AppearanceSettingsProps) {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const handleThemeChange = async (value: string) => {
    setTheme(value)
    await updateTheme(value)
  }

  if (!mounted) {
    return null
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Appearance Settings</CardTitle>
        <CardDescription>
          Customize the look and feel of your app.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <Label>Theme</Label>
          <RadioGroup
            defaultValue={initialTheme}
            value={theme}
            onValueChange={handleThemeChange}
            className="grid grid-cols-3 gap-4"
          >
            {colorModes.map((mode) => (
              <Label
                key={mode.id}
                className={cn(
                  'relative flex flex-col items-center gap-2 rounded-lg border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground cursor-pointer',
                  theme === mode.id && 'border-primary'
                )}
              >
                <RadioGroupItem value={mode.id} className="sr-only" />
                <div className={cn('h-10 w-10 rounded-full', mode.className)} />
                <span className="text-sm font-medium">{mode.name}</span>
              </Label>
            ))}
          </RadioGroup>
        </div>
      </CardContent>
    </Card>
  )
}
