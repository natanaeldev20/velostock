import prisma from '@/shared/infrastructure/database/db'
import {
  type User,
  type UserProfile,
  type UserNav,
  userProfileSelect,
  userSelect,
  userNavSelect
} from '../infrastructure/user.mapper'
import bcrypt from 'bcryptjs'
import { AppError } from '@/shared/domain/errors/app-error'
import type { CreateUser, UpdateUser } from '../schemas/user.schema'
import type { UserService } from '../contracts/user.contract'

export const userService: UserService = {
  // getMany(search?: string): Promise<User[]> {
  //   return prisma.user.findMany({
  //     where: search
  //       ? {
  //           OR: [
  //             { name: { contains: search, mode: 'insensitive' } },
  //             { lastName: { contains: search, mode: 'insensitive' } },
  //             { username: { contains: search, mode: 'insensitive' } }
  //           ],
  //           deletedAt: null
  //         }
  //       : { deletedAt: null },
  //     select: userSelect,
  //     orderBy: { createdAt: 'desc' }
  //   })
  // },

  // getMany(filters?: GetUserFilters): Promise<User[]> {
  //   return prisma.user.findMany({
  //     select: userSelect,
  //     where: {
  //       deletedAt: null,
  //       ...(filters?.name && {
  //         name: { contains: filters.name, mode: 'insensitive' }
  //       }),
  //       ...(filters?.lastName && {
  //         lastName: { contains: filters.lastName, mode: 'insensitive' }
  //       }),
  //       ...(filters?.username && {
  //         username: { contains: filters.username, mode: 'insensitive' }
  //       })
  //     },
  //     orderBy: { createdAt: 'desc' }
  //   })
  // },

  getMany(search?: string): Promise<User[]> {
    return prisma.user.findMany({
      select: userSelect,
      where: search
        ? {
            OR: [
              { name: { contains: search, mode: 'insensitive' } },
              { lastName: { contains: search, mode: 'insensitive' } },
              { username: { contains: search, mode: 'insensitive' } }
            ],
            deletedAt: null
          }
        : { deletedAt: null },
      orderBy: { createdAt: 'desc' }
    })
  },

  getManyDeleted(): Promise<User[]> {
    return prisma.user.findMany({
      where: { deletedAt: { not: null } },
      select: userSelect,
      orderBy: { deletedAt: 'asc' }
    })
  },

  getManyActives(): Promise<User[]> {
    return prisma.user.findMany({
      where: { deletedAt: { not: null } },
      select: userSelect,
      orderBy: { createdAt: 'asc' }
    })
  },

  async getById(userId: string): Promise<User> {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: userSelect
    })

    if (!user) throw new AppError('Usuario no encontrado', true)

    return user
  },

  countAll(): Promise<number> {
    return prisma.user.count()
  },

  async getProfile(userId: string): Promise<UserProfile> {
    const userLogged = await prisma.user.findUnique({
      where: { id: userId },
      select: userProfileSelect
    })

    if (!userLogged) throw new AppError('Usuario no encontrado', true)

    return userLogged
  },

  async getNav(userId: string): Promise<UserNav> {
    const userNavData = await prisma.user.findUnique({
      where: { id: userId },
      select: userNavSelect
    })

    if (!userNavData) throw new AppError('Usuario no encontrado', true)

    return userNavData
  },

  createRoot(data: CreateUser): Promise<User> {
    return prisma.$transaction(async (tx): Promise<User> => {
      const existingUsername = await tx.user.findFirst({
        where: { username: data.username }
      })

      if (existingUsername) {
        throw new AppError(
          `El nombre de usuario ${data.username} ya esta en uso`
        )
      }

      const { password, ...userData } = data

      const hashPassword = await bcrypt.hash(password, 10)

      return tx.user.create({ data: { password: hashPassword, ...userData } })
    })
  },

  create(actorId: string, data: CreateUser): Promise<User> {
    return prisma.$transaction(async (tx): Promise<User> => {
      const existingUsername = await tx.user.findFirst({
        where: { username: data.username }
      })

      if (existingUsername) {
        throw new AppError(
          `El nombre de usuario ${data.username} ya esta en uso`
        )
      }

      const { password, ...userData } = data

      const hashPassword = await bcrypt.hash(password, 10)

      const newUser = await tx.user.create({
        data: { password: hashPassword, ...userData }
      })

      await tx.activity.create({
        data: {
          actionType: 'CREAR',
          entity: 'USUARIO',
          entityId: newUser.id,
          description: `Se creo el usuario ${newUser.username}`,
          metadata: JSON.parse(JSON.stringify(newUser)),
          userId: actorId
        }
      })

      const result = await tx.user.findUnique({
        where: { id: newUser.id },
        select: userSelect
      })

      if (!result) throw new AppError('Usuario no encontrado', true)

      return result
    })
  },

  update(actorId: string, userId: string, data: UpdateUser): Promise<User> {
    return prisma.$transaction(async (tx): Promise<User> => {
      const user = await tx.user.findUnique({ where: { id: userId } })

      if (!user) throw new AppError('Usuario no encontrado', true)

      const updateData = { ...data }

      if (updateData.username) {
        const existingUsername = await tx.user.findFirst({
          where: { username: updateData.username, NOT: { id: userId } }
        })

        if (existingUsername) {
          throw new AppError(
            `El nombre de usuario ${updateData.username} ya esta en uso`,
            true
          )
        }
      }

      if (updateData.password?.trim()) {
        updateData.password = await bcrypt.hash(updateData.password, 10)
      }

      const updatedUser = await tx.user.update({
        where: { id: userId },
        data: updateData
      })

      await tx.activity.create({
        data: {
          actionType: 'ACTUALIZAR',
          entity: 'USUARIO',
          entityId: updatedUser.id,
          description: `Se actualizo el usuario ${updatedUser.username}`,
          metadata: JSON.parse(JSON.stringify(updatedUser)),
          userId: actorId
        }
      })

      const result = await tx.user.findUnique({
        where: { id: updatedUser.id },
        select: userSelect
      })

      if (!result) throw new AppError('Usuario no encontrado', true)

      return result
    })
  },

  softDelete(actorId: string, userId: string): Promise<User> {
    return prisma.$transaction(async (tx): Promise<User> => {
      const user = await tx.user.findUnique({ where: { id: userId } })

      if (!user) throw new AppError('Usuario no encontrado', true)

      const updatedUser = await tx.user.update({
        where: { id: userId },
        data: { deletedAt: new Date(), isActive: false }
      })

      await tx.activity.create({
        data: {
          actionType: 'ACTUALIZAR',
          entity: 'USUARIO',
          entityId: updatedUser.id,
          description: `Se movio a la papelera el usuario ${updatedUser.username}`,
          metadata: JSON.parse(JSON.stringify(updatedUser)),
          userId: actorId
        }
      })

      const result = await tx.user.findUnique({
        where: { id: updatedUser.id },
        select: userSelect
      })

      if (!result) throw new AppError('Usuario no encontrado', true)

      return result
    })
  },

  hardDelete(actorId: string, userId: string): Promise<User> {
    return prisma.$transaction(async (tx): Promise<User> => {
      const user = await tx.user.findUnique({
        where: { id: userId },
        select: {
          ...userSelect,
          _count: { select: { activities: true, inventoryMovements: true } }
        }
      })

      if (!user) throw new AppError('Usuario no encontrado', true)

      if (user._count.inventoryMovements > 0 || user._count.activities > 0) {
        throw new AppError(
          `No se pudo eliminar al usuario: ${user.name}, porque tiene movimientos de inventario o actividades registradas`,
          true
        )
      }

      const deletedUser = await tx.user.delete({ where: { id: userId } })

      await tx.activity.create({
        data: {
          actionType: 'ELIMINAR',
          entity: 'USUARIO',
          entityId: deletedUser.id,
          description: `Se elimino el usuario ${deletedUser.username}`,
          metadata: JSON.parse(JSON.stringify(deletedUser)),
          userId: actorId
        }
      })

      const { _count, ...result } = user

      return result
    })
  },

  softDeleteMany(actorId: string): Promise<{ count: number }> {
    return prisma.$transaction(async (tx): Promise<{ count: number }> => {
      const users = await tx.user.findMany({
        where: { isSelect: true },
        select: { id: true }
      })

      const existingUserLogged = users.some((user) => user.id === actorId)

      if (existingUserLogged) {
        throw new AppError(`No puedes eliminar tu propio usuario`, true)
      }

      const updatedUsers = await prisma.user.updateMany({
        where: { isSelect: true, id: { not: actorId } },
        data: { deletedAt: new Date(), isActive: false }
      })

      await tx.activity.create({
        data: {
          actionType: 'ACTUALIZAR',
          entity: 'USUARIO',
          entityId: 'VARIOS',
          description: `Se movieron a la papelera ${updatedUsers.count} usuarios`,
          userId: actorId
        }
      })

      return updatedUsers
    })
  },

  restore(actorId: string, userId: string): Promise<User> {
    return prisma.$transaction(async (tx): Promise<User> => {
      const user = await tx.user.findUnique({ where: { id: userId } })

      if (!user) throw new AppError('Usuario no encontrado', true)

      if (!user.deletedAt) {
        throw new AppError('El usuario no esta eliminado', true)
      }

      const restoredUser = await tx.user.update({
        where: { id: userId },
        data: { deletedAt: null, isActive: true }
      })

      await tx.activity.create({
        data: {
          actionType: 'ACTUALIZAR',
          entity: 'USUARIO',
          entityId: restoredUser.id,
          description: `Se restauro el usuario ${restoredUser.username}`,
          metadata: JSON.parse(JSON.stringify(restoredUser)),
          userId: actorId
        }
      })

      const result = await tx.user.findUnique({
        where: { id: restoredUser.id },
        select: userSelect
      })

      if (!result) throw new AppError('Usuario no encontrado', true)

      return result
    })
  },

  toggleStatus(
    actorId: string,
    userId: string,
    isActive: boolean
  ): Promise<User> {
    return prisma.$transaction(async (tx): Promise<User> => {
      const user = await tx.user.findUnique({ where: { id: userId } })

      if (!user) throw new AppError('Usuario no encontrado', true)

      const updatedUser = await tx.user.update({
        where: { id: userId },
        data: { isActive }
      })

      await tx.activity.create({
        data: {
          actionType: updatedUser.isActive ? 'ACTIVAR' : 'DESACTIVAR',
          entity: 'USUARIO',
          entityId: updatedUser.id,
          description: `Se ${updatedUser.isActive ? 'activo' : 'desactivo'} el usuario ${updatedUser.username}`,
          metadata: JSON.parse(JSON.stringify(updatedUser)),
          userId: actorId
        }
      })

      const result = await tx.user.findUnique({
        where: { id: updatedUser.id },
        select: userSelect
      })

      if (!result) throw new AppError('Usuario no encontrado', true)

      return result
    })
  },

  toggleSelection(userId: string, isSelect: boolean): Promise<User> {
    return prisma.user.update({
      where: { id: userId },
      data: { isSelect: !isSelect },
      select: userSelect
    })
  }
}
