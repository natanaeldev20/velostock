'use client'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { UserRow } from './user-row'
import { useDebouncedCallback } from 'use-debounce'

type User = {
  id: string
  name: string
  lastName: string
  imgUrl: string | null
  username: string
  isActive: boolean
}

interface UsersListProps {
  users: User[]
}

export function UserTable({ users }: UsersListProps) {
  const searchParams = useSearchParams()
  const pathname = usePathname()
  const { replace } = useRouter()

  const handleSearch = useDebouncedCallback((value: string, field: string) => {
    const params = new URLSearchParams(searchParams)

    if (value) {
      params.set(field, value)
    } else {
      params.delete(field)
    }

    // Esto actualiza la URL (ej: /admin/users?search=carlos) sin recargar la página entera
    replace(`${pathname}?${params.toString()}`)
  }, 300)
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
    <div className="max-w-5xl mx-auto space-y-4">
      <div className="bg-white p-4 rounded-xl border border-slate-100 shadow-sm">
        <div className="w-full flex flex-col gap-4 md:flex-row">
          <input
            type="text"
            placeholder="Buscar por nombre"
            defaultValue={searchParams.get('name')?.toString()}
            onChange={(e) => handleSearch(e.target.value, 'name')} // 💡 Escucha el cambio
            className="w-full p-4 text-sm text-slate-900 bg-transparent placeholder-slate-400 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all"
          />
          <input
            type="text"
            placeholder="Buscar por apellido"
            defaultValue={searchParams.get('lastName')?.toString()}
            onChange={(e) => handleSearch(e.target.value, 'lastName')} // 💡 Escucha el cambio
            className="w-full p-4 text-sm text-slate-900 bg-transparent placeholder-slate-400 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all"
          />
          <input
            type="text"
            placeholder="Buscar por nombre de usuarios"
            defaultValue={searchParams.get('username')?.toString()}
            onChange={(e) => handleSearch(e.target.value, 'username')} // 💡 Escucha el cambio
            className="w-full p-4 text-sm text-slate-900 bg-transparent placeholder-slate-400 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all"
          />
        </div>
      </div>
      <div className="w-full bg-white rounded-xl border border-slate-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-100">
                <th className="p-4 text-xs font-semibold uppercase tracking-wider text-slate-500">
                  Usuario
                </th>
                <th className="p-4 text-xs font-semibold uppercase tracking-wider text-slate-500">
                  Username
                </th>
                <th className="p-4 text-xs font-semibold uppercase tracking-wider text-slate-500 text-center">
                  Estado
                </th>
                <th className="p-4 text-xs font-semibold uppercase tracking-wider text-slate-500 text-right pr-6">
                  Acciones
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {users.map((user) => (
                <UserRow key={user.id} user={user} />
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
