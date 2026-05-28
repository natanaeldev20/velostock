'use server'

import { categoryService } from '../services/category.service'
import {
  createCategorySchema,
  updateCategorySchema,
  type CreateCategory,
  type UpdateCategory
} from '../schemas/category.schema'
import { handleAction } from '@/shared/infrastructure/handlers/handle-action'
import {
  validateData,
  validateId,
  validateStatus
} from '@/shared/utils/validations'
import { authService } from '@/modules/auth/services/auth.service'

export const getCategories = async () =>
  handleAction(() => categoryService.getMany())

export const getDeletedCategories = async () =>
  handleAction(() => categoryService.getManyDeleted())

export const getActiveCategories = async () =>
  handleAction(() => categoryService.getManyActives())

export const getCategory = async (categoryId: string) =>
  handleAction(() => {
    const validatedId = validateId(categoryId)
    return categoryService.getById(validatedId)
  })

export const countAllCategories = async () =>
  handleAction(() => categoryService.countAll())

export const createCategory = async (rawData: CreateCategory) =>
  handleAction(
    async () => {
      const { userId } = await authService.getId()

      const validatedData = validateData(createCategorySchema, rawData)
      return categoryService.create(userId, validatedData)
    },
    {
      successMessage: ({ name }) => `Categoría ${name} creada con éxito.`
    }
  )

export const updateCategory = async (
  categoryId: string,
  rawData: UpdateCategory
) =>
  handleAction(
    async () => {
      const { userId } = await authService.getId()

      const validatedId = validateId(categoryId)
      const validatedData = validateData(updateCategorySchema, rawData)

      return categoryService.update(userId, validatedId, validatedData)
    },
    {
      successMessage: ({ name }) => `Categoría ${name} actualizada con éxito.`
    }
  )

export const softDeleteCategory = async (categoryId: string) =>
  handleAction(
    async () => {
      const { userId } = await authService.getId()

      const validatedId = validateId(categoryId)
      return categoryService.softDelete(userId, validatedId)
    },
    {
      successMessage: ({ name }) => `Categoría ${name} eliminada con éxito.`
    }
  )

export const hardDeleteCategory = async (categoryId: string) =>
  handleAction(
    async () => {
      const { userId } = await authService.getId()

      const validatedId = validateId(categoryId)
      return categoryService.hardDelete(userId, validatedId)
    },
    {
      successMessage: ({ name }) => `Categoría ${name} eliminada con éxito.`
    }
  )

export const softDeleteManyCategories = async () =>
  handleAction(
    async () => {
      const { userId } = await authService.getId()

      return categoryService.softDeleteMany(userId)
    },
    {
      successMessage: ({ count }) =>
        count === 1
          ? 'Se elimino 1 categoria con exito.'
          : `${count} categorias fueron eliminadas con exito.`
    }
  )

export const restoreCategory = async (categoryId: string) =>
  handleAction(
    async () => {
      const { userId } = await authService.getId()

      const validatedId = validateId(categoryId)
      return categoryService.restore(userId, validatedId)
    },
    {
      successMessage: ({ name }) => `Categoria ${name} restaurada con exito,`
    }
  )

export const toggleCategoryStatus = async (
  categoryId: string,
  isActive: boolean
) =>
  handleAction(async () => {
    const { userId } = await authService.getId()

    const validatedId = validateId(categoryId)
    const validatedStatus = validateStatus(isActive)

    return categoryService.toggleStatus(userId, validatedId, validatedStatus)
  })

export const toggleCategorySelection = async (
  categoryId: string,
  isSelect: boolean
) =>
  handleAction(() => {
    const validatedId = validateId(categoryId)
    const validatedStatus = validateStatus(isSelect)

    return categoryService.toggleSelection(validatedId, validatedStatus)
  })
