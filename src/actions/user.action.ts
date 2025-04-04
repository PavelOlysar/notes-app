'use server'

import prisma from '@/lib/prisma'
import { auth, currentUser } from '@clerk/nextjs/server'

export async function syncUser() {
  try {
    const { userId } = await auth()
    const user = await currentUser()

    if (!userId || !user) return

    const existingUser = await prisma.user.findUnique({
      where: { clerkId: userId },
    })

    if (existingUser) return existingUser

    const dbUser = await prisma.user.create({
      data: {
        clerkId: userId,
        username:
          user.username ?? user.emailAddresses[0].emailAddress.split('@')[0],
        email: user.emailAddresses[0].emailAddress,
        image: user.imageUrl,
      },
    })

    return dbUser
  } catch (error) {
    console.log('Error in syncUser', error)
  }
}

export async function getUserByClerkId(clerkId: string) {
  return prisma.user.findUnique({
    where: { clerkId: clerkId },
    include: {
      _count: {
        select: {
          notes: true,
          dailyNotes: true,
        },
      },
    },
  })
}

export async function getCurrentUser() {
  const clerkUser = await currentUser()
  if (!clerkUser) return null

  const user = await prisma.user.findUnique({
    where: { clerkId: clerkUser.id },
    select: {
      id: true,
      dailyWordsGoal: true,
    },
  })

  return user
}

export async function getDbUserId() {
  const { userId: clerkId } = await auth()
  if (!clerkId) throw new Error('Unauthorized')

  const user = await getUserByClerkId(clerkId)
  if (!user) throw new Error('User not found')

  return user.id
}
