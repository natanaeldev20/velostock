'use client'

import { Avatar, Checkbox, Chip, TableCell, TableRow } from '@heroui/react'
import type { UserRowProps } from '../contracts/user.contract'
import { toggleSelectionUser } from '../actions'

export function UserRow({ user }: UserRowProps) {
  const DEFAULT_AVATAR =
    'https://heroui-assets.nyc3.cdn.digitaloceanspaces.com/avatars/purple.jpg'
  const AVATAR = user.imgUrl ?? DEFAULT_AVATAR
  const NAME = user.name[0] + user.lastName[0]

  const handleSelection = async () => {
    await toggleSelectionUser(user.id, user.isSelect)
  }

  return (
    <TableRow>
      <TableCell className="pr-0">
        <Checkbox
          variant="secondary"
          isSelected={user.isSelect}
          onChange={handleSelection}
        >
          <Checkbox.Control>
            <Checkbox.Indicator />
          </Checkbox.Control>
        </Checkbox>
      </TableCell>
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
      <TableCell></TableCell>
    </TableRow>
  )
}
