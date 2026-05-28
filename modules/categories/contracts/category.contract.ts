import type { CreateCategory, UpdateCategory } from '../schemas/category.schema'
import type { Category } from '../infrastructure/category.mapper'

export interface CategoryServices {
  getMany: () => Promise<Category[]>
  getManyDeleted: () => Promise<Category[]>
  getManyActives: () => Promise<Category[]>
  getById: (categoryId: string) => Promise<Category>
  countAll: () => Promise<number>
  create: (userId: string, rawData: CreateCategory) => Promise<Category>
  update: (
    userId: string,
    categoryId: string,
    rawData: UpdateCategory
  ) => Promise<Category>
  softDelete: (userId: string, categoryId: string) => Promise<Category>
  hardDelete: (userId: string, categoryId: string) => Promise<Category>
  softDeleteMany: (userId: string) => Promise<{ count: number }>
  restore: (userId: string, categoryId: string) => Promise<Category>
  toggleStatus: (
    userId: string,
    categoryId: string,
    isActive: boolean
  ) => Promise<Category>
  toggleSelection: (categoryId: string, isSelect: boolean) => Promise<Category>
}
