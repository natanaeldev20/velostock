import { ErrorMessage } from '@heroui/react'
import { getDeletedUsers } from '../actions'
import { DeletedUserTable } from './deleted-user-table'

export async function DeletedUsersContainer() {
  const res = await getDeletedUsers()

  if (!res.ok)
    return <ErrorMessage>Error al cargar los usuarios eliminados</ErrorMessage>
  return <DeletedUserTable users={res.data ?? []} />
}
