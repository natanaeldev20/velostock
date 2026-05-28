import type { CreateUser, UpdateUser } from '../schemas/user.schema'
import type { User, UserNav, UserProfile } from '../infrastructure/user.mapper'
export interface GetUserFilters {
  name?: string
  lastName?: string
  username?: string
}
export interface UserService {
  // getMany: (search?: string) => Promise<User[]>
  getMany: (filters?: GetUserFilters) => Promise<User[]>
  getManyDeleted: () => Promise<User[]>
  getManyActives: () => Promise<User[]>
  getById: (userId: string) => Promise<User>
  getProfile: (userId: string) => Promise<UserProfile>
  getNav: (userId: string) => Promise<UserNav>
  countAll: () => Promise<number>
  createRoot: (data: CreateUser) => Promise<User>
  create: (actorId: string, data: CreateUser) => Promise<User>
  update: (actorId: string, userId: string, data: UpdateUser) => Promise<User>
  softDelete: (actorId: string, userId: string) => Promise<User>
  hardDelete: (actorId: string, userId: string) => Promise<User>
  softDeleteMany: (actorId: string) => Promise<{ count: number }>
  restore: (actorId: string, userId: string) => Promise<User>
  toggleStatus: (
    actorId: string,
    userId: string,
    isActive: boolean
  ) => Promise<User>
  toggleSelection: (userId: string, isSelect: boolean) => Promise<User>
}

export interface UserNavData {
  user: UserNav
}
