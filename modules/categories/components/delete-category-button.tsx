import { DeleteDrawer } from '@/shared/components/delete-drawer'
import { CategoryProps } from '../contracts/category.contract'
import { softDeleteCategory } from '../actions'
import { toast } from '@heroui/react'

export function DeleteCategoryDrawer({ category }: CategoryProps) {
  const handleDelete = async () => {
    const res = await softDeleteCategory(category.id)
    if (!res.ok) {
      toast.danger(res.message)
      return
    }
    toast.success(res.message)
  }

  return (
    <DeleteDrawer
      title={`Estas seguro de eliminar a la categoría ${category.name}`}
      description="La categoría se movera a la papelera"
      onConfirm={handleDelete}
      buttonText="Mover a papelera"
    />
  )
}
