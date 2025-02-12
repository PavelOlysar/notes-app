'use server'

import prisma from '@/lib/prisma'
import { getDbUserId } from './user.action'
import { revalidatePath } from 'next/cache'

export async function createNote(title: string, tags: string[]) {
  try {
    const userId = await getDbUserId()

    const existingNote = await prisma.note.findFirst({
      where: {
        title: title.trim(),
        authorId: userId,
      },
    })

    if (existingNote) {
      return {
        success: false,
        error: 'A note with this title already exists',
      }
    }

    const note = await prisma.note.create({
      data: {
        title: title.trim(),
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

export async function updateNote(id: string, content: string) {
  try {
    const userId = await getDbUserId()
    const note = await prisma.note.update({
      where: {
        id,
        authorId: userId,
      },
      data: {
        content,
        updatedAt: new Date(),
      },
    })
    revalidatePath(`/notes/${id}`)
    return { success: true, note }
  } catch (error) {
    console.error('Failed to update note:', error)
    return { success: false, error }
  }
}

export async function getNotes() {
  try {
    const userId = await getDbUserId()
    const notes = await prisma.note.findMany({
      where: {
        authorId: userId,
      },
      orderBy: {
        createdAt: 'desc',
      },
      select: {
        id: true,
        title: true,
        tags: true,
        createdAt: true,
        updatedAt: true,
      },
    })
    return notes
  } catch (error) {
    console.error('Failed to get notes:', error)
    return []
  }
}

export async function getNote(id: string) {
  try {
    const userId = await getDbUserId()
    const note = await prisma.note.findUnique({
      where: {
        id,
        authorId: userId,
      },
    })
    return note
  } catch (error) {
    console.error('Failed to get note:', error)
    return null
  }
}
