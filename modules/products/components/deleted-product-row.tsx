import { Chip, TableCell, TableRow } from '@heroui/react'
import { ProductProps } from '../contracts/product.contract'
import { formatPeruCurrency } from '@/shared/utils/number-utils'
import { RestoreProductModal } from './restore-product-modal'
import { HardDeleteProductDrawer } from './hard-delete-product-drawer'

export function DeletedProductRow({ product }: ProductProps) {
  return (
    <TableRow>
      <TableCell>{product.name}</TableCell>
      <TableCell>{product.description}</TableCell>
      <TableCell>{formatPeruCurrency(product.price)}</TableCell>
      <TableCell>{product.stock}</TableCell>
      <TableCell>
        <Chip color={product.isActive ? 'success' : 'danger'}>
          <Chip.Label>{product.isActive ? 'Activo' : 'Inactivo'}</Chip.Label>
        </Chip>
      </TableCell>
      <TableCell>{product.category.name}</TableCell>
      <TableCell>
        <div className="flex flex-row items-center gap-2">
          <RestoreProductModal productId={product.id} name={product.name} />
          <HardDeleteProductDrawer productId={product.id} name={product.name} />
        </div>
      </TableCell>
    </TableRow>
  )
}
