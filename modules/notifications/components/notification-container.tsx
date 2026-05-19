import { NotificationList } from './notification-list'
import { getNotifications } from '../actions'

export async function NotificationContainer() {
  const { ok, data } = await getNotifications()

  if (!ok || !data) return null

  return <NotificationList notifications={data} />
}
