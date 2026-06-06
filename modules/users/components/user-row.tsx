'use client'

import { Avatar, Checkbox, Chip, TableCell, TableRow } from '@heroui/react'
import type { UserProps } from '../contracts/user.contract'
import { toggleSelectionUser } from '../actions'
import { UserStatusModal } from './user-status-modal'
import { DeleteUserDrawer } from './delete-user-drawer'
import { EditUserDrawer } from './edit-user-drawer'
import { DEFAULT_AVATAR } from '@/shared/constants/avatar'
import { UserDetailsModal } from './user-details-modal'
import { SelectionCheckbox } from '@/shared/components/selection-checkbox'

export function UserRow({ user }: UserProps) {
  const AVATAR = user.imgUrl
  const NAME = user.name[0] + user.lastName[0]

  const handleSelection = async () => {
    await toggleSelectionUser(user.id, user.isSelect)
  }

  return (
    <TableRow>
      <TableCell className="pr-0">
        <SelectionCheckbox
          isSelected={user.isSelect}
          onChange={handleSelection}
        />
      </TableCell>
      <TableCell>
        <div className="flex flex-row items-center gap-3">
          <Avatar size="sm">
            <Avatar.Image src={AVATAR || DEFAULT_AVATAR} />
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
        <div className="flex items-center gap-2">
          <UserStatusModal userId={user.id} isActive={user.isActive} />
          <UserDetailsModal user={user} />
          <EditUserDrawer user={user} />
          <DeleteUserDrawer user={user} />
        </div>
      </TableCell>
    </TableRow>
  )
}
