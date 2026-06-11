'use client'

import { Checkbox, Chip, TableCell, TableRow } from '@heroui/react'
import { CategoryProps } from '../contracts/category.contract'
import { toggleCategorySelection } from '../actions'
import { CategoryStatusModal } from './category-status-modal'
import { CategoryDetailsModal } from './category-details-modal'
import { EditCategoryDrawer } from './edit-category-drawer'
import { DeleteCategoryDrawer } from './delete-category-drawer'

export function CategoryRow({ category }: CategoryProps) {
  const handleSelection = () =>
    toggleCategorySelection(category.id, category.isSelect)

  return (
    <TableRow>
      <TableCell>
        <Checkbox
          variant="secondary"
          onChange={handleSelection}
          isSelected={category.isSelect}
        >
          <Checkbox.Control>
            <Checkbox.Indicator />
          </Checkbox.Control>
        </Checkbox>
      </TableCell>
      <TableCell>{category.name}</TableCell>
      <TableCell>
        <Chip color={category.isActive ? 'success' : 'danger'}>
          <Chip.Label>{category.isActive ? 'Activo' : 'Inactivo'}</Chip.Label>
        </Chip>
      </TableCell>
      <TableCell>
        <div className="flex flex-row items-center gap-2">
          <CategoryStatusModal
            categoryId={category.id}
            isActive={category.isActive}
          />
          <CategoryDetailsModal category={category} />
          <EditCategoryDrawer category={category} />
          <DeleteCategoryDrawer category={category} />
        </div>
      </TableCell>
    </TableRow>
  )
}
