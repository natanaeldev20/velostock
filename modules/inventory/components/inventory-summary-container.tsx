import { InventorySummaryList } from './inventory-summary-list'
import { getInventoryOverview } from '../actions/inventory.action'
import { InventorySummaryCard } from '../contracts/inventory.contract'
import { Box, TagDollar } from '@gravity-ui/icons'

export async function InventorySummaryContainer() {
  const { data, ok } = await getInventoryOverview()

  if (!data || !ok) return null

  const inventorySummaryConfig: InventorySummaryCard[] = [
    {
      title: 'VALOR DEL INVENTARIO',
      description: 'Costo total de existencias',
      value: data.totalValue,
      icon: TagDollar
    },
    {
      title: 'STOCK TOTAL GLOBAL',
      description: 'Stock total del inventario',
      value: data.totalStock,
      icon: Box
    },
    {
      title: 'PRODUCTOS ACTIVOS',
      description: 'Cantidad total de productos activos',
      value: data.totalActiveProducts,
      icon: Box
    },
    {
      title: 'PRODUCTOS CON BAJO STOCK',
      description: 'Cantidad total de productos con bajo stock',
      value: data.totalProductsLowStock,
      icon: Box
    }
  ]

  return <InventorySummaryList items={inventorySummaryConfig} />
}
