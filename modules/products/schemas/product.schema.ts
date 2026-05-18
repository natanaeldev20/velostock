// model Product {
//   id                 String              @id @default(cuid())
//   name               String
//   description        String?
//   precio             Decimal             @db.Decimal(10, 2)
//   stock              Int
//   inventoryMovements InventoryMovement[]
//   category           Category            @relation(fields: [categoryId], references: [id])
//   categoryId         String
// }

import z from 'zod'

export const productSchema = z.object({
  id: z.string().cuid(),
  name: z.string().min(1, 'El nombre es requerido.'),
  description: z.string().nullable().optional(),
  price: z.number().min(1, 'El precio es requerido.'),
  stock: z.number().min(0, 'La cantidad de productos es requerido.'),
  categoryId: z.string().cuid()
})

export const getProductsSchema = productSchema
  .extend({
    categoryName: z.string()
  })
  .omit({
    categoryId: true
  })

export const createProductSchema = productSchema.omit({
  id: true
})
export const updateProductSchema = productSchema.omit({ id: true }).partial()

export type Product = z.infer<typeof getProductsSchema>
export type CreateProduct = z.infer<typeof createProductSchema>
export type UpdateProduct = z.infer<typeof updateProductSchema>
