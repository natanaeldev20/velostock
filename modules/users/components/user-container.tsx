import { UserTable } from './user-table'
import { getUsers } from '../actions'
import { ErrorMessage } from '@heroui/react'
import type { UserContainerProps } from '../contracts/user.contract'

export async function UserContainer({ filters }: UserContainerProps) {
  const res = await getUsers(filters)

  if (!res.ok) return <ErrorMessage>No se pudo traer los usuarios</ErrorMessage>

  return <UserTable users={res.data ?? []} />
}
