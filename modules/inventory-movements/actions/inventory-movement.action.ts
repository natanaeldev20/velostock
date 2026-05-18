'use server'

import { handleAction } from '@/shared/infrastructure/handlers/handle-action'
import { inventoryMovementsService } from '../services/inventory-movement.service'
import { validateData, validateId } from '@/shared/utils/validations'
import {
  createInventoryMovementSchema,
  type CreateInventoryMovement
} from '../schemas/movement.schema'
import { authService } from '@/modules/auth/services/auth.service'

export const getInventoryMovements = () =>
  handleAction(() => inventoryMovementsService.getMany())

export const getInventoryMovement = (inventoryMovementId: string) =>
  handleAction(() => {
    const validatedId = validateId(inventoryMovementId)

    return inventoryMovementsService.getById(validatedId)
  })

export const createInventoryMovement = (rawData: CreateInventoryMovement) =>
  handleAction(
    async () => {
      const validatedData = validateData(createInventoryMovementSchema, rawData)
      const { userId } = await authService.getId()
      return inventoryMovementsService.create(userId, validatedData)
    },
    { successMessage: () => `Nuevo movimiento creado con exito.` }
  )
