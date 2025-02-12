'use server'

import prisma from '@/lib/prisma'
import { getDbUserId } from './user.action'
import { revalidatePath } from 'next/cache'

export async function createDailyNote() {
  try {
    const userId = await getDbUserId()
    const today = new Date()
    today.setHours(0, 0, 0, 0)

    const existingNote = await prisma.dailyNote.findFirst({
      where: {
        authorId: userId,
        date: today,
      },
    })

    if (existingNote) {
      return {
        success: true,
        note: existingNote,
        existed: true,
      }
    }

    const note = await prisma.dailyNote.create({
      data: {
        authorId: userId,
        date: today,
      },
    })

    revalidatePath('/daily')
    return { success: true, note, existed: false }
  } catch (error) {
    console.error('Failed to create daily note:', error)
    return { success: false, error }
  }
}

export async function updateDailyNote(id: string, content: string) {
  try {
    const userId = await getDbUserId()
    const note = await prisma.dailyNote.update({
      where: {
        id,
        authorId: userId,
      },
      data: {
        content,
      },
    })
    revalidatePath(`/daily/${id}`)
    return { success: true, note }
  } catch (error) {
    console.error('Failed to update daily note:', error)
    return { success: false, error }
  }
}

export async function getDailyNotes() {
  try {
    const userId = await getDbUserId()
    const notes = await prisma.dailyNote.findMany({
      where: {
        authorId: userId,
      },
      orderBy: {
        date: 'desc',
      },
    })
    return notes
  } catch (error) {
    console.error('Failed to get daily notes:', error)
    return []
  }
}

export async function getDailyNote(id: string) {
  try {
    const userId = await getDbUserId()
    const note = await prisma.dailyNote.findUnique({
      where: {
        id,
        authorId: userId,
      },
    })
    return note
  } catch (error) {
    console.error('Failed to get daily note:', error)
    return null
  }
}

export async function getTodayNote() {
  try {
    const userId = await getDbUserId()
    const today = new Date()
    today.setHours(0, 0, 0, 0)

    const note = await prisma.dailyNote.findFirst({
      where: {
        authorId: userId,
        date: today,
      },
    })

    return note
  } catch (error) {
    console.error('Failed to get today note:', error)
    return null
  }
}
