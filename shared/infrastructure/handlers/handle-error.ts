import { AppError } from '../../domain/errors/app-error'

export function getErrorMessage(error: unknown): string {
  if (error instanceof AppError && error.isPublic) {
    return error.message
  }

  if (process.env.NODE_ENV === 'development') {
    return error instanceof Error ? error.message : String(error)
  }
  return 'Algo salió mal. Por favor, inténtalo de nuevo más tarde.'
}
