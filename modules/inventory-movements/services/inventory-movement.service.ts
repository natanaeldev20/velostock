import type { CreateInventoryMovement } from '../schemas/movement.schema'
import prisma from '@/shared/infrastructure/database/db'
import { AppError } from '@/shared/domain/errors/app-error'
import {
  type InventoryMovement,
  inventoryMovementSelect
} from '../infrastructure/inventory-movement.mapper'
import { InventoryMovementService } from '../contracts/inventory-movement.contract'

export const inventoryMovementsService: InventoryMovementService = {
  getMany(): Promise<InventoryMovement[]> {
    return prisma.inventoryMovement.findMany({
      select: inventoryMovementSelect,
      orderBy: { createdAt: 'desc' }
    })
  },

  async getById(inventoryMovementId: string): Promise<InventoryMovement> {
    const inventoryMovement = await prisma.inventoryMovement.findUnique({
      where: { id: inventoryMovementId },
      select: inventoryMovementSelect
    })

    if (!inventoryMovement) {
      throw new AppError('No se encontro el movimiento de inventario.', true)
    }

    return inventoryMovement
  },

  create(
    userId: string,
    data: CreateInventoryMovement
  ): Promise<InventoryMovement> {
    return prisma.$transaction(async (tx) => {
      const product = await tx.product.findUnique({
        where: { id: data.productId }
      })

      if (!product) throw new AppError('Producto no encontrado', true)

      if (data.type === 'SALIDA' && product.stock < data.quantity) {
        throw new AppError(
          `Stock del producto ${product.name} insuficiente para este movimiento de inventario`
        )
      }

      const newStock =
        data.type === 'ENTRADA'
          ? product.stock + data.quantity
          : product.stock - data.quantity

      const newInventoryMovement = await tx.inventoryMovement.create({
        data: {
          type: data.type,
          quantity: data.quantity,
          productId: product.id,
          userId
        },
        select: inventoryMovementSelect
      })

      await tx.product.update({
        where: { id: newInventoryMovement.product.id },
        data: {
          stock: newStock
        }
      })

      await tx.activity.create({
        data: {
          actionType: 'CREAR',
          entity: 'MOVIMIENTO_INVENTARIO',
          entityId: newInventoryMovement.id,
          description: `Se creo un movimiento del producto ${newInventoryMovement.product.name}`,
          metadata: JSON.parse(JSON.stringify(newInventoryMovement)),
          userId
        }
      })

      const MIN_STOCK = 5

      if (product.stock >= MIN_STOCK && newStock < MIN_STOCK) {
        await tx.notification.create({
          data: {
            title: 'Stock Bajo',
            description: `El producto ${newInventoryMovement.product.name} tiene un stock bajo (${newStock} unidades disponibles)`
          }
        })
      }
      return newInventoryMovement
    })
  }
}
