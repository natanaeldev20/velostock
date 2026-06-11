import { getUserId } from '@/modules/auth/action/auth.action'
import { getUser } from '@/modules/users/actions'
import { ErrorMessage } from '@heroui/react'

export default async function EditProfilePage() {
  const { data } = await getUserId()

  if (!data) return <ErrorMessage>Error al cargar el usuarios</ErrorMessage>
  const res = await getUser(data.userId)

  return (
    <div>
      <h1>{res.data?.name}</h1>
      <p>{res.data?.id}</p>
    </div>
  )
}
