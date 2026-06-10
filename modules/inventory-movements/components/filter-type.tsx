'use client'

import { Select, ListBox, type Key, Label } from '@heroui/react'
import { Type } from '@prisma/client'

export function FilterType({
  onChange
}: {
  onChange: (key: Type | 'TODO') => void
}) {
  function handleFilterType(key: Key | null) {
    if (key) {
      onChange(key as Type)
    }
  }

  return (
    <Select
      className="w-full sm:max-w-max"
      placeholder="Selecciona un tipo"
      onChange={handleFilterType}
    >
      <Label>Tipo</Label>
      <Select.Trigger>
        <Select.Value />
        <Select.Indicator />
      </Select.Trigger>
      <Select.Popover>
        <ListBox>
          <ListBox.Item id="TODO">TODO</ListBox.Item>
          <ListBox.Item id="ENTRADA">ENTRADA</ListBox.Item>
          <ListBox.Item id="SALIDA">SALIDA</ListBox.Item>
        </ListBox>
      </Select.Popover>
    </Select>
  )
}
