import { Table } from '@heroui/react'
import { MovementRow } from './movement-row'
import { MovementTableProps } from '../contracts/inventory-movement.contract'

export function MovementTable({ movements }: MovementTableProps) {
  return (
    <Table>
      <Table.ScrollContainer>
        <Table.Content>
          <Table.Header>
            <Table.Column isRowHeader>Hora</Table.Column>
            <Table.Column>Fecha</Table.Column>
            <Table.Column>Tipo ENTRADA/SALIDA</Table.Column>
            <Table.Column>Producto</Table.Column>
            <Table.Column>Cantidad</Table.Column>
            <Table.Column>Precio Mov.</Table.Column>
            <Table.Column>Usuario</Table.Column>
          </Table.Header>
          <Table.Body>
            {movements.map((item) => (
              <MovementRow key={item.id} movement={item} />
            ))}
          </Table.Body>
        </Table.Content>
      </Table.ScrollContainer>
    </Table>
  )
}
