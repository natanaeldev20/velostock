import { Checkbox } from '@heroui/react'

export function SelectionCheckbox({
  isSelected,
  onChange
}: {
  isSelected: boolean
  onChange: () => void
}) {
  return (
    <Checkbox variant="secondary" isSelected={isSelected} onChange={onChange}>
      <Checkbox.Control>
        <Checkbox.Indicator />
      </Checkbox.Control>
    </Checkbox>
  )
}
