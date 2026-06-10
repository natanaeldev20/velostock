'use client'

import { DeleteDrawer } from '@/shared/components/delete-drawer'
import { UserProps } from '../contracts/user.contract'
import { hardDeleteUser } from '../actions'
import { toast } from '@heroui/react'
import { DEFAULT_AVATAR } from '@/shared/constants/avatar'

export function HardDeleteUserDrawer({ user }: UserProps) {
  const AVATAR = user.imgUrl ?? DEFAULT_AVATAR
  const NAME = user.name[0] + user.lastName[0]

  async function handleHardDelete() {
    const res = await hardDeleteUser(user.id)
    if (!res.ok) {
      toast.danger('No se pudo eliminar este usuario')
      return
    }
    toast.success(`Usuario ${res.data?.name} eliminado correctamente`)
  }

  return (
    <DeleteDrawer
      title={`Estas seguro de eliminar a ${user.name} ${user.lastName}?`}
      description="El usuario se eliminara permanente del sistema"
      onConfirm={handleHardDelete}
      imgUrl={AVATAR}
      fallback={NAME}
      buttonText="Eliminar permanentemente"
    />
  )
}
