import { Prisma, Type } from '@prisma/client'

export const inventoryMovementSelect = {
  id: true,
  product: {
    select: {
      id: true,
      name: true,
      price: true,
      category: { select: { name: true } }
    }
  },
  user: {
    select: {
      id: true,
      name: true,
      lastName: true,
      imgUrl: true,
      username: true
    }
  },
  type: true,
  priceAtMove: true,
  quantity: true,
  date: true
} satisfies Prisma.InventoryMovementSelect

// export type InventoryMovement = Prisma.InventoryMovementGetPayload<{
//   select: typeof inventoryMovementSelect
// }>

export type InventoryMovement = {
  id: string
  type: Type
  priceAtMove: number
  quantity: number
  date: Date
  product: {
    id: string
    name: string
    price: number

    category: {
      name: string
    }
  }
  user: {
    id: string
    name: string
    lastName: string
    imgUrl: string | null
    username: string
  }
}
