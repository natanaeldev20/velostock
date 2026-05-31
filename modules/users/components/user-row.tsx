'use client'

import {
  Avatar,
  Checkbox,
  Chip,
  Switch,
  TableCell,
  TableRow
} from '@heroui/react'
import type { UserRowProps } from '../contracts/user.contract'
import { toggleSelectionUser } from '../actions'
//drop
import { EllipsisVertical, Pencil, TrashBin } from '@gravity-ui/icons'
import {
  Button,
  Description,
  Dropdown,
  Header,
  Label,
  Separator
} from '@heroui/react'

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
      <TableCell>
        <Dropdown>
          <Button isIconOnly aria-label="Menu" variant="secondary">
            <EllipsisVertical className="outline-none" />
          </Button>
          <Dropdown.Popover>
            <Dropdown.Menu onAction={(key) => console.log(`Selected: ${key}`)}>
              <Dropdown.Section>
                <Header>Acciones</Header>
                <Dropdown.Item
                  id="new-file"
                  textValue="New file"
                  shouldCloseOnSelect={false}
                >
                  <div className="flex flex-row items-center gap-3">
                    <Switch>
                      <Switch.Control>
                        <Switch.Thumb />
                      </Switch.Control>
                    </Switch>
                    <div className="flex flex-col">
                      <Label>Activar usuario</Label>
                      <Description>Activar o desactivar</Description>
                    </div>
                  </div>
                </Dropdown.Item>
                <Dropdown.Item>
                  <div className="flex h-8 items-start justify-center pt-px">
                    <Pencil className="size-4 shrink-0 text-muted" />
                  </div>
                  <div className="flex flex-col">
                    <Label>Editar usuario</Label>
                    <Description>Hacer cambios</Description>
                  </div>
                </Dropdown.Item>
              </Dropdown.Section>
              <Separator />
              <Dropdown.Section>
                <Header>Zona de peligro</Header>
                <Dropdown.Item variant="danger">
                  <div className="flex h-8 items-start justify-center pt-px">
                    <TrashBin className="size-4 shrink-0 text-danger" />
                  </div>
                  <div className="flex flex-col">
                    <Label>Eliminar usuario</Label>
                    <Description>Mover a la papelera</Description>
                  </div>
                </Dropdown.Item>
              </Dropdown.Section>
            </Dropdown.Menu>
          </Dropdown.Popover>
        </Dropdown>
      </TableCell>
    </TableRow>
  )
}
