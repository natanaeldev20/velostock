export interface ActionResponse<T = void> {
  ok: boolean
  data?: T
  message?: string
  details?: Record<string, string[]>
}
