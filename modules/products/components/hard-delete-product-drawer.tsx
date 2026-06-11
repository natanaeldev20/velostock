'use client'

import { DeleteDrawer } from '@/shared/components/delete-drawer'
import { hardDeleteProduct } from '../actions'
import { toast } from '@heroui/react'

export function HardDeleteProductDrawer({
  productId,
  name
}: {
  productId: string
  name: string
}) {
  async function handleHardDelete() {
    const res = await hardDeleteProduct(productId)
    if (!res.ok) {
      toast.danger(res.message)
      return
    }
    toast.success(res.message)
  }

  return (
    <DeleteDrawer
      title={`Estas seguro de eliminar al producto ${name}?`}
      description="El producto se eliminara permanentemente del sistema"
      onConfirm={handleHardDelete}
      buttonText="Eliminar"
    />
  )
}
