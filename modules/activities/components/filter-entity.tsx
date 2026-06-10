'use client'

import { Select, ListBox, type Key, Label } from '@heroui/react'
import { Entity } from '@prisma/client'

export function FilterEntity({
  onChange
}: {
  onChange: (value: Entity | 'TODAS') => void
}) {
  function handleFilterEntity(key: Key | null) {
    if (key) {
      onChange(key as Entity | 'TODAS')
    }
  }

  return (
    <Select placeholder="Seleccionar entidad" onChange={handleFilterEntity}>
      <Label>Entidad</Label>
      <Select.Trigger>
        <Select.Value />
        <Select.Indicator />
      </Select.Trigger>
      <Select.Popover>
        <ListBox>
          <ListBox.Item id="TODAS">Todas las entidades</ListBox.Item>
          <ListBox.Item id="USUARIO">Usuario</ListBox.Item>
          <ListBox.Item id="PRODUCTO">Producto</ListBox.Item>
          <ListBox.Item id="CATEGORIA">Categoría</ListBox.Item>
          <ListBox.Item id="MOVIMIENTO_INVENTARIO">
            Movimiento de inventario
          </ListBox.Item>
        </ListBox>
      </Select.Popover>
    </Select>
  )
}
