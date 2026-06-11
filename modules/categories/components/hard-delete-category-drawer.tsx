'use client'

import { DeleteDrawer } from '@/shared/components/delete-drawer'
import { hardDeleteCategory } from '../actions'
import { toast } from '@heroui/react'

export function HardDeleteCategoryDrawer({
  categoryId,
  name
}: {
  name: string
  categoryId: string
}) {
  async function handleHardDelete() {
    const res = await hardDeleteCategory(categoryId)
    if (!res.ok) {
      toast.danger(res.message)
      return
    }
    toast.success(res.message)
  }

  return (
    <DeleteDrawer
      title={`Estas seguro de eliminar la categoría ${name}?`}
      description="La categoría se eliminara permanentemente del sistema"
      onConfirm={handleHardDelete}
      buttonText="Eliminar"
    />
  )
}
