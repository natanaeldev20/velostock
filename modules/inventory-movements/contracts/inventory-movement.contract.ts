import type { CreateInventoryMovement } from '../schemas/movement.schema'
import type { InventoryMovement } from '../infrastructure/inventory-movement.mapper'

export interface InventoryMovementService {
  getMany: (startDate?: Date, endDate?: Date) => Promise<InventoryMovement[]>
  getRecents: () => Promise<InventoryMovement[]>
  getById: (inventoryMovementId: string) => Promise<InventoryMovement>
  countAll: () => Promise<number>
  create: (
    userId: string,
    data: CreateInventoryMovement
  ) => Promise<InventoryMovement>
}

export interface MovementProps {
  movement: InventoryMovement
}

export interface MovementsProps {
  movements: InventoryMovement[]
}
