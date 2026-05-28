'use server'

import { handleAction } from '@/shared/infrastructure/handlers/handle-action'
import { inventoryMovementService } from '../services/inventory-movement.service'
import { validateData, validateId } from '@/shared/utils/validations'
import {
  createInventoryMovementSchema,
  type CreateInventoryMovement
} from '../schemas/movement.schema'
import { authService } from '@/modules/auth/services/auth.service'

export const getInventoryMovements = async () =>
  handleAction(() => inventoryMovementService.getMany())

export const getInventoryMovement = async (inventoryMovementId: string) =>
  handleAction(() => {
    const validatedId = validateId(inventoryMovementId)

    return inventoryMovementService.getById(validatedId)
  })

export const countAllInventoryMovements = async () =>
  handleAction(() => inventoryMovementService.countAll())

export const createInventoryMovement = async (
  rawData: CreateInventoryMovement
) =>
  handleAction(
    async () => {
      const validatedData = validateData(createInventoryMovementSchema, rawData)
      const { userId } = await authService.getId()
      return inventoryMovementService.create(userId, validatedData)
    },
    { successMessage: () => `Nuevo movimiento creado con exito.` }
  )
