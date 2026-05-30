import { Table } from '@heroui/react'
import { MovementRow } from './movement-row'
import { InventoryMovement } from '../infrastructure/inventory-movement.mapper'

interface MovementTableProps {
  movement: InventoryMovement[]
}

export function MovementTable({ movement }: MovementTableProps) {
  return (
    <Table>
      <Table.ScrollContainer>
        <Table.Content>
          <Table.Header>
            <Table.Column isRowHeader>Fecha</Table.Column>
            <Table.Column>Tipo ENTRADA/SALIDA</Table.Column>
            <Table.Column>Producto</Table.Column>
            <Table.Column>Cantidad</Table.Column>
            <Table.Column>Precio Mov.</Table.Column>
            <Table.Column>Usuario</Table.Column>
          </Table.Header>
          <Table.Body>
            {movement.map((item) => (
              <MovementRow
                id={item.id}
                key={item.id}
                date={item.date}
                type={item.type}
                product={item.product}
                quantity={item.quantity}
                priceAtMove={item.priceAtMove}
                user={item.user}
              />
            ))}
          </Table.Body>
        </Table.Content>
      </Table.ScrollContainer>
    </Table>
  )
}
