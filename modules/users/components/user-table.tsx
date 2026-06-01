'use client'

import { UserRow } from './user-row'
import { Table } from '@heroui/react'
import { UserTableProps } from '../contracts/user.contract'
import { EmptyState } from '@/shared/components/empty-state'
import { UserFilters } from './user-filters'
import { useState } from 'react'
import type { FilterStatus } from '@/shared/domain/types/status'

export function UserTable({ users }: UserTableProps) {
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
        description="No se encontraron usuario para mostrar"
      />
    )
  }

  return (
    <div className="space-y-4">
      <div className="w-full flex flex-col gap-4 md:max-w-2xl md:mx-auto lg:max-w-3xl">
        <div className="w-full flex flex-row gap-4 items-center justify-end">
          <UserFilters onFilterChange={setFilter} />
          <div className="text-sm font-medium flex items-center">
            <span>Total: {filteredUsers.length}</span>
          </div>
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
    </div>
  )
}
