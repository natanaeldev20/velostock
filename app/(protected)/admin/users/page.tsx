// src/app/admin/users/page.tsx
import { UserTable } from '@/modules/users/components/user-table'
import { getUsers } from '@/modules/users/actions'

interface PageProps {
  searchParams: Promise<{ search?: string }>
}

export default async function UserContainer({ searchParams }: PageProps) {
  // 💡 Next.js te da los parámetros de la URL directamente aquí
  const { search } = await searchParams

  // Ejecutamos la consulta en el servidor pasando el filtro
  const { ok, data } = await getUsers(search)

  if (!ok || !data) {
    return <p>Error al cargar usuarios</p>
  }

  // Le pasamos los usuarios ya filtrados por la base de datos a tu vista
  return <UserTable users={data} />
}
