import { DetailsModal } from '@/shared/components/details-modal'
import { CategoryProps } from '../contracts/category.contract'

export function CategoryDetailsModal({ category }: CategoryProps) {
  return (
    <DetailsModal title="Detalles de categoría" isActive={category.isActive}>
      <div className="py-4">
        <h2 className="text-lg font-semibold text-white text-center">
          {category.name}
        </h2>
      </div>
    </DetailsModal>
  )
}
