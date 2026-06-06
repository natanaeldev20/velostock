'use client'

import { Chip, Table } from '@heroui/react'
import { ProductRow } from './product-row'
import { EmptyState } from '@/shared/components/empty-state'
import { useMemo, useState } from 'react'
import { FilterStatus } from '@/shared/domain/types/status'
import { StatusFilter } from '@/shared/components/search/status-filter'
import { DeleteAllCategoriesModal } from '@/modules/categories/components/delete-all-categories-modal'
import { CategoryFilter } from './category-filter'
import type { ProductsTableProps } from '../contracts/product.contract'

export function ProductTable({ products, categories }: ProductsTableProps) {
  const [filter, setFilter] = useState<FilterStatus>('all')
  const [selectedCategory, setSelectedCategory] = useState<string>('all')

  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      const statusFilter =
        filter === 'all' || p.isActive === (filter === 'active')
      const categoriesFilter =
        selectedCategory === 'all' || p.category.name === selectedCategory

      return statusFilter && categoriesFilter
    })
  }, [products, filter, selectedCategory])

  if (products.length === 0)
    return (
      <EmptyState
        title="0 productos"
        description="No se encontraron productos relacionados a la busqueda"
      />
    )

  return (
    <div className="w-full flex flex-col gap-4 md:max-w-4xl md:mx-auto">
      <div className="flex flex-col gap-2 sm:justify-end  sm:items-center sm:flex-row">
        <div className="flex flex-col gap-2 sm:flex-row">
          <CategoryFilter
            categories={categories}
            onChange={setSelectedCategory}
          />
          <StatusFilter onFilterChange={setFilter} />
        </div>
        <div className="flex flex-row gap-2 justify-end">
          <Chip variant="tertiary">
            <Chip.Label>Total: {filteredProducts.length}</Chip.Label>
          </Chip>
          <DeleteAllCategoriesModal />
        </div>
      </div>
      <Table className="h-[400px]">
        <Table.ScrollContainer>
          <Table.Content>
            <Table.Header>
              <Table.Column isRowHeader>Selección</Table.Column>
              <Table.Column>Nombre</Table.Column>
              <Table.Column>Descripción</Table.Column>
              <Table.Column>Precio</Table.Column>
              <Table.Column>Stock</Table.Column>
              <Table.Column>Estado</Table.Column>
              <Table.Column>Categoría</Table.Column>
              <Table.Column>Acciones</Table.Column>
            </Table.Header>
            <Table.Body>
              {filteredProducts.map((item) => (
                <ProductRow key={item.id} product={item} />
              ))}
            </Table.Body>
          </Table.Content>
        </Table.ScrollContainer>
      </Table>
    </div>
  )
}
