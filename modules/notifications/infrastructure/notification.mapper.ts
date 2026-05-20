import { Prisma } from '@prisma/client'

export const notificationSelect = {
  id: true,
  title: true,
  description: true,
  url: true
} satisfies Prisma.NotificationSelect

export type Notification = Prisma.NotificationGetPayload<{
  select: typeof notificationSelect
}>
