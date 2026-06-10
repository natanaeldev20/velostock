import { Avatar, Chip, TableCell, TableRow } from '@heroui/react'
import { UserProps } from '../contracts/user.contract'
import { DEFAULT_AVATAR } from '@/shared/constants/avatar'
import { RestoreUserModal } from './restore-user-modal'
import { HardDeleteUserDrawer } from './hard-delete-user-drawer'

export function DeletedUserRow({ user }: UserProps) {
  const AVATAR = user.imgUrl ?? DEFAULT_AVATAR
  const NAME = user.name[0] + user.lastName[0]

  return (
    <TableRow>
      <TableCell>
        <div className="flex flex-row items-center gap-3">
          <Avatar size="sm">
            <Avatar.Image src={AVATAR} />
            <Avatar.Fallback>{NAME}</Avatar.Fallback>
          </Avatar>
          <div className="flex flex-col">
            <span className="font-bold">
              {user.name} {user.lastName}
            </span>
            <span>{user.username}</span>
          </div>
        </div>
      </TableCell>
      <TableCell>
        <Chip color={user.isActive ? 'success' : 'danger'}>
          {user.isActive ? 'Activo' : 'Inactivo'}
        </Chip>
      </TableCell>
      <TableCell>
        <div className="flex flex-row items-center gap-2">
          <RestoreUserModal user={user} />
          <HardDeleteUserDrawer user={user} />
        </div>
      </TableCell>
    </TableRow>
  )
}
