import { UserRow } from './user-row'
import { Table } from '@heroui/react'
import { UserTableProps } from '../contracts/user.contract'
import { SearchUsers } from './search-users'

export function UserTable({ users }: UserTableProps) {
  // Manejo impecable de estados vacíos (UX excelente)
  if (users.length === 0) {
    return (
      <div className="w-full bg-white rounded-xl border border-slate-100 shadow-sm p-12 text-center">
        <p className="text-sm font-medium text-slate-500">
          No se encontraron usuarios activos o que coincidan con la búsqueda.
        </p>
        <p className="text-xs text-slate-400 mt-1">
          Intenta ajustando los filtros o agregando un nuevo registro.
        </p>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <SearchUsers />
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
