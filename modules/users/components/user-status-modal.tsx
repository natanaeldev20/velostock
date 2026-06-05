import { toast } from '@heroui/react'
import { SealCheck } from '@gravity-ui/icons'
import { toggleUserStatus } from '../actions'
import { StatusModal } from '@/shared/components/status-modal'

export function UserStatusModal({
  userId,
  isActive
}: {
  userId: string
  isActive: boolean
}) {
  const handleStatus = async () => {
    const res = await toggleUserStatus(userId, isActive)
    if (!res.ok) {
      toast.danger('Error al cambiar de estado')
      return
    }
    toast.success(
      `Usuario ${res.data?.isActive ? 'activado' : 'desactivado'} con exitó`,
      { indicator: <SealCheck /> }
    )
  }

  return (
    <StatusModal
      title="Cambiar estado del usuario"
      isActive={isActive}
      userId={userId}
      onChange={handleStatus}
    />
  )
}
