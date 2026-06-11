'use client'

import { DeleteDrawer } from '@/shared/components/delete-drawer'
import { softDeleteProduct } from '../actions'
import { toast } from '@heroui/react'

export function DeleteProductDrawer({
  productId,
  name
}: {
  productId: string
  name: string
}) {
  const handleDelete = async () => {
    const res = await softDeleteProduct(productId)
    if (!res.ok) {
      toast.danger(res.message)
      return
    }
    toast.success(res.message)
  }

  return (
    <DeleteDrawer
      title={`Estas seguro de eliminar el producto ${name}`}
      description="El producto se movera a la papelera"
      onConfirm={handleDelete}
      buttonText="Mover a papelera"
    />
  )
}
