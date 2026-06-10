'use server'

import { handleAction } from '@/shared/infrastructure/handlers/handle-action'
import { activityService } from '../services/activity.service'
import { validateId } from '@/shared/utils/validations'
import { revalidatePath } from 'next/cache'

export const getActivities = async () =>
  handleAction(() => activityService.getMany())

export const getRecentActivities = async () =>
  handleAction(() => activityService.getRecents())

export const getActivity = async (activityId: string) =>
  handleAction(() => {
    const validatedId = validateId(activityId)
    return activityService.getById(validatedId)
  })

export const deleteActivity = async (activityId: string) =>
  handleAction(
    async () => {
      const validatedId = validateId(activityId)
      const res = await activityService.delete(validatedId)
      revalidatePath('/admin/activities')
      return res
    },
    { successMessage: () => 'Movimiento de inventario eliminado con exitó' }
  )
