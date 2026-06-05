import { toast } from '@heroui/react'
import { softDeleteManyUsers } from '../actions'
import { DeleteAllButton } from '@/shared/components/delete-all-modal'

export function DeleteAllUsersModal() {
  const handleDeleteAll = async () => {
    const res = await softDeleteManyUsers()
    if (!res.ok) {
      toast.danger(res.message)
      return
    }
    toast.success(res.message)
  }

  return (
    <DeleteAllButton
      title="Estas seguro de eliminar a estos usuarios?"
      description="Todos los usuarios se moveran a la papelera"
      onConfirm={handleDeleteAll}
    />
  )
}
