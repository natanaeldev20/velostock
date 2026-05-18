import { Prisma } from '@prisma/client'
import { userSelect } from '@/modules/users/infrastructure/user.mapper'

export const activitySelect = {
  actionType: true,
  entity: true,
  description: true,
  user: {
    select: { ...userSelect }
  }
} satisfies Prisma.ActivitySelect

export type Activity = Prisma.ActivityGetPayload<{
  select: typeof activitySelect
}>
