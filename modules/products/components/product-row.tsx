import { Chip, TableCell, TableRow } from '@heroui/react'
import { ProductProps } from '../contracts/product.contract'
import { formatPeruCurrency } from '@/shared/utils/number-utils'
import ProductSelectionCheckbox from './product-selection-checkbox'
import { ProductStatusModal } from './product-status-modal'
import { ProductDetailsModal } from './product-details-modal'
import { EditProductDrawer } from './edit-product-drawer'
import { DeleteProductDrawer } from './delete-product-drawer'

export function ProductRow({ product }: ProductProps) {
  return (
    <TableRow>
      <TableCell>
        <ProductSelectionCheckbox
          isSelect={product.isSelect}
          productId={product.id}
        />
      </TableCell>
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
          <ProductStatusModal
            productId={product.id}
            isActive={product.isActive}
          />
          <ProductDetailsModal product={product} />
          <EditProductDrawer product={product} />
          <DeleteProductDrawer productId={product.id} name={product.name} />
        </div>
      </TableCell>
    </TableRow>
  )
}
