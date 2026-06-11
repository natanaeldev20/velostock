'use client'

import { RestoreModal } from '@/shared/components/restore-modal'
import { restoreProduct } from '../actions'
import { toast } from '@heroui/react'

export function RestoreProductModal({
  productId,
  name
}: {
  productId: string
  name: string
}) {
  async function handleRestore() {
    const { ok, message } = await restoreProduct(productId)
    if (!ok) {
      toast.danger(message)
      return
    }
    toast.success(message)
  }

  return (
    <RestoreModal
      title={`Estas seguro de restaurar al producto ${name}?`}
      description="El producto se removera de la papelera"
      onPress={handleRestore}
    />
  )
}
