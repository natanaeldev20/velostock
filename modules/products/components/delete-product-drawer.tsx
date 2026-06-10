import { DeleteDrawer } from '@/shared/components/delete-drawer'
import { hardDeleteProduct } from '../actions'
import { toast } from '@heroui/react'

export function DeleteProductDrawer({
  id,
  name
}: {
  id: string
  name: string
}) {
  const handleDelete = async () => {
    const res = await hardDeleteProduct(id)
    if (!res.ok) {
      toast.danger('No se pudo eliminar el producto')
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
