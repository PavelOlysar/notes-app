'use client'

import { Tabs, TabsContent } from '@/components/ui/tabs'
import { AccountSettings } from './settings/AccountSettings'
import { AppSettings } from './settings/AppSettings'
import { SettingsList } from './settings/SettingsList'
import { NotesSettings } from './settings/NotesSettings'
import { DailyNotesSettings } from './settings/DailyNotesSettings'
import { AppearanceSettings } from './settings/AppearanceSettings'

interface SettingsTabsProps {
  username: string
  dailyWordsGoal: number
  theme: string
  noteFontSize: string
}

export function SettingsTabs({
  username,
  dailyWordsGoal,
  theme,
  noteFontSize,
}: SettingsTabsProps) {
  return (
    <Tabs defaultValue="app" className="w-full">
      <SettingsList />
      <TabsContent value="app">
        <AppSettings />
      </TabsContent>
      <TabsContent value="notes">
        <NotesSettings initialFontSize={noteFontSize} />
      </TabsContent>
      <TabsContent value="daily">
        <DailyNotesSettings currentWordsGoal={dailyWordsGoal} />
      </TabsContent>
      <TabsContent value="appearance">
        <AppearanceSettings initialTheme={theme} />
      </TabsContent>
      <TabsContent value="account">
        <AccountSettings username={username} />
      </TabsContent>
    </Tabs>
  )
}
