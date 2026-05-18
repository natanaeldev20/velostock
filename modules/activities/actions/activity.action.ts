'use server'

import { handleAction } from '@/shared/infrastructure/handlers/handle-action'
import { activityService } from '../services/activity.service'
import { validateId } from '@/shared/utils/validations'

export const getActivities = () => handleAction(() => activityService.getMany())

export const getActivity = (activityId: string) =>
  handleAction(() => {
    const validatedId = validateId(activityId)
    return activityService.getById(validatedId)
  })

export const deleteActivity = (activityId: string) =>
  handleAction(
    () => {
      const validatedId = validateId(activityId)
      return activityService.delete(validatedId)
    },
    { successMessage: () => 'Movimiento de inventario eliminado con exitó' }
  )
