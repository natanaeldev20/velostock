import type { Notification } from '../infrastructure/notification.mapper'

export interface NotificationService {
  getMany: () => Promise<Notification[]>
  getManyRead: () => Promise<Notification[]>
  getManyUnread: () => Promise<Notification[]>
  getById: (notificationId: string) => Promise<Notification>
  getTotal: () => Promise<{ notifications: number }>
  read: (notificationId: string) => Promise<void>
  delete: (notificationId: string) => Promise<void>
}

export interface NotificationCard {
  notification: Notification
}

export interface NotificationList {
  notifications: Notification[]
}
