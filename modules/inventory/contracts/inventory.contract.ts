import { IconData } from '@gravity-ui/uikit'

export interface InventoryService {
  calculateTotalValue: () => Promise<number>
  calculateTotalStock: () => Promise<number>
  calculateTotalActiveProducts: () => Promise<number>
  calculateTotalProductsLowStock: () => Promise<number>
  getOverview: () => Promise<InventoryOverview>
}

export interface InventoryOverview {
  totalValue: number
  totalStock: number
  totalActiveProducts: number
  totalProductsLowStock: number
}

export interface InventorySummaryCard {
  title: string
  description: string
  value: number
  icon: IconData
}

export interface InventorySummaryList {
  items: InventorySummaryCard[]
}
