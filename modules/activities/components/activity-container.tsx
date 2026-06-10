'use client'

import { useEffect, useState } from 'react'
import { getActivities } from '../actions'
import { Activity } from '../infrastructure/activity.mapper'
import { useRefresh } from '@/shared/context/refresh-context'
import { ActivityFilterContainer } from './activity-filter-container'

export function ActivityContainer() {
  const [activities, setActivities] = useState<Activity[]>([])
  const { refreshTrigger } = useRefresh()

  useEffect(() => {
    async function getData() {
      const { data } = await getActivities()
      setActivities(data ?? [])
    }

    getData()
  }, [refreshTrigger])

  return <ActivityFilterContainer activities={activities} />
}
