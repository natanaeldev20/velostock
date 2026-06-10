'use client'

import { useState, useEffect } from 'react'
import { DatePickerX } from '@/shared/components/date-picker-x'
import { type DateValue, Button } from '@heroui/react'
import { MovementTable } from './movement-table'
import { getInventoryMovements } from '../actions'
import { InventoryMovement } from '../infrastructure/inventory-movement.mapper'
import { useRefresh } from '@/shared/context/refresh-context'
import { FilterType } from './filter-type'
import { Type } from '@prisma/client'

export function InventoryMovementContainer() {
  const [startDate, setStartDate] = useState<DateValue | null>(null)
  const [endDate, setEndDate] = useState<DateValue | null>(null)
  const [movements, setMovements] = useState<InventoryMovement[]>([])
  const [filterType, setFilterType] = useState<Type | 'TODO'>()
  const { refreshTrigger } = useRefresh()

  const filteredMovements = movements.filter((m) => {
    if (filterType && filterType === 'TODO') return true
    if (filterType) return m.type === filterType
    return true
  })

  useEffect(() => {
    async function getData() {
      const { data } = await getInventoryMovements(
        startDate?.toDate('America/Lima'),
        endDate?.toDate('America/Lima')
      )
      setMovements(data ?? [])
    }

    getData()
  }, [startDate, endDate, refreshTrigger])
  return (
    <div className="space-y-4">
      <div className="flex flex-col justify-center items-center gap-4 sm:gap-0 sm:flex-row sm:justify-between">
        <FilterType onChange={setFilterType} />
        <div className="flex flex-col sm:flex-row items-center gap-4">
          <DatePickerX
            label="Desde"
            value={startDate}
            onChange={setStartDate}
          />
          <DatePickerX label="Hasta" value={endDate} onChange={setEndDate} />
        </div>
      </div>
      <MovementTable movements={filteredMovements} />
      <Button
        onClick={() => {
          setEndDate(null)
          setStartDate(null)
        }}
        className="bg-indigo-600 transition-all hover:bg-indigo-500"
      >
        Mostrar todo
      </Button>
    </div>
  )
}
