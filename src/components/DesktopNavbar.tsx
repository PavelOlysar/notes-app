import {
  StickyNoteIcon,
  HomeIcon,
  UserIcon,
  CalendarDays,
  BookOpen,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { SignInButton, UserButton } from '@clerk/nextjs'
import { currentUser } from '@clerk/nextjs/server'
import dynamic from 'next/dynamic'

const ModeToggle = dynamic(() => import('./ModeToggle'), {
  ssr: false,
})

async function DesktopNavbar() {
  const user = await currentUser()

  return (
    <div className="hidden md:flex items-center space-x-4">
      <ModeToggle />

      <Button variant="ghost" className="flex items-center gap-2" asChild>
        <Link href="/">
          <HomeIcon className="w-4 h-4" />
          <span className="hidden lg:inline">Home</span>
        </Link>
      </Button>

      <Button variant="ghost" className="flex items-center gap-2" asChild>
        <Link href="/wiki">
          <BookOpen className="w-4 h-4" />
          <span className="hidden lg:inline">Wiki</span>
        </Link>
      </Button>

      {user ? (
        <>
          <Button variant="ghost" className="flex items-center gap-2" asChild>
            <Link href="/notes">
              <StickyNoteIcon className="w-4 h-4" />
              <span className="hidden lg:inline">Notes</span>
            </Link>
          </Button>
          <Button variant="ghost" className="flex items-center gap-2" asChild>
            <Link href="/daily/history">
              <CalendarDays className="w-4 h-4" />
              <span className="hidden lg:inline">Daily Notes</span>
            </Link>
          </Button>
          <Button variant="ghost" className="flex items-center gap-2" asChild>
            <Link
              href={`/profile/${
                user.username ??
                user.emailAddresses[0].emailAddress.split('@')[0]
              }`}
            >
              <UserIcon className="w-4 h-4" />
              <span className="hidden lg:inline">Profile</span>
            </Link>
          </Button>
          <UserButton />
        </>
      ) : (
        <SignInButton mode="modal">
          <Button variant="default">Sign In</Button>
        </SignInButton>
      )}
    </div>
  )
}
export default DesktopNavbar
