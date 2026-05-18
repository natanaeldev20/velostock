import { auth } from '@/auth'
import { AppError } from '@/shared/domain/errors/app-error'

export const authService = {
  getId: async (): Promise<{ userId: string }> => {
    const session = await auth()
    const userId = session?.user?.id

    if (!userId) throw new AppError('No autenticado', true)

    return { userId }
  }
}
