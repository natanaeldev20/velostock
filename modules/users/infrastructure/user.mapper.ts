import { Prisma } from '@prisma/client'

export const userSelect = {
  id: true,
  name: true,
  lastName: true,
  imgUrl: true,
  username: true,
  isActive: true,
  isSelect: true
} satisfies Prisma.UserSelect

export const userProfileSelect = {
  ...userSelect,
  activities: {
    select: {
      actionType: true,
      entity: true,
      description: true,
      user: { select: { name: true, lastName: true, imgUrl: true } }
    }
  },
  inventoryMovements: {
    select: {
      type: true,
      quantity: true,
      date: true,
      product: { select: { name: true } },
      user: { select: { name: true, lastName: true } }
    }
  }
} satisfies Prisma.UserSelect

export const userNavSelect = {
  name: true,
  lastName: true,
  username: true,
  imgUrl: true
} satisfies Prisma.UserSelect

export type UserProfile = Prisma.UserGetPayload<{
  select: typeof userProfileSelect
}>

export type User = Prisma.UserGetPayload<{
  select: typeof userSelect
}>

export type UserNav = Prisma.UserGetPayload<{
  select: typeof userNavSelect
}>
