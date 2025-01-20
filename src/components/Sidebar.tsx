'use server'

import { currentUser } from '@clerk/nextjs/server'
import UnauthenticatedSidebar from './UnauthenticatedSidebar'
import { getUserByClerkId } from '@/actions/user.action'

async function Sidebar() {
  const authUser = await currentUser()

  if (!authUser) return <UnauthenticatedSidebar />

  const user = getUserByClerkId(authUser.id)
  if (!user) return null

  console.log({ user })

  return <div>Sidebar</div>
}

export default Sidebar
