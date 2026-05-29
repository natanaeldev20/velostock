import { InventorySummaryList } from './inventory-summary-list'
import { getInventoryOverview } from '../actions/inventory.action'
import { InventorySummaryCard } from '../contracts/inventory.contract'
import {
  Box,
  TagDollar,
  ChartLineArrowUp,
  TriangleExclamation
} from '@gravity-ui/icons'
import { formatNumber, formatPeruCurrency } from '@/shared/utils/number-utils'

export async function InventorySummaryContainer() {
  const { data, ok } = await getInventoryOverview()

  if (!data || !ok) return null

  const inventorySummaryConfig: InventorySummaryCard[] = [
    {
      title: 'VALOR DEL INVENTARIO',
      description: 'Costo total de existencias',
      value: formatPeruCurrency(data.totalValue),
      icon: ChartLineArrowUp
    },
    {
      title: 'STOCK TOTAL GLOBAL',
      description: 'Stock total del inventario',
      value: `${formatNumber(data.totalStock)} Unidades`,
      icon: Box
    },
    {
      title: 'PRODUCTOS ACTIVOS',
      description: 'Cantidad total de productos activos',
      value: `${formatNumber(data.totalActiveProducts)} productos`,
      icon: TagDollar
    },
    {
      title: 'PRODUCTOS CON BAJO STOCK',
      description: 'Cantidad total de productos con bajo stock',
      value: `${formatNumber(data.totalProductsLowStock)} productos`,
      icon: TriangleExclamation
    }
  ]

  return <InventorySummaryList items={inventorySummaryConfig} />
}
