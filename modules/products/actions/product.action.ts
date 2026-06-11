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
import { revalidatePath } from 'next/cache'

export const getProducts = async (search?: string) =>
  handleAction(() => productService.getMany(search))

export const getDeletedProducts = async () =>
  handleAction(() => productService.getManyDeleted())

export const getActiveProducts = async () =>
  handleAction(() => productService.getManyActives())

export const getAllProducts = async () =>
  handleAction(() => productService.getAll())

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
      const res = await productService.create(userId, validatedData)
      revalidatePath('/admin/products')
      return res
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

      const res = await productService.update(
        userId,
        validatedId,
        validatedData
      )
      revalidatePath('/admin/products')
      return res
    },
    {
      successMessage: ({ name }) => `Producto ${name} actualizado con exito`
    }
  )

export const softDeleteProduct = async (productId: string) =>
  handleAction(
    async () => {
      const { userId } = await authService.getId()

      const validatedId = validateId(productId)
      const res = await productService.softDelete(userId, validatedId)
      revalidatePath('/admin/products')
      return res
    },
    {
      successMessage: ({ name }) => `Se movio a la papelera el producto ${name}`
    }
  )

export const hardDeleteProduct = async (productId: string) =>
  handleAction(
    async () => {
      const { userId } = await authService.getId()

      const validatedId = validateId(productId)
      const res = await productService.hardDelete(userId, validatedId)
      revalidatePath('/admin/trash')
      return res
    },
    {
      successMessage: ({ name }) => `Se elimino el prodcuto ${name}`
    }
  )

export const softDeleteManyProducts = async () =>
  handleAction(
    async () => {
      const { userId } = await authService.getId()

      const res = await productService.softDeleteMany(userId)
      revalidatePath('/admin/products')
      return res
    },
    {
      successMessage: ({ count }) =>
        count === 1
          ? 'Se movio a la papelera un producto'
          : `${count} productos se movieron a la papelera`
    }
  )

export const restoreProduct = async (productId: string) =>
  handleAction(
    async () => {
      const { userId } = await authService.getId()

      const validatedId = validateId(productId)
      const res = await productService.restore(userId, validatedId)
      revalidatePath('/admin/trash')
      return res
    },
    {
      successMessage: ({ name }) => `Producto ${name} restaurado con exito`
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

    const res = await productService.toggleStatus(
      userId,
      validatedId,
      validatedStatus
    )
    revalidatePath('/admin/products')
    return res
  })

export const toggleProductSelection = async (
  productId: string,
  isSelect: boolean
) =>
  handleAction(async () => {
    const validatedId = validateId(productId)
    const validatedStatus = validateStatus(isSelect)

    const res = await productService.toggleSelection(
      validatedId,
      validatedStatus
    )
    revalidatePath('/admin/products')
    return res
  })
