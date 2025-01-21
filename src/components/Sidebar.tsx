'use server'

import { currentUser } from '@clerk/nextjs/server'
import UnauthenticatedSidebar from './UnauthenticatedSidebar'
import { getUserByClerkId } from '@/actions/user.action'
import { Card, CardContent } from './ui/card'
import Link from 'next/link'
import { LinkIcon, MapPinIcon } from 'lucide-react'
import { Separator } from './ui/separator'
import { Avatar, AvatarImage } from './ui/avatar'

async function Sidebar() {
  const authUser = await currentUser()

  if (!authUser) return <UnauthenticatedSidebar />

  const user = await getUserByClerkId(authUser.id)
  if (!user) return null

  return (
    <div className="sticky top-20">
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col items-center text-center">
            <Link
              href={`/profile/${user.username}`}
              className="flex flex-col items-center justify-center"
            >
              <Avatar className="w-20 h-20 border-2 ">
                <AvatarImage src={user.image || '/avatar.png'} />
              </Avatar>

              <div className="mt-4 space-y-1">
                <h3 className="font-semibold">{user.username}</h3>
              </div>
            </Link>

            <div className="w-full">
              <Separator className="my-4" />
              <div className="flex items-center justify-center">
                <div>
                  <p className="font-medium">{user._count.notes}</p>
                  <p className="text-xs text-muted-foreground">notes</p>
                </div>
              </div>{' '}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default Sidebar
