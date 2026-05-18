import z from 'zod'

export const userSchema = z.object({
  id: z.string().cuid({ message: 'Debe tener el formato correcto' }),
  name: z.string().trim().min(1, 'El nombre es obligatorio'),
  lastName: z.string().trim().min(1, 'El apellido es obligatorio'),
  imgUrl: z.string().nullable().optional(),
  username: z.string().min(1, 'El nombre de usuario es obligatorio'),
  password: z
    .string()
    .trim()
    .min(6, 'La contraseña es obligatoria y debe tener mas de 6 caracteres')
})

export const getUserSchema = userSchema.omit({
  password: true
})

export const createUserSchema = userSchema.omit({
  id: true
})

export const updateUserSchema = userSchema.omit({ id: true }).partial()

export type User = z.infer<typeof getUserSchema>
export type CreateUser = z.infer<typeof createUserSchema>
export type UpdateUser = z.infer<typeof updateUserSchema>
