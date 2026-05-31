'use client'

import { Card, InputGroup, Label, TextField } from '@heroui/react'
import { Magnifier } from '@gravity-ui/icons'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { useDebouncedCallback } from 'use-debounce'

export function SearchUsers() {
  const searchParams = useSearchParams()
  const pathname = usePathname()
  const { replace } = useRouter()

  const handleSearch = useDebouncedCallback((value: string) => {
    const params = new URLSearchParams(searchParams)

    if (value) {
      params.set('search', value)
    } else {
      params.delete('search')
    }

    replace(`${pathname}?${params.toString()}`)
  }, 300)

  return (
    <Card variant="secondary" className="w-full">
      <TextField>
        <Label>Buscar por nombre, apellido o nombre de usuario:</Label>
        <InputGroup>
          <InputGroup.Prefix>
            <Magnifier className="size-4 text-muted" />
          </InputGroup.Prefix>
          <InputGroup.Input
            placeholder="Escribe..."
            defaultValue={searchParams.get('search')?.toString()}
            onChange={(e) => handleSearch(e.target.value)}
          />
        </InputGroup>
      </TextField>
    </Card>
  )
}
