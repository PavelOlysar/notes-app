import HomeNotes from '@/components/HomeNotes'
import Welcome from '@/components/Welcome'
import { currentUser } from '@clerk/nextjs/server'

export default async function Home() {
  const user = await currentUser()
  return (
    <div className="grid grid-cols-1 lg:grid-cols-10 gap-6">
      <div className="lg:col-span-6">{user ? <HomeNotes /> : <Welcome />}</div>

      <div className="hidden lg:block lg:col-span-4 sticky top-20">
        CreateDailyNote, LastOpenedNote
      </div>
    </div>
  )
}
