import { getErrorMessage } from '../../infrastructure/handlers/handle-error'
import type { ActionResponse } from '../../domain/types/action-response'

export async function handleAction<T>(
  fn: () => Promise<T>,
  options?: { successMessage?: (data: T) => string }
): Promise<ActionResponse<T>> {
  try {
    const data = await fn()
    const message = options?.successMessage?.(data)

    return { ok: true, data, ...(message && { message }) }
  } catch (error) {
    return { ok: false, message: getErrorMessage(error) }
  }
}
