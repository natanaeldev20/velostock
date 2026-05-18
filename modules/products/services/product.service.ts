import { productSelect, type Product } from '../infrastructure/product.mapper'
import { AppError } from '@/shared/domain/errors/app-error'
import type { CreateProduct, UpdateProduct } from '../schemas/product.schema'
import type { ProductService } from '../contracts/product.contract'
import prisma from '@/shared/infrastructure/database/db'

export const productService: ProductService = {
  getMany(): Promise<Product[]> {
    return prisma.product.findMany({
      where: { deletedAt: null },
      select: productSelect,
      orderBy: { createdAt: 'asc' }
    })
  },

  getManyDeleted(): Promise<Product[]> {
    return prisma.product.findMany({
      where: { deletedAt: { not: null } },
      select: productSelect,
      orderBy: { deletedAt: 'asc' }
    })
  },

  getManyActives(): Promise<Product[]> {
    return prisma.product.findMany({
      where: { isActive: true, deletedAt: null },
      select: productSelect,
      orderBy: { createdAt: 'asc' }
    })
  },

  async getById(productId: string): Promise<Product> {
    const product = await prisma.product.findUnique({
      where: { id: productId },
      select: productSelect
    })

    if (!product) throw new AppError('Producto no encontrado', true)

    return product
  },

  async create(userId: string, data: CreateProduct): Promise<Product> {
    return prisma.$transaction(async (tx): Promise<Product> => {
      const existingProductName = await tx.product.findFirst({
        where: { name: data.name }
      })

      if (existingProductName) {
        throw new AppError(`Ya existe un producto con el nombre: ${data.name}`)
      }

      const newProduct = await tx.product.create({
        data,
        include: { category: true }
      })

      await tx.activity.create({
        data: {
          actionType: 'CREAR',
          entity: 'PRODUCTO',
          entityId: newProduct.id,
          description: `Se creó el producto ${newProduct.name}`,
          metadata: JSON.parse(JSON.stringify(newProduct)),
          userId
        }
      })

      const result = await tx.product.findUnique({
        where: { id: newProduct.id },
        select: productSelect
      })

      if (!result) throw new AppError('Producto no encontrado', true)

      return result
    })
  },

  async update(
    userId: string,
    productId: string,
    data: UpdateProduct
  ): Promise<Product> {
    return prisma.$transaction(async (tx): Promise<Product> => {
      const product = await tx.product.findUnique({ where: { id: productId } })

      if (!product) throw new AppError('Producto no encontrado', true)

      if (data.name) {
        const existingProductName = await tx.product.findFirst({
          where: { name: data.name, NOT: { id: productId } }
        })

        if (existingProductName) {
          throw new AppError(
            `Ya existe un producto con el nombre: ${data.name}`
          )
        }
      }

      const previousProduct = await tx.product.findUnique({
        where: { id: productId },
        select: productSelect
      })

      const updatedProduct = await tx.product.update({
        where: { id: productId },
        data,
        include: { category: true }
      })

      await tx.activity.create({
        data: {
          actionType: 'ACTUALIZAR',
          entity: 'PRODUCTO',
          entityId: updatedProduct.id,
          description: `Se actualizo el producto ${previousProduct?.name} a ${updatedProduct.name}`,
          metadata: JSON.parse(JSON.stringify(updatedProduct)),
          userId
        }
      })

      const result = await tx.product.findUnique({
        where: { id: updatedProduct.id },
        select: productSelect
      })

      if (!result) throw new AppError('Producto no encontrado', true)

      return result
    })
  },

  softDelete(userId: string, productId: string): Promise<Product> {
    return prisma.$transaction(async (tx): Promise<Product> => {
      const product = await tx.product.findUnique({ where: { id: productId } })

      if (!product) throw new AppError('Producto no encontrado', true)

      const updatedProduct = await tx.product.update({
        where: { id: productId },
        data: { deletedAt: new Date(), isActive: false },
        include: { category: true }
      })

      await tx.activity.create({
        data: {
          actionType: 'ACTUALIZAR',
          entity: 'PRODUCTO',
          entityId: updatedProduct.id,
          description: `Se movio a la papelera el producto ${product.name}`,
          metadata: JSON.parse(JSON.stringify(updatedProduct)),
          userId
        }
      })

      const result = await tx.product.findUnique({
        where: { id: updatedProduct.id },
        select: productSelect
      })

      if (!result) throw new AppError('Producto no encontrado', true)

      return result
    })
  },

  async hardDelete(userId: string, productId: string): Promise<Product> {
    return prisma.$transaction(async (tx): Promise<Product> => {
      const product = await tx.product.findUnique({
        where: { id: productId },
        select: {
          ...productSelect,
          _count: { select: { inventoryMovements: true } }
        }
      })

      if (!product) throw new AppError('Producto no encontrado', true)

      const existingMovements = product._count.inventoryMovements > 0

      if (existingMovements) {
        throw new AppError(
          `No se pudo eliminar el producto: ${product.name}, porque tiene movimientos de inventario asociados`
        )
      }

      const deletedProduct = await tx.product.delete({
        where: { id: productId },
        include: { category: true }
      })

      await tx.activity.create({
        data: {
          actionType: 'ELIMINAR',
          entity: 'PRODUCTO',
          entityId: deletedProduct.id,
          description: `Se elimino permanentemente el producto ${deletedProduct.name}`,
          metadata: JSON.parse(JSON.stringify(deletedProduct)),
          userId
        }
      })

      const { _count, ...result } = product

      return result
    })
  },

  softDeleteMany(userId: string): Promise<{ count: number }> {
    return prisma.$transaction(async (tx): Promise<{ count: number }> => {
      const updatedProducts = await tx.product.updateMany({
        where: { isSelect: true },
        data: { deletedAt: new Date(), isActive: false }
      })

      await tx.activity.create({
        data: {
          actionType: 'ACTUALIZAR',
          entity: 'PRODUCTO',
          entityId: 'VARIOS',
          description: `Se movieron a la papelera ${updatedProducts.count} productos`,
          userId
        }
      })

      return updatedProducts
    })
  },

  async restore(userId: string, productId: string): Promise<Product> {
    return prisma.$transaction(async (tx): Promise<Product> => {
      const product = await tx.product.findUnique({
        where: { id: productId }
      })

      if (!product) throw new AppError('Producto no encontrado', true)

      if (!product.deletedAt) {
        throw new AppError('El producto no esta eliminado', true)
      }

      const restoredProduct = await tx.product.update({
        where: { id: productId },
        data: { deletedAt: null, isActive: true },
        include: { category: true }
      })

      await tx.activity.create({
        data: {
          actionType: 'ACTUALIZAR',
          entity: 'PRODUCTO',
          entityId: restoredProduct.id,
          description: `Se restauro el producto ${restoredProduct.name}`,
          metadata: JSON.parse(JSON.stringify(restoredProduct)),
          userId
        }
      })

      const result = await tx.product.findUnique({
        where: { id: restoredProduct.id },
        select: productSelect
      })

      if (!result) throw new AppError('Producto no encontrado', true)

      return result
    })
  },

  async toggleStatus(
    userId: string,
    productId: string,
    isActive: boolean
  ): Promise<Product> {
    return prisma.$transaction(async (tx): Promise<Product> => {
      const product = await tx.product.findUnique({
        where: { id: productId }
      })

      if (!product) throw new AppError('Producto no encontrado', true)

      const updatedProduct = await tx.product.update({
        where: { id: productId },
        data: { isActive },
        include: { category: true }
      })

      await tx.activity.create({
        data: {
          actionType: updatedProduct.isActive ? 'ACTIVAR' : 'DESACTIVAR',
          entity: 'PRODUCTO',
          entityId: updatedProduct.id,
          description: `Se ${updatedProduct.isActive ? 'activo' : 'desactivo'} el producto ${updatedProduct.name}`,
          metadata: JSON.parse(JSON.stringify(updatedProduct)),
          userId
        }
      })

      const result = await tx.product.findUnique({
        where: { id: updatedProduct.id },
        select: productSelect
      })

      if (!result) throw new AppError('Producto no encontrado', true)

      return result
    })
  },

  toggleSelection(productId: string, isSelect: boolean): Promise<Product> {
    return prisma.product.update({
      where: { id: productId },
      data: { isSelect },
      select: productSelect
    })
  }
}
