import { Prisma } from '@prisma/client'

export const inventoryMovementSelect = {
  id: true,
  product: {
    select: { id: true, name: true, category: { select: { name: true } } }
  },
  user: { select: { name: true, lastName: true } },
  type: true,
  quantity: true,
  date: true
} satisfies Prisma.InventoryMovementSelect

export type InventoryMovement = Prisma.InventoryMovementGetPayload<{
  select: typeof inventoryMovementSelect
}>
