import prisma from '@/shared/infrastructure/database/db'
import { Activity, activitySelect } from '../infrastructure/activity.mapper'
import { AppError } from '@/shared/domain/errors/app-error'
import { ActivityService } from '../contracts/activity.contract'

export const activityService: ActivityService = {
  getMany(): Promise<Activity[]> {
    return prisma.activity.findMany({
      select: activitySelect,
      orderBy: { createdAt: 'asc' }
    })
  },

  async getById(activityId: string): Promise<Activity> {
    const activity = await prisma.activity.findUnique({
      where: { id: activityId },
      select: activitySelect
    })

    if (!activity) {
      throw new AppError('Actividad no encontrada.', true)
    }

    return activity
  },

  async delete(activityId: string): Promise<Activity> {
    const activity = await prisma.activity.findUnique({
      where: { id: activityId }
    })

    if (!activity) {
      throw new AppError('Actividad no encontrada.', true)
    }

    return prisma.activity.delete({
      where: { id: activityId },
      select: activitySelect
    })
  }
}
