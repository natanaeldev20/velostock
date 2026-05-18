'use client'

import { Dropdown, Label } from '@heroui/react'
import { ArrowRightFromSquare } from '@gravity-ui/icons'
import { signOut } from 'next-auth/react'

export function LogoutButton() {
  return (
    <Dropdown.Item
      id="logout"
      textValue="Logout"
      variant="danger"
      onClick={() => signOut()}
    >
      <div className="flex w-full items-center justify-between gap-2">
        <Label>Cerrar sesión</Label>
        <ArrowRightFromSquare className="size-3.5 text-danger" />
      </div>
    </Dropdown.Item>
  )
}
