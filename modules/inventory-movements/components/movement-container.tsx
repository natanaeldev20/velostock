import { MovementTable } from './movement-table'
import { getRecentInventoryMovements } from '../actions'
import { ErrorMessage } from '@heroui/react'

export async function MovementContainer() {
  const res = await getRecentInventoryMovements()

  if (!res.ok)
    return (
      <ErrorMessage>Error al cargar los movimientos recientes</ErrorMessage>
    )

  return <MovementTable movements={res.data ?? []} />
}
