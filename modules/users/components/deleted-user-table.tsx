import { Table } from '@heroui/react'
import type { UsersProps } from '../contracts/user.contract'
import { DeletedUserRow } from './deleted-user-row'

export function DeletedUserTable({ users }: UsersProps) {
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
