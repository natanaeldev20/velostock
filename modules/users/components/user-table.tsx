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

  const handleSearch = useDebouncedCallback((term: string) => {
    const params = new URLSearchParams(searchParams)

    if (term) {
      params.set('search', term)
    } else {
      params.delete('search')
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
        <div className="relative w-full md:max-w-md">
          <span className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-slate-400"></span>
          <input
            type="text"
            placeholder="Buscar por nombre, apellido o nombre de usuario..."
            defaultValue={searchParams.get('search')?.toString()}
            onChange={(e) => handleSearch(e.target.value)} // 💡 Escucha el cambio
            className="w-full pl-10 pr-4 py-2 text-sm text-slate-900 bg-transparent placeholder-slate-400 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all"
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
