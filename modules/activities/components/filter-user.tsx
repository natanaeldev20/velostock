'use client'

import { useState, useEffect } from 'react'
import { Select, ListBox, type Key, Avatar, Label } from '@heroui/react'
import { User } from '@/modules/users/infrastructure/user.mapper'
import { getUsers } from '@/modules/users/actions'
import { DEFAULT_AVATAR } from '@/shared/constants/avatar'

export function FilterUser({ onChange }: { onChange: (key: string) => void }) {
  const [users, setUsers] = useState<User[]>([])

  function handleFilterUser(key: Key | null) {
    if (key) {
      onChange(key as string)
    }
  }

  useEffect(() => {
    async function getData() {
      const { data } = await getUsers()
      setUsers(data ?? [])
    }

    getData()
  }, [])

  return (
    <Select placeholder="Seleccionar usuario" onChange={handleFilterUser}>
      <Label>Usuario</Label>
      <Select.Trigger>
        <Select.Value />
        <Select.Indicator />
      </Select.Trigger>
      <Select.Popover>
        <ListBox>
          <ListBox.Item id="TODOS">Todos los usuarios</ListBox.Item>
          {users.map((user) => (
            <ListBox.Item id={user.id} key={user.id}>
              <div className="flex flex-row gap-2 items-center">
                <Avatar size="lg">
                  <Avatar.Image src={user.imgUrl ?? DEFAULT_AVATAR} />
                  <Avatar.Fallback>
                    {user.name[0]}
                    {user.lastName[0]}
                  </Avatar.Fallback>
                </Avatar>
                <div className="flex flex-col">
                  <span className="font-bold">
                    {user.name} {user.lastName}
                  </span>
                  <span className="text-gray-500 dark:text-gray-300">
                    {user.username}
                  </span>
                </div>
              </div>
            </ListBox.Item>
          ))}
        </ListBox>
      </Select.Popover>
    </Select>
  )
}
