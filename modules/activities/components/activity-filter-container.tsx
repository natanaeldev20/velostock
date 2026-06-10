'use client'

import { useMemo, useState } from 'react'
import { ActivitiesProps } from '../contracts/activity.contract'
import { ActivityTable } from './activity-table'
import { DatePickerX } from '@/shared/components/date-picker-x'
import type { DateValue } from '@heroui/react'
import { FilterActionType } from './filter-action-type'
import { ActionType, Entity } from '@prisma/client'
import { FilterEntity } from './filter-entity'
import { FilterUser } from './filter-user'

export function ActivityFilterContainer({ activities }: ActivitiesProps) {
  const [startDate, setStartDate] = useState<DateValue | null>(null)
  const [endDate, setEndDate] = useState<DateValue | null>(null)
  const [filterActionType, setFilterActionType] = useState<
    ActionType | 'TODOS'
  >()
  const [filterEntity, setFilterEntity] = useState<Entity | 'TODAS'>()
  const [filterUser, setFilterUser] = useState<string | 'TODOS'>()

  const filteredActivities = useMemo(() => {
    return activities.filter((activity) => {
      const activityDate = new Date(activity.createdAt.setHours(0, 0, 0, 0))

      if (startDate) {
        const start = new Date(
          startDate.toDate('America/Lima').setHours(0, 0, 0, 0)
        )
        if (activityDate < start) return false
      }

      if (endDate) {
        const end = new Date(
          endDate.toDate('America/Lima').setHours(0, 0, 0, 0)
        )
        if (activityDate > end) return false
      }

      if (
        filterUser &&
        filterUser !== 'TODOS' &&
        activity.user.id !== filterUser
      ) {
        return false
      }

      if (
        filterEntity &&
        filterEntity !== 'TODAS' &&
        activity.entity !== filterEntity
      ) {
        return false
      }

      if (
        filterActionType &&
        filterActionType !== 'TODOS' &&
        activity.actionType !== filterActionType
      ) {
        return false
      }

      return true
    })
  }, [
    endDate,
    startDate,
    filterActionType,
    filterEntity,
    filterUser,
    activities
  ])

  return (
    <>
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex flex-col gap-4 md:flex-row md:items-center">
          <FilterUser onChange={setFilterUser} />
          <FilterEntity onChange={setFilterEntity} />
          <FilterActionType onChange={setFilterActionType} />
        </div>
        <div className="flex gap-4 flex-col items-center sm:flex-row md:items-center">
          <DatePickerX
            label="Desde"
            value={startDate}
            onChange={setStartDate}
          />
          <DatePickerX label="Hasta" value={endDate} onChange={setEndDate} />
        </div>
      </div>
      <ActivityTable activities={filteredActivities} />
    </>
  )
}
