import { getUnreadNotifications } from '../actions'
import { NotificationList } from './notification-list'

export async function UnreadNotificationContainer() {
  const { ok, data } = await getUnreadNotifications()

  if (!ok || !data) return null

  return <NotificationList notifications={data} />
}
