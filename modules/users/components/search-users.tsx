'use client'

import { Card, InputGroup, Label, TextField } from '@heroui/react'
import { Magnifier } from '@gravity-ui/icons'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { useDebouncedCallback } from 'use-debounce'

export function SearchUsers() {
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
  return (
    <Card
      variant="secondary"
      className="w-full grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3"
    >
      <TextField>
        <Label>Buscar por nombre:</Label>
        <InputGroup>
          <InputGroup.Prefix>
            <Magnifier className="size-4 text-muted" />
          </InputGroup.Prefix>
          <InputGroup.Input
            placeholder="Natanael..."
            defaultValue={searchParams.get('name')?.toString()}
            onChange={(e) => handleSearch(e.target.value, 'name')}
          />
        </InputGroup>
      </TextField>
      <TextField>
        <Label>Buscar por Apellido:</Label>
        <InputGroup>
          <InputGroup.Prefix>
            <Magnifier className="size-4 text-muted" />
          </InputGroup.Prefix>
          <InputGroup.Input
            placeholder="Vasquez..."
            defaultValue={searchParams.get('lastName')?.toString()}
            onChange={(e) => handleSearch(e.target.value, 'lastName')}
          />
        </InputGroup>
      </TextField>
      <TextField>
        <Label>Buscar por nombre de usuario:</Label>
        <InputGroup>
          <InputGroup.Prefix>
            <Magnifier className="size-4 text-muted" />
          </InputGroup.Prefix>
          <InputGroup.Input
            placeholder="natanel2020..."
            defaultValue={searchParams.get('username')?.toString()}
            onChange={(e) => handleSearch(e.target.value, 'username')}
          />
        </InputGroup>
      </TextField>
    </Card>
  )
}
