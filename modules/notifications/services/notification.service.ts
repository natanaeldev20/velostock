import prisma from '@/shared/infrastructure/database/db'
import { NotificationService } from '../contracts/notification.contract'
import {
  notificationSelect,
  type Notification
} from '../infrastructure/notification.mapper'
import { AppError } from '@/shared/domain/errors/app-error'

export const notificationService: NotificationService = {
  getMany(): Promise<Notification[]> {
    return prisma.notification.findMany({ select: notificationSelect })
  },

  getManyRead(): Promise<Notification[]> {
    return prisma.notification.findMany({
      select: notificationSelect,
      where: { isRead: true }
    })
  },
  getManyUnread(): Promise<Notification[]> {
    return prisma.notification.findMany({
      select: notificationSelect,
      where: { isRead: false }
    })
  },

  async getById(notificationId: string): Promise<Notification> {
    const notification = await prisma.notification.findUnique({
      where: { id: notificationId },
      select: notificationSelect
    })

    if (!notification) throw new AppError('Notificación no encontrada', true)

    return notification
  },

  async getTotal(): Promise<{ notifications: number }> {
    const notifications = await prisma.notification.count({
      where: { isRead: false }
    })
    return { notifications }
  },

  async read(notificationId: string) {
    const notification = await prisma.notification.findUnique({
      where: { id: notificationId }
    })

    if (!notification) throw new AppError('Notificación no encontrada')

    await prisma.notification.update({
      where: { id: notificationId },
      data: { isRead: true }
    })
  },

  async delete(notificationId: string) {
    const notification = await prisma.notification.findUnique({
      where: { id: notificationId }
    })

    if (!notification) throw new AppError('Notificación no encontrada')
    await prisma.notification.delete({ where: { id: notificationId } })
  }
}
