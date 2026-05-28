import { getSummaryStats } from '../actions/analytic.action'
import type { StatCard } from '../contracts/analytic.contract'
import { StatList } from './stat-list'
import { Persons, Folders, Box, Boxes3 } from '@gravity-ui/icons'

export async function StatContainer() {
  const { data } = await getSummaryStats()

  if (!data) return null

  const statsConfig: StatCard[] = [
    {
      title: 'Usuarios',
      value: data.users,
      icon: Persons,
      route: '/admin/users'
    },
    {
      title: 'Categorías',
      value: data.categories,
      icon: Folders,
      route: '/admin/categories'
    },
    {
      title: 'Productos',
      value: data.products,
      icon: Box,
      route: '/admin/products'
    },
    {
      title: 'Movimientos',
      value: data.inventoryMovements,
      icon: Boxes3,
      route: 'admin/inventory'
    }
  ]

  return <StatList stats={statsConfig} />
}
