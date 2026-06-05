import { UserProps } from '../contracts/user.contract'
import { DEFAULT_AVATAR } from '@/shared/constants/avatar'
import { DetailsModal } from '@/shared/components/details-modal'

export function UserDetailsModal({ user }: UserProps) {
  return (
    <DetailsModal title="Detalles de usuario" isActive={user.isActive}>
      <div className="flex justify-center py-2">
        <img
          className="w-[110px] ring-3 ring-white rounded-full aspect-square object-cover"
          src={user.imgUrl || DEFAULT_AVATAR}
        />
      </div>
      <div className="text-center flex flex-col">
        <span className="text-lg font-semibold text-white">
          {user.name} {user.lastName}
        </span>
        <span>{user.username}</span>
      </div>
    </DetailsModal>
  )
}
