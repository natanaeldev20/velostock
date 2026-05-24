import { UserNavData } from '@/modules/users/contracts/user.contract'
import { Avatar, Dropdown, Label } from '@heroui/react'
import { Gear, Persons } from '@gravity-ui/icons'
import { LogoutButton } from '@/modules/auth/components/logout-button'

const DEFAULT_AVATAR =
  'https://heroui-assets.nyc3.cdn.digitaloceanspaces.com/avatars/orange.jpg'

export function UserDropdown({ user }: UserNavData) {
  const avatar = user.imgUrl ?? DEFAULT_AVATAR
  const initials = `${user.name[0]} ${user.lastName[0]}`.toUpperCase()

  return (
    <Dropdown>
      <Dropdown.Trigger className="rounded-full cursor-pointer">
        <Avatar>
          <Avatar.Image
            className="object-cover"
            alt={`${user.name} ${user.lastName}`}
            src={avatar}
          />
          <Avatar.Fallback delayMs={600}>{initials}</Avatar.Fallback>
        </Avatar>
      </Dropdown.Trigger>

      <Dropdown.Popover>
        <div className="px-3 pt-3 pb-1">
          <div className="flex items-center gap-2">
            <Avatar size="sm">
              <Avatar.Image
                className="object-cover"
                alt={user.name}
                src={avatar}
              />
              <Avatar.Fallback delayMs={600}>{initials}</Avatar.Fallback>
            </Avatar>
            <div className="flex flex-col gap-0">
              <p className="text-sm leading-5 font-medium">
                {user.name} {user.lastName}
              </p>
              <p className="text-xs leading-none text-muted">{user.username}</p>
            </div>
          </div>
        </div>

        <Dropdown.Menu>
          <Dropdown.Item id="panel" textValue="Panel" href="/admin">
            <Label>Panel</Label>
          </Dropdown.Item>
          <Dropdown.Item id="profile" textValue="Profile" href="/admin/profile">
            <Label>Perfil</Label>
          </Dropdown.Item>
          <Dropdown.Item id="settings" textValue="Settings">
            <div className="flex w-full items-center justify-between gap-2">
              <Label>Configuración</Label>
              <Gear className="size-3.5 text-muted" />
            </div>
          </Dropdown.Item>
          <Dropdown.Item id="create-users" textValue="Create users">
            <div className="flex w-full items-center justify-between gap-2">
              <Label>Crear usuarios</Label>
              <Persons className="size-3.5 text-muted" />
            </div>
          </Dropdown.Item>
          <LogoutButton />
        </Dropdown.Menu>
      </Dropdown.Popover>
    </Dropdown>
  )
}
