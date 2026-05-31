import { EmptyState } from '@/shared/components/empty-state'
import type { NotificationList as NotificationListProps } from '../contracts/notification.contract'
import { NotificationCard } from './notification-card'

export function NotificationList({ notifications }: NotificationListProps) {
  if (notifications.length === 0)
    return (
      <EmptyState
        title="No hay notificaciones"
        description="Cuando existan notififaciones se mostraran aquí"
      />
    )
  return (
    <div className="flex flex-col gap-4">
      {notifications.map((item) => (
        <NotificationCard key={item.id} notification={item} />
      ))}
    </div>
  )
}
