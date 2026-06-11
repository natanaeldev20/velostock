import { toast } from '@heroui/react'
import { softDeleteUser } from '../actions'
import { DeleteDrawer } from '@/shared/components/delete-drawer'
import { UserProps } from '../contracts/user.contract'
import { DEFAULT_AVATAR } from '@/shared/constants/avatar'

export function DeleteUserDrawer({ user }: UserProps) {
  const FULL_NAMES = `${user.name} ${user.lastName}`
  const FALLBACK = user.name[0] + user.lastName[0]
  const AVATAR = user.imgUrl

  const handleDelete = async () => {
    const res = await softDeleteUser(user.id)
    if (!res.ok) {
      toast.danger(res.message)
      return
    }
    toast.success(res.message)
  }

  return (
    <DeleteDrawer
      onConfirm={handleDelete}
      title={`Estas seguro de eliminar al usuario ${FULL_NAMES}?`}
      description="El usuario se movera a la papelera"
      imgUrl={AVATAR || DEFAULT_AVATAR}
      fallback={FALLBACK}
      buttonText="Mover a papelera"
    />
  )
}
