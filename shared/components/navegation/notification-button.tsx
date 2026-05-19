import { Badge, Button, Popover } from '@heroui/react'
import { Bell } from '@gravity-ui/icons'
import { Icon } from '@gravity-ui/uikit'
import { UnreadNotificationContainer } from '@/modules/notifications/components/unread-notification-container'
import Link from 'next/link'

export function NotificationButton() {
  return (
    <Popover>
      <Popover.Trigger>
        <Badge.Anchor>
          <Button variant="tertiary" isIconOnly>
            <Icon data={Bell} size={10} />
          </Button>
          <Badge color="danger" size="sm">
            5
          </Badge>
        </Badge.Anchor>
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
