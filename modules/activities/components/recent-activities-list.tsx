import { EmptyState } from '@/shared/components/empty-state'
import type { RecentActivityList as RecentActivityListProps } from '../contracts/activity.contract'
import { RecentActivityCard } from './recent-activity-card'

export function RecentActivitiesList({ activities }: RecentActivityListProps) {
  if (activities.length === 0)
    return (
      <EmptyState
        title="No hay actividades recientes"
        description="Cuando existan actividades aparecerán aquí."
      />
    )

  return (
    <div className="w-full flex flex-col gap-4">
      {activities.map((activity) => (
        <RecentActivityCard key={activity.id} activity={activity} />
      ))}
    </div>
  )
}
