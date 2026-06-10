'use client'

import { type Key, Label, ListBox, Select } from '@heroui/react'
import { ActionType } from '@prisma/client'

export function FilterActionType({
  onChange
}: {
  onChange: (key: ActionType | 'TODOS') => void
}) {
  function handleFilterType(key: Key | null) {
    if (key) {
      onChange(key as ActionType | 'TODOS')
    }
  }

  return (
    <Select placeholder="Seleccionar tipo" onChange={handleFilterType}>
      <Label>Tipo de acción</Label>
      <Select.Trigger>
        <Select.Value />
        <Select.Indicator />
      </Select.Trigger>
      <Select.Popover>
        <ListBox>
          <ListBox.Item id="TODOS">Todas las acciones</ListBox.Item>
          <ListBox.Item id="CREAR">Crear</ListBox.Item>
          <ListBox.Item id="ACTUALIZAR">Actualizar</ListBox.Item>
          <ListBox.Item id="ACTIVAR">Activar</ListBox.Item>
          <ListBox.Item id="DESACTIVAR">Desactivar</ListBox.Item>
          <ListBox.Item id="ELIMINAR">Eliminar</ListBox.Item>
        </ListBox>
      </Select.Popover>
    </Select>
  )
}
