import { TableRow, TableCell, Chip } from '@heroui/react'
import { CategoryProps } from '../contracts/category.contract'
import { HardDeleteCategoryDrawer } from './hard-delete-category-drawer'
import { RestoreCategoryModal } from './restore-category-modal'

export function DeletedCategoryRow({ category }: CategoryProps) {
  return (
    <TableRow>
      <TableCell>{category.name}</TableCell>
      <TableCell>
        <Chip color={category.isActive ? 'success' : 'danger'}>
          {category.isActive ? 'Activo' : 'Inactivo'}
        </Chip>
      </TableCell>
      <TableCell>
        <div className="flex flex-row items-center gap-2">
          <RestoreCategoryModal categoryId={category.id} name={category.name} />
          <HardDeleteCategoryDrawer
            categoryId={category.id}
            name={category.name}
          />
        </div>
      </TableCell>
    </TableRow>
  )
}
