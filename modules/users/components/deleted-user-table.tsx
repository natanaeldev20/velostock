import { Table } from '@heroui/react'
import type { UsersProps } from '../contracts/user.contract'
import { DeletedUserRow } from './deleted-user-row'
import { EmptyState } from '@/shared/components/empty-state'

export function DeletedUserTable({ users }: UsersProps) {
  if (users.length === 0)
    return (
      <EmptyState
        title="0 usuarios eliminados"
        description="Cuando existan usuarios eliminados se mostraran aqui"
      />
    )

  return (
    <Table className="w-full h-[400px] sm:max-w-3xl sm:mx-auto">
      <Table.ScrollContainer>
        <Table.Content>
          <Table.Header>
            <Table.Column isRowHeader>Usuario</Table.Column>
            <Table.Column>Estado</Table.Column>
            <Table.Column>Acciones</Table.Column>
          </Table.Header>
          <Table.Body>
            {users.map((user) => (
              <DeletedUserRow key={user.id} user={user} />
            ))}
          </Table.Body>
        </Table.Content>
      </Table.ScrollContainer>
    </Table>
  )
}
