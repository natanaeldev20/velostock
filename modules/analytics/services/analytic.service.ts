import type { AnalyticService, Analytic } from '../contracts/analytic.contract'
import { userService } from '@/modules/users/services/user.service'
import { categoryService } from '@/modules/categories/services/category.service'
import { productService } from '@/modules/products/services/product.service'
import { inventoryMovementService } from '@/modules/inventory-movements/services/inventory-movement.service'

export const analyticService: AnalyticService = {
  async getMany(): Promise<Analytic> {
    const [users, categories, products, inventoryMovements] = await Promise.all(
      [
        userService.countAll(),
        categoryService.countAll(),
        productService.countAll(),
        inventoryMovementService.countAll()
      ]
    )

    return { users, categories, products, inventoryMovements }
  }
}
