import z from 'zod'

export const inventoryMovementSchema = z.object({
  type: z.enum(['ENTRADA', 'SALIDA']),
  productId: z.string().cuid().min(1, 'El ID del producto es obligatorio'),
  quantity: z
    .number()
    .int()
    .positive('La cantidad debe ser un número entero positivo')
})

export const createInventoryMovementSchema = inventoryMovementSchema
export const updateInventoryMovementSchema = inventoryMovementSchema.partial()

export type CreateInventoryMovement = z.infer<
  typeof createInventoryMovementSchema
>
export type UpdateInventoryMovement = z.infer<
  typeof updateInventoryMovementSchema
>
