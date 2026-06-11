import { Table } from '@heroui/react'
import { ProductsProps } from '../contracts/product.contract'
import { DeletedProductRow } from './deleted-product-row'
import { EmptyState } from '@/shared/components/empty-state'

export function DeletedProductTable({ products }: ProductsProps) {
  if (products.length === 0)
    return (
      <EmptyState
        title="0 productos eliminados"
        description="Cuando existan productos eliminados se mostraran aqui"
      />
    )

  return (
    <Table className="w-full h-[400px] sm:max-w-5xl sm:mx-auto">
      <Table.ScrollContainer>
        <Table.Content>
          <Table.Header>
            <Table.Column isRowHeader>Nombre</Table.Column>
            <Table.Column>Descripción</Table.Column>
            <Table.Column>Precio</Table.Column>
            <Table.Column>Stock</Table.Column>
            <Table.Column>Estado</Table.Column>
            <Table.Column>Categoría</Table.Column>
            <Table.Column>Acciones</Table.Column>
          </Table.Header>
          <Table.Body>
            {products.map((product) => (
              <DeletedProductRow key={product.id} product={product} />
            ))}
          </Table.Body>
        </Table.Content>
      </Table.ScrollContainer>
    </Table>
  )
}
