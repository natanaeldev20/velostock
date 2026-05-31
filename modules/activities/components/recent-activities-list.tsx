import { EmptyState } from '@/shared/components/empty-state'
import type { RecentActivityListProps } from '../contracts/activity.contract'
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
    <div className="w-full grid gap-4 grid-cols-1 lg:grid-cols-2">
      {activities.map((activity) => (
        <RecentActivityCard key={activity.id} activity={activity} />
      ))}
    </div>
  )
}
