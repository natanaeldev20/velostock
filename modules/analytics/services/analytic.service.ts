import prisma from '@/shared/infrastructure/database/db'
import type { AnalyticService, Analytic } from '../contracts/analytic.contract'

export const analyticService: AnalyticService = {
  async getMany(): Promise<Analytic> {
    const [users, categories, products, inventoryMovements] = await Promise.all(
      [
        prisma.user.count(),
        prisma.category.count(),
        prisma.product.count(),
        prisma.inventoryMovement.count()
      ]
    )

    return { users, categories, products, inventoryMovements }
  }
}
