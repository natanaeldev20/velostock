'use client'

import { readNotification } from '../actions'

export function NotificationClickWrapper({
  notificationId,
  children
}: {
  notificationId: string
  children: React.ReactNode
}) {
  return (
    <div
      className="w-full"
      onClick={async () => await readNotification(notificationId)}
    >
      {children}
    </div>
  )
}
