import { Select, ListBox } from '@heroui/react'
import type { Key } from 'react'
import type { FilterStatus } from '@/shared/domain/types/status'
import { UserFiltersProps } from '../contracts/user.contract'

export function UserFilters({ onFilterChange }: UserFiltersProps) {
  const handleSelectionChange = (key: Key | null) => {
    if (key) {
      onFilterChange(key as FilterStatus)
    }
  }
  return (
    <Select placeholder="Selecciona un estado" onChange={handleSelectionChange}>
      <Select.Trigger>
        <Select.Value />
        <Select.Indicator />
      </Select.Trigger>
      <Select.Popover>
        <ListBox>
          <ListBox.Item id="all" textValue="all">
            Todos
          </ListBox.Item>
          <ListBox.Item id="active" textValue="active">
            Activos
          </ListBox.Item>
          <ListBox.Item id="desactive" textValue="desactive">
            Desactivos
          </ListBox.Item>
        </ListBox>
      </Select.Popover>
    </Select>
  )
}
