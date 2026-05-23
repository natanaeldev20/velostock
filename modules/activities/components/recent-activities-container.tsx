import { getRecentActivities } from '../actions'
import { RecentActivitiesList } from './recent-activities-list'

export async function RecentActivitiesContainer() {
  const { ok, data } = await getRecentActivities()

  if (!ok || !data) return null

  return <RecentActivitiesList activities={data} />
}
