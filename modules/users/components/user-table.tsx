'use client'

import { UserRow } from './user-row'
import { Chip, Table } from '@heroui/react'
import { UsersProps } from '../contracts/user.contract'
import { EmptyState } from '@/shared/components/empty-state'
import { useState } from 'react'
import type { FilterStatus } from '@/shared/domain/types/status'
import { StatusFilter } from '@/shared/components/search/status-filter'
import { DeleteAllUsersModal } from './delete-all-users-modal'

export function UserTable({ users }: UsersProps) {
  const [filter, setFilter] = useState<FilterStatus>('all')

  const filteredUsers = users.filter((user) => {
    if (filter === 'active') return user.isActive === true
    if (filter === 'desactive') return user.isActive === false
    return true
  })
  if (users.length === 0) {
    return (
      <EmptyState
        title="0 usuarios"
        description="No se encontraron usuarios relacionados a la busqueda"
      />
    )
  }

  return (
    <div className="w-full flex flex-col gap-4 md:max-w-2xl md:mx-auto lg:max-w-3xl">
      <div className="w-full flex flex-row gap-4 items-center justify-end">
        <StatusFilter onFilterChange={setFilter} />
        <Chip variant="tertiary" color="default">
          <Chip.Label>Total: {filteredUsers.length}</Chip.Label>
        </Chip>
        <DeleteAllUsersModal />
      </div>
      <Table className="h-[400px]">
        <Table.ScrollContainer>
          <Table.Content>
            <Table.Header>
              <Table.Column isRowHeader>Selección</Table.Column>
              <Table.Column>Usuario</Table.Column>
              <Table.Column>Estado</Table.Column>
              <Table.Column>Acciones</Table.Column>
            </Table.Header>
            <Table.Body>
              {filteredUsers.map((item) => (
                <UserRow key={item.id} user={item} />
              ))}
            </Table.Body>
          </Table.Content>
        </Table.ScrollContainer>
      </Table>
    </div>
  )
}
