import { ErrorMessage } from '@heroui/react'
import { getRecentActivities } from '../actions'
import { RecentActivitiesList } from './recent-activities-list'

export async function RecentActivitiesContainer() {
  const res = await getRecentActivities()

  if (!res.ok)
    return (
      <ErrorMessage>Error al cargar las actividades recientes</ErrorMessage>
    )

  return <RecentActivitiesList activities={res.data ?? []} />
}
