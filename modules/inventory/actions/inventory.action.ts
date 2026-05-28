'use server'

import { handleAction } from '@/shared/infrastructure/handlers/handle-action'
import { inventoryService } from '../services/inventory.service'

export const getInventoryOverview = async () =>
  handleAction(() => inventoryService.getOverview())
