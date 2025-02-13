'use client'

import { TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Settings, Book, CalendarDays, Palette, UserCog } from 'lucide-react'

export function SettingsList() {
  return (
    <TabsList className="grid grid-cols-5 mb-4">
      <TabsTrigger value="app" className="flex items-center gap-2">
        <Settings className="h-4 w-4" />
        App
      </TabsTrigger>
      <TabsTrigger value="notes" className="flex items-center gap-2">
        <Book className="h-4 w-4" />
        Notes
      </TabsTrigger>
      <TabsTrigger value="daily" className="flex items-center gap-2">
        <CalendarDays className="h-4 w-4" />
        Daily Notes
      </TabsTrigger>
      <TabsTrigger value="appearance" className="flex items-center gap-2">
        <Palette className="h-4 w-4" />
        Appearance
      </TabsTrigger>
      <TabsTrigger value="account" className="flex items-center gap-2">
        <UserCog className="h-4 w-4" />
        Account
      </TabsTrigger>
    </TabsList>
  )
}
