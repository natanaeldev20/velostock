import { UserRow } from './user-row'
import { Table } from '@heroui/react'
import { UserTableProps } from '../contracts/user.contract'
import { SearchUsers } from './search-users'
import { EmptyState } from '@/shared/components/empty-state'

export function UserTable({ users }: UserTableProps) {
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
      <div className="w-full md:max-w-2xl md:mx-auto lg:max-w-3xl">
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
                {users.map((item) => (
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
