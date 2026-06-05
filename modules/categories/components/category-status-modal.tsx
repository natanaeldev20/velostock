import { StatusModal } from '@/shared/components/status-modal'
import { toggleCategoryStatus } from '../actions'
import { toast } from '@heroui/react'
import { SealCheck } from '@gravity-ui/icons'

export function CategoryStatusModal({
  categoryId,
  isActive
}: {
  categoryId: string
  isActive: boolean
}) {
  const handleStatus = async () => {
    const res = await toggleCategoryStatus(categoryId, isActive)
    if (!res.ok) {
      toast.danger(res.message)
      return
    }
    toast.success(
      `Categoría ${res.data?.isActive ? 'activada' : 'desactivada'} con exitó`,
      { indicator: <SealCheck /> }
    )
  }

  return (
    <StatusModal
      title="Cambiar estado de la categoría"
      userId={categoryId}
      isActive={isActive}
      onChange={handleStatus}
    />
  )
}
