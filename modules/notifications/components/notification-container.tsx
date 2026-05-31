import { NotificationList } from './notification-list'
import { getNotifications } from '../actions'
import { ErrorMessage } from '@heroui/react'

export async function NotificationContainer() {
  const { ok, data } = await getNotifications()

  if (!ok)
    return <ErrorMessage>No se pudo traer las notificaciones</ErrorMessage>

  return <NotificationList notifications={data ?? []} />
}
