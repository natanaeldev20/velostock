import { Button, Popover } from '@heroui/react'
import { UnreadNotificationContainer } from '@/modules/notifications/components/unread-notification-container'
import Link from 'next/link'
import { NotificationBadge } from '@/modules/notifications/components/notification-badge'

export function NotificationButton() {
  return (
    <Popover>
      <Popover.Trigger>
        <NotificationBadge />
      </Popover.Trigger>
      <Popover.Content className="w-full sm:w-100">
        <Popover.Dialog>
          <div className="flex flex-col gap-4">
            <h2 className="text-xl font-bold">Notificaciones</h2>
            <UnreadNotificationContainer />
            <div className="text-center">
              <Link href="/admin/notifications">
                <Button className="bg-indigo-600 transition-all hover:bg-indigo-500">
                  Ver todas las notificaciones
                </Button>
              </Link>
            </div>
          </div>
        </Popover.Dialog>
      </Popover.Content>
    </Popover>
  )
}
