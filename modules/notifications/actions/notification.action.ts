'use server'

import { handleAction } from '@/shared/infrastructure/handlers/handle-action'
import { notificationService } from '../services/notification.service'
import { validateId } from '@/shared/utils/validations'

export const getNotifications = async () =>
  handleAction(() => notificationService.getMany())

export const getReadNotifications = async () =>
  handleAction(() => notificationService.getManyRead())

export const getUnreadNotifications = async () =>
  handleAction(() => notificationService.getManyUnread())

export const getNotification = async (notificationId: string) =>
  handleAction(() => {
    const validatedId = validateId(notificationId)

    return notificationService.getById(validatedId)
  })

export const readNotification = async (notificationId: string) =>
  handleAction(() => {
    const validatedId = validateId(notificationId)
    return notificationService.read(validatedId)
  })

export const deleteNotification = async (notificationId: string) =>
  handleAction(
    () => {
      const validatedId = validateId(notificationId)
      return notificationService.delete(validatedId)
    },
    { successMessage: () => 'Se eliminó la notificación con exitó' }
  )
