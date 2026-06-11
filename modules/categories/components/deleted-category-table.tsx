import { Table } from '@heroui/react'
import { CategoriesProps } from '../contracts/category.contract'
import { DeletedCategoryRow } from './deleted-category-row'
import { EmptyState } from '@/shared/components/empty-state'

export function DeletedCategoryTable({ categories }: CategoriesProps) {
  if (categories.length === 0)
    return (
      <EmptyState
        title="0 categorías eliminadas"
        description="Cuando existan categorías eliminadas se mostraran aqui"
      />
    )

  return (
    <Table className="w-full h-[400px] sm:max-w-2xl sm:mx-auto">
      <Table.ScrollContainer>
        <Table.Content>
          <Table.Header>
            <Table.Column isRowHeader>Nombre</Table.Column>
            <Table.Column>Estado</Table.Column>
            <Table.Column>Acciones</Table.Column>
          </Table.Header>
          <Table.Body>
            {categories.map((category) => (
              <DeletedCategoryRow key={category.id} category={category} />
            ))}
          </Table.Body>
        </Table.Content>
      </Table.ScrollContainer>
    </Table>
  )
}
