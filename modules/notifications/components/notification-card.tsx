'use client'

import { Avatar } from '@heroui/react'
import { Card } from '@heroui/react'
import { BellFill } from '@gravity-ui/icons'
import Link from 'next/link'
import type { NotificationCard as NotificationCardProps } from '../contracts/notification.contract'
import { DeleteNotificationButton } from './delete-notification-button'

export function NotificationCard({ notification }: NotificationCardProps) {
  const URL_DEFAULT = notification.url ?? '/admin'

  return (
    <Link className="z-10" href={URL_DEFAULT}>
      <Card variant="secondary" className="flex flex-row items-center">
        <div>
          <Avatar size="lg">
            <BellFill />
          </Avatar>
        </div>
        <Card.Content>
          <Card.Title>{notification.title}</Card.Title>
          <Card.Description className="space-y-2">
            {notification.description}
          </Card.Description>
        </Card.Content>
        <div>
          <DeleteNotificationButton notificationId={notification.id} />
        </div>
      </Card>
    </Link>
  )
}
