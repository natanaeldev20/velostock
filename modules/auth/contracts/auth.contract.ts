export interface AuthService {
  getId: () => Promise<{ userId: string }>
}
