'use server'

import { AppError } from '@/shared/domain/errors/app-error'
import { userService } from '../services/user.service'
import {
  createUserSchema,
  updateUserSchema,
  type CreateUser,
  type UpdateUser
} from '../schemas/user.schema'
import { handleAction } from '@/shared/infrastructure/handlers/handle-action'
import {
  validateData,
  validateId,
  validateStatus
} from '@/shared/utils/validations'
import { authService } from '@/modules/auth/services/auth.service'
import { GetUserFilters } from '../contracts/user.contract'

export const getUsers = async (filters?: GetUserFilters) =>
  handleAction(() => userService.getMany(filters))
export const getDeletedUsers = async () =>
  handleAction(() => userService.getManyDeleted())

export const getActiveUsers = async () =>
  handleAction(() => userService.getManyActives())

export const getUser = async (userId: string) =>
  handleAction(() => {
    const validatedId = validateId(userId)
    return userService.getById(validatedId)
  })

export const getUserProfile = async () =>
  handleAction(async () => {
    const { userId } = await authService.getId()

    return userService.getProfile(userId)
  })

export const getUserNav = async () =>
  handleAction(async () => {
    const { userId } = await authService.getId()

    return userService.getNav(userId)
  })

export const countAllUsers = async () =>
  handleAction(() => userService.countAll())

export const createUserRoot = async (rawData: CreateUser) =>
  handleAction(
    () => {
      const validatedData = validateData(createUserSchema, rawData)

      return userService.createRoot(validatedData)
    },
    { successMessage: ({ name }) => `Usuario ${name} creado con exito` }
  )

export const createUser = async (rawData: CreateUser) =>
  handleAction(
    async () => {
      const { userId } = await authService.getId()

      const validatedData = validateData(createUserSchema, rawData)
      return userService.create(userId, validatedData)
    },
    { successMessage: ({ name }) => `Usuario ${name} creado con exito` }
  )

export const updateUser = async (userId: string, rawData: UpdateUser) =>
  handleAction(
    async () => {
      const { userId: autorId } = await authService.getId()

      const validatedId = validateId(userId)
      const validatedData = validateData(updateUserSchema, rawData)

      return userService.update(autorId, validatedId, validatedData)
    },
    { successMessage: ({ name }) => `Usuario ${name} actualizado con exito` }
  )

export const softDeleteUser = async (userId: string) =>
  handleAction(
    async () => {
      const { userId: autorId } = await authService.getId()

      const validatedId = validateId(userId)

      if (validatedId === autorId) {
        throw new AppError(
          'No puedes eliminar a un usuario con la session activa',
          true
        )
      }

      return userService.softDelete(autorId, validatedId)
    },
    { successMessage: ({ name }) => `Usuario ${name} eliminado(a) con exito` }
  )

export const hardDeleteUser = async (userId: string) =>
  handleAction(
    async () => {
      const { userId: autorId } = await authService.getId()
      const validatedId = validateId(userId)

      if (validatedId === autorId) {
        throw new AppError(
          'No puedes eliminar a un usuario con la session activa',
          true
        )
      }

      return userService.hardDelete(autorId, validatedId)
    },
    {
      successMessage: ({ name }) =>
        `Usuario ${name} eliminado(a) difinitivamente con exito`
    }
  )

export const softDeleteManyUsers = async () =>
  handleAction(
    async () => {
      const { userId } = await authService.getId()
      return userService.softDeleteMany(userId)
    },
    {
      successMessage: ({ count }) =>
        count === 1
          ? 'Se eliminó un usuario con éxito'
          : `${count} eliminados con éxito`
    }
  )

export const restoreUser = async (userId: string) =>
  handleAction(
    async () => {
      const { userId: autorId } = await authService.getId()
      const validatedId = validateId(userId)
      return userService.restore(autorId, validatedId)
    },
    {
      successMessage: ({ name }) =>
        `Usuario ${name} fue restaurado(a) correctamente`
    }
  )

export const toggleUserStatus = async (userId: string, isActive: boolean) =>
  handleAction(
    async () => {
      const { userId: autorId } = await authService.getId()
      const validatedId = validateId(userId)
      const validatedStatus = validateStatus(isActive)

      return userService.toggleStatus(autorId, validatedId, validatedStatus)
    },
    {
      successMessage: ({ name, isActive }) =>
        `Usuario ${name} fue ${isActive ? 'activado' : 'desactivado'} correctamente`
    }
  )

export const toggleSelectionUser = async (userId: string, isSelect: boolean) =>
  handleAction(() => {
    const validatedId = validateId(userId)
    const validatedStatus = validateStatus(isSelect)

    return userService.toggleSelection(validatedId, validatedStatus)
  })
