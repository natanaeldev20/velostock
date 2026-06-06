import { DetailsModal } from '@/shared/components/details-modal'
import { ProductProps } from '../contracts/product.contract'
import { formatPeruCurrency } from '@/shared/utils/number-utils'

export function ProductDetailsModal({ product }: ProductProps) {
  return (
    <DetailsModal title="Detalles de producto" isActive={product.isActive}>
      <div className="flex flex-col items-center py-6">
        <h2 className="text-lg font-semibold text-white">{product.name}</h2>
        <p>{product.description}</p>
        <p>Categoría: {product.category.name}</p>
        <p>Precio: {formatPeruCurrency(product.price)}</p>
        <p>Cantidad disponible: {product.stock}</p>
      </div>
    </DetailsModal>
  )
}
