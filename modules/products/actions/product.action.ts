'use server'

import { productService } from '../services/product.service'
import {
  createProductSchema,
  updateProductSchema,
  type CreateProduct,
  type UpdateProduct
} from '../schemas/product.schema'
import {
  validateData,
  validateId,
  validateStatus
} from '@/shared/utils/validations'
import { handleAction } from '@/shared/infrastructure/handlers/handle-action'
import { authService } from '@/modules/auth/services/auth.service'

export const getProducts = async () =>
  handleAction(() => productService.getMany())

export const getDeletedProducts = async () =>
  handleAction(() => productService.getManyDeleted())

export const getActiveProducts = async () =>
  handleAction(() => productService.getManyActives())

export const getProduct = async (productId: string) =>
  handleAction(() => {
    const validatedId = validateId(productId)
    return productService.getById(validatedId)
  })

export const countAllProducts = async () =>
  handleAction(() => productService.countAll())

export const createProduct = async (rawData: CreateProduct) =>
  handleAction(
    async () => {
      const { userId } = await authService.getId()

      const validatedData = validateData(createProductSchema, rawData)
      return productService.create(userId, validatedData)
    },
    { successMessage: ({ name }) => `Producto ${name} creado con exito` }
  )

export const updateProduct = async (
  productId: string,
  rawData: UpdateProduct
) =>
  handleAction(
    async () => {
      const { userId } = await authService.getId()

      const validatedId = validateId(productId)
      const validatedData = validateData(updateProductSchema, rawData)

      return productService.update(userId, validatedId, validatedData)
    },
    {
      successMessage: ({ name }) => `Producto ${name} actualizado con exito.`
    }
  )

export const softDeleteProduct = async (productId: string) =>
  handleAction(
    async () => {
      const { userId } = await authService.getId()

      const validatedId = validateId(productId)
      return productService.softDelete(userId, validatedId)
    },
    {
      successMessage: ({ name }) => `Producto ${name} eliminado con exito.`
    }
  )

export const hardDeleteProduct = async (productId: string) =>
  handleAction(
    async () => {
      const { userId } = await authService.getId()

      const validatedId = validateId(productId)
      return productService.hardDelete(userId, validatedId)
    },
    {
      successMessage: ({ name }) =>
        `Producto ${name} eliminado definitivamente.`
    }
  )

export const softDeleteManyProducts = async () =>
  handleAction(
    async () => {
      const { userId } = await authService.getId()

      return productService.softDeleteMany(userId)
    },
    {
      successMessage: ({ count }) =>
        count === 1
          ? 'Se eliminó un producto con éxito.'
          : `${count} eliminados con éxito.`
    }
  )

export const restoreProduct = async (productId: string) =>
  handleAction(
    async () => {
      const { userId } = await authService.getId()

      const validatedId = validateId(productId)
      return productService.restore(userId, validatedId)
    },
    {
      successMessage: ({ name }) => `Producto ${name} restaurado con exito.`
    }
  )

export const toggleProductStatus = async (
  productId: string,
  isActive: boolean
) =>
  handleAction(async () => {
    const { userId } = await authService.getId()

    const validatedId = validateId(productId)
    const validatedStatus = validateStatus(isActive)

    return productService.toggleStatus(userId, validatedId, validatedStatus)
  })

export const toggleProductSelection = async (
  productId: string,
  isSelect: boolean
) =>
  handleAction(() => {
    const validatedId = validateId(productId)
    const validatedStatus = validateStatus(isSelect)

    return productService.toggleSelection(validatedId, validatedStatus)
  })
