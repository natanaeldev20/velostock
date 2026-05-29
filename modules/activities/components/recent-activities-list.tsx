import type { RecentActivityList as RecentActivityListProps } from '../contracts/activity.contract'
import { RecentActivityCard } from './recent-activity-card'

export function RecentActivitiesList({ activities }: RecentActivityListProps) {
  if (activities.length === 0)
    return (
      <div className="text-center h-50">
        <p>No hay actividades</p>
      </div>
    )
  return (
    <div className="w-full flex flex-col gap-4">
      {activities.map((activity) => (
        <RecentActivityCard key={activity.id} activity={activity} />
      ))}
    </div>
  )
}
