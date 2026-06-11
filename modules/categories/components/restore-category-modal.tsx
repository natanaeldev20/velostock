'use client'

import { RestoreModal } from '@/shared/components/restore-modal'
import { restoreCategory } from '../actions'
import { toast } from '@heroui/react'

export function RestoreCategoryModal({
  categoryId,
  name
}: {
  categoryId: string
  name: string
}) {
  async function handleRestore() {
    const res = await restoreCategory(categoryId)
    if (!res.ok) {
      toast.danger(res.message)
      return
    }
    toast.success(res.message)
  }

  return (
    <RestoreModal
      title={`Estas seguro de restaurar la categoría ${name}?`}
      description="La categoría se quitara de la papelera"
      onPress={handleRestore}
    />
  )
}
