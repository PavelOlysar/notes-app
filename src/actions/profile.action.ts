'use server'

import { auth } from '@clerk/nextjs/server'
import prisma from '@/lib/prisma'
import { revalidatePath } from 'next/cache'
import { getDbUserId } from './user.action'

interface ProfileUser {
  id: string
  username: string
  email: string
  image: string | null
  createdAt: Date
  updatedAt: Date
  _count: {
    dailyNotes: number
    notes: number
  }
}

export async function getProfileByUsername(
  username: string
): Promise<
  { success: true; user: ProfileUser } | { success: false; error: string }
> {
  try {
    const { userId } = await auth()
    if (!userId) {
      return { success: false, error: 'Unauthorized' }
    }

    const currentUser = await prisma.user.findFirst({
      where: { clerkId: userId },
    })

    if (!currentUser || currentUser.username !== username) {
      return { success: false, error: 'Unauthorized' }
    }

    const user = await prisma.user.findUnique({
      where: { username },
      select: {
        id: true,
        username: true,
        email: true,
        image: true,
        createdAt: true,
        updatedAt: true,
        _count: {
          select: { notes: true, dailyNotes: true },
        },
      },
    })

    if (!user) {
      return { success: false, error: 'User not found' }
    }

    return { success: true, user }
  } catch (error) {
    console.error('Failed to fetch profile:', error)
    return { success: false, error: 'Failed to fetch profile' }
  }
}

import { clerkClient } from '@clerk/nextjs/server'

export async function deleteProfile(username: string) {
  try {
    const { userId } = await auth()
    if (!userId) {
      return { success: false, error: 'Unauthorized' }
    }

    const currentUser = await prisma.user.findFirst({
      where: { clerkId: userId },
    })

    if (!currentUser || currentUser.username !== username) {
      return { success: false, error: 'Unauthorized' }
    }

    await prisma.user.delete({
      where: {
        username,
        clerkId: userId,
      },
    })

    const client = await clerkClient()
    await client.users.deleteUser(userId)

    revalidatePath('/')
    return { success: true }
  } catch (error) {
    console.error('Failed to delete profile:', error)
    return { success: false, error: 'Failed to delete profile' }
  }
}
