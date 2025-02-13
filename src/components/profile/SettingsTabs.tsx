'use client'

import { Tabs, TabsContent } from '@/components/ui/tabs'
import { AccountSettings } from './settings/AccountSettings'
import { AppSettings } from './settings/AppSettings'
import { SettingsList } from './settings/SettingsList'
// import { NotesSettings } from './settings/NotesSettings'
// import { DailyNotesSettings } from './settings/DailyNotesSettings'
// import { AppearanceSettings } from './settings/AppearanceSettings'

interface SettingsTabsProps {
  username: string
}

export function SettingsTabs({ username }: SettingsTabsProps) {
  return (
    <Tabs defaultValue="app" className="w-full">
      <SettingsList />

      <TabsContent value="app">
        <AppSettings />
      </TabsContent>
      <TabsContent value="notes">{/* <NotesSettings /> */}</TabsContent>
      <TabsContent value="daily">{/* <DailyNotesSettings /> */}</TabsContent>
      <TabsContent value="appearance">
        {/* <AppearanceSettings /> */}
      </TabsContent>
      <TabsContent value="account">
        <AccountSettings username={username} />
      </TabsContent>
    </Tabs>
  )
}
