import {
  categorySelect,
  type Category
} from '../infrastructure/category.mapper'
import type { UpdateCategory, CreateCategory } from '../schemas/category.schema'
import { AppError } from '@/shared/domain/errors/app-error'
import type { CategoryServices } from '../contracts/category.contract'
import prisma from '@/shared/infrastructure/database/db'

export const categoryService: CategoryServices = {
  getMany(): Promise<Category[]> {
    return prisma.category.findMany({
      where: { deletedAt: null },
      select: categorySelect,
      orderBy: { createdAt: 'asc' }
    })
  },

  getManyDeleted(): Promise<Category[]> {
    return prisma.category.findMany({
      where: { deletedAt: { not: null } },
      select: categorySelect,
      orderBy: { deletedAt: 'asc' }
    })
  },

  getManyActives(): Promise<Category[]> {
    return prisma.category.findMany({
      where: { isActive: true, deletedAt: null },
      select: categorySelect,
      orderBy: { createdAt: 'asc' }
    })
  },

  async getById(categoryId: string): Promise<Category> {
    const category = await prisma.category.findUnique({
      where: { id: categoryId },
      select: categorySelect
    })

    if (!category) throw new AppError('Categoría no encontrada.', true)

    return category
  },

  async create(userId: string, data: CreateCategory): Promise<Category> {
    return prisma.$transaction(async (tx): Promise<Category> => {
      const existingCategoryName = await tx.category.findFirst({
        where: { name: data.name }
      })

      if (existingCategoryName) {
        throw new AppError(
          `Ya existe una categoría con el nombre: ${data.name}`,
          true
        )
      }

      const newCategory = await tx.category.create({
        data
      })

      await tx.activity.create({
        data: {
          actionType: 'CREAR',
          entity: 'CATEGORIA',
          entityId: newCategory.id,
          description: `Se creó la categoría: ${newCategory.name}`,
          metadata: JSON.parse(JSON.stringify(newCategory)),
          userId
        }
      })

      const result = await tx.category.findUnique({
        where: { id: newCategory.id },
        select: categorySelect
      })

      if (!result) throw new AppError('Categoría no encontrada', true)

      return result
    })
  },

  async update(
    userId: string,
    categoryId: string,
    data: UpdateCategory
  ): Promise<Category> {
    return prisma.$transaction(async (tx): Promise<Category> => {
      if (data.name) {
        const existingCategoryName = await tx.category.findFirst({
          where: { name: data.name, NOT: { id: categoryId } }
        })

        if (existingCategoryName) {
          throw new AppError(
            `Ya existe una categoría con el nombre: ${data.name}`,
            true
          )
        }
      }

      const previousCategory = await tx.category.findUnique({
        where: { id: categoryId }
      })

      const updatedCategory = await tx.category.update({
        where: { id: categoryId },
        data
      })

      await tx.activity.create({
        data: {
          actionType: 'ACTUALIZAR',
          entity: 'CATEGORIA',
          entityId: updatedCategory.id,
          description: `Se actualizo la categoría ${previousCategory?.name} a ${updatedCategory.name}`,
          metadata: JSON.parse(JSON.stringify(updatedCategory)),
          userId
        }
      })

      const result = await tx.category.findUnique({
        where: { id: updatedCategory.id },
        select: categorySelect
      })

      if (!result) throw new AppError('Categoría no encontrada', true)

      return result
    })
  },

  async softDelete(userId: string, categoryId: string): Promise<Category> {
    return prisma.$transaction(async (tx): Promise<Category> => {
      const category = await tx.category.findUnique({
        where: { id: categoryId }
      })

      if (!category) throw new AppError('Categoría no encontrada', true)

      const updatedCategory = await tx.category.update({
        where: { id: categoryId },
        data: {
          deletedAt: new Date(),
          isActive: false
        }
      })

      await tx.activity.create({
        data: {
          actionType: 'ACTUALIZAR',
          entity: 'CATEGORIA',
          entityId: updatedCategory.id,
          description: `Se movio a la papelera a la categoría ${updatedCategory.name}`,
          metadata: JSON.parse(JSON.stringify(updatedCategory)),
          userId
        }
      })

      const result = await tx.category.findUnique({
        where: { id: updatedCategory.id },
        select: categorySelect
      })

      if (!result) throw new AppError('Categoría no encontrada', true)

      return result
    })
  },

  async hardDelete(userId: string, categoryId: string): Promise<Category> {
    return prisma.$transaction(async (tx): Promise<Category> => {
      const category = await tx.category.findUnique({
        where: { id: categoryId },
        select: { ...categorySelect, _count: { select: { products: true } } }
      })

      if (!category) throw new AppError('Categoría no encontrada.', true)

      const existingProducts = category._count.products > 0

      if (existingProducts) {
        throw new AppError(
          `No se pudo eliminar la categoría ${category.name}, porque tiene productos asociados`
        )
      }

      const deletedCategory = await tx.category.delete({
        where: { id: categoryId }
      })

      await tx.activity.create({
        data: {
          actionType: 'ELIMINAR',
          entity: 'CATEGORIA',
          entityId: deletedCategory.id,
          description: `Se elimino completamente la categoría ${deletedCategory.name}.`,
          metadata: JSON.parse(JSON.stringify(deletedCategory)),
          userId
        }
      })

      const { _count, ...result } = category

      return result
    })
  },

  softDeleteMany(userId: string): Promise<{ count: number }> {
    return prisma.$transaction(async (tx): Promise<{ count: number }> => {
      const updatedCategories = await tx.category.updateMany({
        where: { isSelect: true },
        data: { deletedAt: new Date(), isActive: false }
      })

      await tx.activity.create({
        data: {
          actionType: 'ACTUALIZAR',
          entity: 'CATEGORIA',
          entityId: 'VARIOS',
          description: `Se mandaron a la papelara ${updatedCategories.count} categorias.`,
          userId
        }
      })

      return updatedCategories
    })
  },

  async restore(userId: string, categoryId: string): Promise<Category> {
    return prisma.$transaction(async (tx): Promise<Category> => {
      const category = await tx.category.findUnique({
        where: { id: categoryId }
      })

      if (!category) throw new AppError('Categoría no encontrada', true)

      if (!category.deletedAt) {
        throw new AppError(
          `La categoría ${category.name} no esta eliminada.`,
          true
        )
      }

      const restoredCategory = await tx.category.update({
        where: { id: categoryId },
        data: { deletedAt: null, isActive: true }
      })

      await tx.activity.create({
        data: {
          actionType: 'ACTUALIZAR',
          entity: 'CATEGORIA',
          entityId: restoredCategory.id,
          description: `Se restauro la categoría ${restoredCategory.name}.`,
          metadata: JSON.parse(JSON.stringify(restoredCategory)),
          userId
        }
      })

      const result = await tx.category.findUnique({
        where: { id: restoredCategory.id },
        select: categorySelect
      })

      if (!result) throw new AppError('Categoría no encontrada', true)

      return result
    })
  },

  async toggleStatus(
    userId: string,
    categoryId: string,
    isActive: boolean
  ): Promise<Category> {
    return prisma.$transaction(async (tx): Promise<Category> => {
      const category = await tx.category.findUnique({
        where: { id: categoryId }
      })

      if (!category) throw new AppError('Categoría no encontrada.', true)

      const updatedCategory = await tx.category.update({
        where: { id: categoryId },
        data: { isActive }
      })

      await tx.activity.create({
        data: {
          actionType: updatedCategory.isActive ? 'ACTIVAR' : 'DESACTIVAR',
          entity: 'CATEGORIA',
          entityId: updatedCategory.id,
          description: `Se ${updatedCategory.isActive ? 'activo' : 'desactivo'} la categoría ${updatedCategory.name}`,
          metadata: JSON.parse(JSON.stringify(updatedCategory)),
          userId
        }
      })

      const result = await tx.category.findUnique({
        where: { id: updatedCategory.id },
        select: categorySelect
      })

      if (!result) throw new AppError('Categoría no encontrada', true)

      return result
    })
  },

  toggleSelection(categoryId: string, isSelect: boolean): Promise<Category> {
    return prisma.category.update({
      where: { id: categoryId },
      data: { isSelect },
      select: categorySelect
    })
  }
}
