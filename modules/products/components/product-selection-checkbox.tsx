import { SelectionCheckbox } from '@/shared/components/selection-checkbox'
import { toggleProductSelection } from '../actions'

export default function ProductSelectionCheckbox({
  productId,
  isSelect
}: {
  productId: string
  isSelect: boolean
}) {
  const handleSelection = async () => {
    await toggleProductSelection(productId, isSelect)
  }
  return <SelectionCheckbox isSelected={isSelect} onChange={handleSelection} />
}
