'use server'

import prisma from '@/lib/prisma'
import { getDbUserId } from './user.action'
import { revalidatePath } from 'next/cache'

export async function updateDailyWordsGoal(goal: number) {
  try {
    const userId = await getDbUserId()
    const user = await prisma.user.update({
      where: { id: userId },
      data: { dailyWordsGoal: goal },
      select: { dailyWordsGoal: true },
    })
    revalidatePath('/daily')
    return { success: true, goal: user.dailyWordsGoal }
  } catch (error) {
    console.error('Failed to update daily words goal:', error)
    return { success: false, error }
  }
}

export async function updateTheme(theme: string) {
  try {
    const userId = await getDbUserId()
    const user = await prisma.user.update({
      where: { id: userId },
      data: { theme },
      select: { theme: true },
    })
    return { success: true, theme: user.theme }
  } catch (error) {
    console.error('Failed to update theme:', error)
    return { success: false, error }
  }
}

export async function updateNoteFontSize(fontSize: string) {
  try {
    const userId = await getDbUserId()
    const user = await prisma.user.update({
      where: { id: userId },
      data: { noteFontSize: fontSize },
      select: { noteFontSize: true },
    })
    revalidatePath('/notes')
    return { success: true, fontSize: user.noteFontSize }
  } catch (error) {
    console.error('Failed to update note font size:', error)
    return { success: false, error }
  }
}
