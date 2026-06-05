import { DeleteAllButton } from '@/shared/components/delete-all-modal'
import { softDeleteManyCategories } from '../actions'
import { toast } from '@heroui/react'

export function DeleteAllCategoriesModal() {
  const handleDeleteAll = async () => {
    const res = await softDeleteManyCategories()
    if (!res.ok) {
      toast.danger(res.message)
      return
    }
    toast.success(res.message)
  }

  return (
    <DeleteAllButton
      title="Estas seguro de eliminar estas categorías?"
      description="Todas las categorías se moveran a la papelera"
      onConfirm={handleDeleteAll}
    />
  )
}
