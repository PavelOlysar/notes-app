'use server'

import prisma from '@/lib/prisma'
import { getDbUserId } from './user.action'
import { revalidatePath } from 'next/cache'

export async function createNote(title: string, tags: string[]) {
  try {
    const userId = await getDbUserId()

    const note = await prisma.note.create({
      data: {
        title,
        authorId: userId,
        tags,
        content: '',
      },
    })

    revalidatePath('/notes')
    return { success: true, note }
  } catch (error) {
    console.error('Failed to create the note', error)
    return { success: false, error }
  }
}
