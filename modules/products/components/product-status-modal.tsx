import { StatusModal } from '@/shared/components/status-modal'
import { toggleProductStatus } from '../actions'
import { toast } from '@heroui/react'
import { SealCheck } from '@gravity-ui/icons'

export function ProductStatusModal({
  productId,
  isActive
}: {
  productId: string
  isActive: boolean
}) {
  const handleStatus = async () => {
    const res = await toggleProductStatus(productId, isActive)
    if (!res.ok) {
      toast.danger('Error al cambiar de estado')
      return
    }
    toast.success(
      `Producto ${res.data?.isActive ? 'activado' : 'desactivado'} con exitó`,
      { indicator: <SealCheck /> }
    )
  }

  return (
    <StatusModal
      title="Cambiar estado de producto"
      isActive={isActive}
      onChange={handleStatus}
    />
  )
}
