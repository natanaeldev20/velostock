// src/app/admin/users/components/user-row.tsx
'use client'

import { useState, useRef, useEffect } from 'react'
import { Pencil, ShieldCheck } from '@gravity-ui/icons'

// Usamos el tipo exacto que me pasaste
type User = {
  id: string
  name: string
  lastName: string
  imgUrl: string | null
  username: string
  isActive: boolean
}

interface UserRowProps {
  user: User
}

export function UserRow({ user }: UserRowProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)

  // Cerrar el menú si se hace clic afuera (Detalle de UX Senior)
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  return (
    <tr className="group hover:bg-slate-50/50 transition-colors duration-150 border-b border-slate-100 last:border-none">
      {/* COLUMNA: AVATAR Y DATOS PERSONALES */}
      <td className="p-4 whitespace-nowrap">
        <div className="flex items-center gap-3">
          <div className="relative flex-shrink-0">
            {user.imgUrl ? (
              <img
                src={user.imgUrl}
                alt={`Foto de ${user.name}`}
                className="w-10 h-10 rounded-full object-cover border border-slate-200"
              />
            ) : (
              <div className="w-10 h-10 rounded-full bg-indigo-50 border border-indigo-100 flex items-center justify-center text-xs font-bold text-indigo-600">
                {user.name[0].toUpperCase()}
                {user.lastName[0].toUpperCase()}
              </div>
            )}
            <span
              className={`absolute bottom-0 right-0 block h-2.5 w-2.5 rounded-full ring-2 ring-white ${
                user.isActive ? 'bg-emerald-500' : 'bg-slate-400'
              }`}
            />
          </div>

          <div className="flex flex-col">
            <span className="text-sm font-semibold text-slate-800 group-hover:text-slate-900">
              {user.name} {user.lastName}
            </span>
            <span className="text-xs font-mono text-slate-400">
              ID: {user.id}
            </span>
          </div>
        </div>
      </td>

      {/* COLUMNA: USERNAME */}
      <td className="p-4 whitespace-nowrap">
        <span className="inline-flex text-xs font-mono text-slate-600 bg-slate-50 border border-slate-100 px-2 py-1 rounded-md">
          {user.username}
        </span>
      </td>

      {/* COLUMNA: BADGE DE ESTADO */}
      <td className="p-4 whitespace-nowrap text-center">
        <span
          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${
            user.isActive
              ? 'bg-emerald-50 text-emerald-700 border-emerald-100'
              : 'bg-slate-50 text-slate-500 border-slate-200'
          }`}
        >
          {user.isActive ? 'Activo' : 'Inactivo'}
        </span>
      </td>

      {/* COLUMNA: ACCIONES ACCESIBLES */}
      <td className="p-4 whitespace-nowrap text-right pr-6">
        <div className="inline-flex items-center gap-1">
          <button
            type="button"
            className="p-2 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors"
            title="Editar información"
          >
            <Pencil width={14} height={14} />
          </button>

          {/* Menú Dropdown Custom */}
          <div className="relative" ref={menuRef}>
            <button
              type="button"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className={`p-2 rounded-lg transition-colors ${
                isMenuOpen
                  ? 'bg-slate-100 text-slate-600'
                  : 'text-slate-400 hover:text-slate-600 hover:bg-slate-100'
              }`}
            ></button>

            {isMenuOpen && (
              <div className="absolute right-0 mt-1 w-44 bg-white border border-slate-100 rounded-xl shadow-xl py-1 z-10 animate-in fade-in slide-in-from-top-1 duration-150">
                <button
                  type="button"
                  className="w-full flex items-center gap-2 px-3 py-2 text-left text-xs text-slate-700 hover:bg-slate-50 transition-colors"
                >
                  <ShieldCheck
                    width={14}
                    height={14}
                    className="text-slate-400"
                  />
                  <span>Roles / Permisos</span>
                </button>
                <div className="h-px bg-slate-100 my-1" />
                <button
                  type="button"
                  className="w-full flex items-center gap-2 px-3 py-2 text-left text-xs text-rose-600 hover:bg-rose-50 font-medium transition-colors"
                >
                  <span>
                    {user.isActive ? 'Desactivar cuenta' : 'Activar cuenta'}
                  </span>
                </button>
              </div>
            )}
          </div>
        </div>
      </td>
    </tr>
  )
}
