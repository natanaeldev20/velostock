import type { Notification } from '../infrastructure/notification.mapper'

export interface NotificationService {
  getMany: () => Promise<Notification[]>
  getById: (notificationId: string) => Promise<Notification>
  delete: (notificationId: string) => Promise<void>
}

export interface NotificationCard {
  notification: Notification
}

export interface NotificationList {
  notifications: Notification[]
}
