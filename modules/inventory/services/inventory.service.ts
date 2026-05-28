import prisma from '@/shared/infrastructure/database/db'
import type {
  InventoryService,
  InventoryOverview
} from '../contracts/inventory.contract'

export const inventoryService: InventoryService = {
  async calculateTotalValue(): Promise<number> {
    const products = await prisma.product.findMany({
      select: { price: true, stock: true }
    })
    return products.reduce((acc, p) => acc + Number(p.price) * p.stock, 0)
  },
  async calculateTotalStock(): Promise<number> {
    const result = await prisma.product.aggregate({ _sum: { stock: true } })
    return result._sum.stock || 0
  },

  calculateTotalActiveProducts(): Promise<number> {
    return prisma.product.count({
      where: { isActive: true }
    })
  },

  calculateTotalProductsLowStock(): Promise<number> {
    return prisma.product.count({ where: { stock: { lte: 5 } } })
  },

  async getOverview(): Promise<InventoryOverview> {
    const [totalValue, totalStock, totalActiveProducts, totalProductsLowStock] =
      await Promise.all([
        this.calculateTotalValue(),
        this.calculateTotalStock(),
        this.calculateTotalActiveProducts(),
        this.calculateTotalProductsLowStock()
      ])

    return {
      totalValue,
      totalStock,
      totalActiveProducts,
      totalProductsLowStock
    }
  }
}
