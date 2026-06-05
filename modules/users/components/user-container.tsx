import { UserTable } from './user-table'
import { getUsers } from '../actions'
import { ErrorMessage } from '@heroui/react'
import type { UserSearchParams } from '../contracts/user.contract'
import { Search } from '@/shared/components/search/search'

export async function UserContainer({ search }: UserSearchParams) {
  const res = await getUsers(search)

  if (!res.ok) return <ErrorMessage>No se pudo traer los usuarios</ErrorMessage>

  return (
    <div className="flex flex-col gap-4">
      <Search label="Buscar por nombre, apellido o nombre de usuario:" />
      <UserTable users={res.data ?? []} />
    </div>
  )
}
