import z from 'zod'

export const idSchema = z
  .string()
  .trim()
  .min(1, { message: 'ID no válido' })
  .cuid({ message: 'ID no válido' })

export type Id = z.infer<typeof idSchema>
