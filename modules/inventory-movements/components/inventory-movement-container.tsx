'use client'

import { useState, useEffect } from 'react'
import { DatePickerX } from '@/shared/components/date-picker-x'
import type { DateValue } from '@heroui/react'
import { MovementTable } from './movement-table'
import { getInventoryMovements } from '../actions'
import { InventoryMovement } from '../infrastructure/inventory-movement.mapper'

export function InventoryMovementContainer() {
  const [startDate, setStartDate] = useState<DateValue | null>(null)
  const [endDate, setEndDate] = useState<DateValue | null>(null)
  const [movements, setMovements] = useState<InventoryMovement[]>([])

  useEffect(() => {
    async function getData() {
      const { data } = await getInventoryMovements(
        startDate?.toDate('America/Lima'),
        endDate?.toDate('America/Lima')
      )
      setMovements(data ?? [])
    }

    getData()
  }, [startDate, endDate])
  return (
    <div className="space-y-4">
      <div className="flex flex-row justify-center sm:justify-end">
        <div className="flex flex-col sm:flex-row items-center gap-4">
          <DatePickerX
            label="Desde"
            value={startDate}
            onChange={setStartDate}
          />
          <DatePickerX label="Hasta" value={endDate} onChange={setEndDate} />
        </div>
      </div>
      <MovementTable movements={movements} />
    </div>
  )
}
