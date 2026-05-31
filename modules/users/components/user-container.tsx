import { UserTable } from './user-table'
import { getUsers } from '../actions'
import { ErrorMessage } from '@heroui/react'
import type { UserSearchParams } from '../contracts/user.contract'
import { SearchUsers } from './search-users'

export async function UserContainer({ search }: UserSearchParams) {
  const res = await getUsers(search)

  if (!res.ok) return <ErrorMessage>No se pudo traer los usuarios</ErrorMessage>

  return (
    <div className="flex flex-col gap-4">
      <SearchUsers />
      <UserTable users={res.data ?? []} />
    </div>
  )
}
