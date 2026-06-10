'use client'

import { DeleteDrawer } from '@/shared/components/delete-drawer'
import { deleteActivity } from '../actions'
import { toast } from '@heroui/react'
import { useRefresh } from '@/shared/context/refresh-context'

export function DeleteActiviyDrawer({ activityId }: { activityId: string }) {
  const { triggerRefresh } = useRefresh()

  async function handleDelete() {
    const res = await deleteActivity(activityId)
    if (!res.ok) {
      toast.danger(res.message)
      return
    }
    toast.success(res.message)
    triggerRefresh()
  }

  return (
    <DeleteDrawer
      title="Estas seguro de eliminar esta actividad?"
      description="La actividad se eliminara permanentemente"
      onConfirm={handleDelete}
    />
  )
}
