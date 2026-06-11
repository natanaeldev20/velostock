'use client'

import { ListBox, Select } from '@heroui/react'
import { useEffect, useState, type Key } from 'react'
import { Category } from '@/modules/categories/infrastructure/category.mapper'
import { getAllCategories } from '@/modules/categories/actions'

export function CategoryFilter({
  onChange
}: {
  onChange: (name: string) => void
}) {
  const [categories, setCategories] = useState<Category[]>([])

  useEffect(() => {
    async function getData() {
      const { data } = await getAllCategories()
      setCategories(data ?? [])
    }

    getData()
  }, [])

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
