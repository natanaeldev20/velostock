import { Prisma } from '@prisma/client'

export const productSelect = {
  id: true,
  name: true,
  category: { select: { name: true } },
  description: true,
  price: true,
  stock: true,
  isActive: true
} satisfies Prisma.ProductSelect

export type Product = Prisma.ProductGetPayload<{
  select: typeof productSelect
}>
