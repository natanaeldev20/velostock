'use client'

import { TrashBin } from '@gravity-ui/icons'
import { Button, toast } from '@heroui/react'
import { deleteNotification } from '../actions'

export function DeleteNotificationButton({
  notificationId
}: {
  notificationId: string
}) {
  return (
    <Button
      isIconOnly
      variant="danger"
      onClick={async (e) => {
        e.preventDefault()
        e.stopPropagation()
        const res = await deleteNotification(notificationId)
        if (!res.ok) {
          toast.danger(res.message, { timeout: 3000 })
          return
        }

        toast.success(res.message, { timeout: 3000 })
      }}
      className="z-20"
    >
      <TrashBin />
    </Button>
  )
}
