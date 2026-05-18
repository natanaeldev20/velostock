import { getNotifications } from '../actions'
import { NotificationList } from './notification-list'

export async function NotificationContainer() {
  const { ok, data } = await getNotifications()

  if (!ok || !data) return null

  return <NotificationList notifications={data} />
}
