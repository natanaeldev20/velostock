'use server'

import { handleAction } from '@/shared/infrastructure/handlers/handle-action'
import { notificationService } from '../services/notification.service'
import { validateId } from '@/shared/utils/validations'

export const getNotifications = async () =>
  handleAction(() => notificationService.getMany())

export const getNotification = async (notificationId: string) =>
  handleAction(() => {
    const validatedId = validateId(notificationId)

    return notificationService.getById(validatedId)
  })

export const deleteNotification = async (notificationId: string) =>
  handleAction(
    () => {
      const validatedId = validateId(notificationId)
      return notificationService.delete(validatedId)
    },
    { successMessage: () => 'Se eliminó la notificación con exitó' }
  )
