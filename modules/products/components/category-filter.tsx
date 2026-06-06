import { Label, ListBox, Select } from '@heroui/react'
import type { Key } from 'react'
import type { CategoriesFilterProps } from '@/modules/categories/contracts/category.contract'

export function CategoryFilter({
  categories,
  onChange
}: CategoriesFilterProps) {
  const handleCategoryFilter = (key: Key | null) => {
    if (key) {
      onChange(key as string)
    }
  }

  return (
    <Select
      placeholder="Selecciona una categoría"
      onChange={handleCategoryFilter}
    >
      <Select.Trigger>
        <Select.Value />
        <Select.Indicator />
      </Select.Trigger>
      <Select.Popover>
        <ListBox>
          <ListBox.Item id="all">Todas las categorías</ListBox.Item>
          {categories.map((c) => (
            <ListBox.Item key={c.id} id={c.name}>
              {c.name}
            </ListBox.Item>
          ))}
        </ListBox>
      </Select.Popover>
    </Select>
  )
}
