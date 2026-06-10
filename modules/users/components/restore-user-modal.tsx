'use client'

import { RestoreModal } from '@/shared/components/restore-modal'
import { restoreUser } from '../actions'
import { toast } from '@heroui/react'
import { UserProps } from '../contracts/user.contract'
import { DEFAULT_AVATAR } from '@/shared/constants/avatar'

export function RestoreUserModal({ user }: UserProps) {
  const AVATAR = user.imgUrl ?? DEFAULT_AVATAR
  async function handleRestore() {
    const res = await restoreUser(user.id)
    if (!res.ok) {
      toast.danger('No se pudo restaurar al usuario')
      return
    }
    toast.success(`Usuario ${user.name} restaurado correctamente`)
  }

  return (
    <RestoreModal
      title={`Estas seguro de restaurar a ${user.name} ${user.lastName}?`}
      description="El usuario se quitara de la papelera"
      imgUrl={AVATAR}
      name={user.username}
      onPress={handleRestore}
    />
  )
}
