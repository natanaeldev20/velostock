import type { Product } from '../infrastructure/product.mapper'
import type { CreateProduct, UpdateProduct } from '../schemas/product.schema'

export interface ProductService {
  getMany: () => Promise<Product[]>
  getManyDeleted: () => Promise<Product[]>
  getManyActives: () => Promise<Product[]>
  getById: (productId: string) => Promise<Product>
  countAll: () => Promise<number>
  create: (userId: string, rawData: CreateProduct) => Promise<Product>
  update: (
    userId: string,
    productId: string,
    rawData: UpdateProduct
  ) => Promise<Product>
  softDelete: (userId: string, productId: string) => Promise<Product>
  hardDelete: (userId: string, productId: string) => Promise<Product>
  softDeleteMany: (userId: string) => Promise<{ count: number }>
  restore: (userId: string, productId: string) => Promise<Product>
  toggleStatus: (
    userId: string,
    productId: string,
    isActive: boolean
  ) => Promise<Product>
  toggleSelection: (productId: string, isSelect: boolean) => Promise<Product>
}
