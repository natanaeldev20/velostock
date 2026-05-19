import type { NotificationList as NotificationListProps } from '../contracts/notification.contract'
import { NotificationCard } from './notification-card'

export function NotificationList({ notifications }: NotificationListProps) {
  return (
    <div className="flex flex-col gap-4">
      {notifications.length > 0 ? (
        notifications.map((item) => (
          <NotificationCard key={item.id} notification={item} />
        ))
      ) : (
        <p className="text-sm dark:text-white/80">No hay notificaciones</p>
      )}
    </div>
  )
}
