import { Bell } from '@gravity-ui/icons'
import { Icon } from '@gravity-ui/uikit'
import { Badge, Button } from '@heroui/react'
import { getTotalNotifications } from '../actions'

export async function NotificationBadge() {
  const { data } = await getTotalNotifications()
  const total = data?.notifications ?? 0

  return (
    <Badge.Anchor>
      <Button variant="tertiary" isIconOnly>
        <Icon data={Bell} size={10} />
      </Button>
      <Badge color="danger" size="sm">
        {total}
      </Badge>
    </Badge.Anchor>
  )
}
