import type { CreateInventoryMovement } from '../schemas/movement.schema'
import type { InventoryMovement } from '../infrastructure/inventory-movement.mapper'

export interface InventoryMovementService {
  getMany: () => Promise<InventoryMovement[]>
  getById: (inventoryMovementId: string) => Promise<InventoryMovement>
  create: (
    userId: string,
    data: CreateInventoryMovement
  ) => Promise<InventoryMovement>
}
