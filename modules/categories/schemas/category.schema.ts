import z from 'zod'

export const categorySchema = z.object({
  name: z.string().min(1, 'El nombre de la categoria es requerido.')
})

export const createCategorySchema = categorySchema
export const updateCategorySchema = categorySchema.partial()

export type CreateCategory = z.infer<typeof createCategorySchema>
export type UpdateCategory = z.infer<typeof updateCategorySchema>
