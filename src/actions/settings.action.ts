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
