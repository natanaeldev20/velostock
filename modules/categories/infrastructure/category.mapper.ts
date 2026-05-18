import { Prisma } from '@prisma/client'

export const categorySelect = {
  id: true,
  name: true,
  isActive: true
} satisfies Prisma.CategorySelect

export type Category = Prisma.CategoryGetPayload<{
  select: typeof categorySelect
}>
