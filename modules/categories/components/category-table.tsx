'use client'

import { Chip, Table } from '@heroui/react'
import { CategoriesProps } from '../contracts/category.contract'
import { CategoryRow } from './category-row'
import { StatusFilter } from '@/shared/components/search/status-filter'
import { useState } from 'react'
import { FilterStatus } from '@/shared/domain/types/status'
import { EmptyState } from '@/shared/components/empty-state'
import { DeleteAllCategoriesModal } from './delete-all-categories-modal'

export function CategoryTable({ categories }: CategoriesProps) {
  const [filter, setFilter] = useState<FilterStatus>('all')

  const filteredCategories = categories.filter((category) => {
    if (filter === 'active') return category.isActive === true
    if (filter === 'desactive') return category.isActive === false
    return true
  })

  if (categories.length === 0)
    return (
      <EmptyState
        title="0 categorías"
        description="No se encontraron categorías relacionadas a la busqueda"
      />
    )

  return (
    <div className="w-full flex flex-col gap-4 max-w-xl mx-auto">
      <div className="flex flex-row items-center justify-end gap-4">
        <StatusFilter onFilterChange={setFilter} />
        <Chip variant="tertiary" color="default">
          <Chip.Label>Total: {filteredCategories.length}</Chip.Label>
        </Chip>
        <DeleteAllCategoriesModal />
      </div>
      <Table className="h-100">
        <Table.ScrollContainer>
          <Table.Content>
            <Table.Header>
              <Table.Column isRowHeader>Selección</Table.Column>
              <Table.Column>Nombre</Table.Column>
              <Table.Column>Estado</Table.Column>
              <Table.Column>Acciones</Table.Column>
            </Table.Header>
            <Table.Body>
              {filteredCategories.map((item) => (
                <CategoryRow key={item.id} category={item} />
              ))}
            </Table.Body>
          </Table.Content>
        </Table.ScrollContainer>
      </Table>
    </div>
  )
}
