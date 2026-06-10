import { EmptyState } from '@/shared/components/empty-state'
import type { RecentActivitiesProps } from '../contracts/activity.contract'
import { RecentActivityCard } from './recent-activity-card'

export function RecentActivitiesList({ activities }: RecentActivitiesProps) {
  if (activities.length === 0)
    return (
      <EmptyState
        title="No hay actividades recientes"
        description="Cuando existan actividades aparecerán aquí."
      />
    )

  return (
    <div className="w-full grid gap-4 grid-cols-1">
      {activities.map((activity) => (
        <RecentActivityCard key={activity.id} activity={activity} />
      ))}
    </div>
  )
}
