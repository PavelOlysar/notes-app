import HomeNotes from '@/components/HomeNotes'
import Welcome from '@/components/Welcome'
import { currentUser } from '@clerk/nextjs/server'
import LastUpdatedNote from '@/components/notes/LastUpdatedNote'
import CreateDailyNote from '@/components/notes/CreateDailyNote'

export default async function Home() {
  const user = await currentUser()
  if (!user) {
    return <Welcome />
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-10 gap-6">
      <div className="lg:col-span-6">
        <HomeNotes />
      </div>

      <div className="hidden lg:block lg:col-span-4 sticky top-20 space-y-6">
        <LastUpdatedNote />
        <CreateDailyNote />
      </div>
    </div>
  )
}
