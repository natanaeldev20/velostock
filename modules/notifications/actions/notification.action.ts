'use server'

import { handleAction } from '@/shared/infrastructure/handlers/handle-action'
import { notificationService } from '../services/notification.service'
import { validateId } from '@/shared/utils/validations'
import { revalidatePath } from 'next/cache'

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

export const getTotalNotifications = async () =>
  handleAction(() => notificationService.getTotal())

export const readNotification = async (notificationId: string) =>
  handleAction(async () => {
    const validatedId = validateId(notificationId)
    await notificationService.read(validatedId)
    revalidatePath('/admin/notifications')
  })

export const deleteNotification = async (notificationId: string) =>
  handleAction(
    async () => {
      const validatedId = validateId(notificationId)
      await notificationService.delete(validatedId)
      revalidatePath('/admin/notifications')
    },
    { successMessage: () => 'Se eliminó la notificación con exitó' }
  )
