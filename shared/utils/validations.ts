import { idSchema, type Id } from '../domain/schemas/id.schema'
import { AppError } from '../domain/errors/app-error'
import { ZodSchema } from 'zod'

export function validateId(id: Id): Id {
  const parsed = idSchema.safeParse(id)

  if (!parsed.success) {
    throw new AppError(parsed.error.flatten().formErrors[0])
  }

  return parsed.data
}

export function validateData<T>(schema: ZodSchema<T>, rawData: unknown): T {
  const parsedData = schema.safeParse(rawData)

  if (!parsedData.success) {
    const fieldErrors = parsedData.error.flatten().fieldErrors
    const allMessages = Object.values(fieldErrors).flat()

    if (typeof allMessages[0] !== 'string') {
      throw new AppError('Error de validacion desconocido', true)
    }
    throw new AppError(allMessages[0], true)
  }

  return parsedData.data
}

export function validateStatus(state: boolean): boolean {
  if (typeof state !== 'boolean') {
    throw new AppError('Se esperaba un valor booleano (true/false).', true)
  }

  return state
}
