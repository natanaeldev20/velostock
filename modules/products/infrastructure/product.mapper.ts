import { Prisma } from '@prisma/client'

export const productSelect = {
  id: true,
  name: true,
  category: { select: { name: true } },
  description: true,
  stock: true,
  price: true,
  isActive: true,
  isSelect: true
} satisfies Prisma.ProductSelect

// export type PrismaProduct = Prisma.ProductGetPayload<{
//   select: typeof productSelect
// }>

export type Product = {
  id: string
  name: string
  description: string | null
  price: number
  stock: number
  isActive: boolean
  isSelect: boolean
  category: {
    name: string
  }
}
