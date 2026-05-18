'use client'

import { Avatar, Button } from '@heroui/react'
import { Card } from '@heroui/react'
import { TrashBin } from '@gravity-ui/icons'
import Link from 'next/link'
import type { NotificationCard as NotificationCardProps } from '../contracts/notification.contract'

export function NotificationCard({ notification }: NotificationCardProps) {
  return (
    <Link className="z-10" href="/admin/categories">
      <Card variant="secondary" className="flex flex-row items-center">
        <div>
          <Avatar size="lg">
            <Avatar.Image
              className="object-cover"
              alt="Averly"
              src="https://akamai.sscdn.co/uploadfile/letras/fotos/3/2/3/a/323a0b69f882cd2d642c521d655d7ed9.jpg"
            />
          </Avatar>
        </div>
        <Card.Content>
          <Card.Title>{notification.title}</Card.Title>
          <Card.Description className="space-y-2">
            {notification.description}
          </Card.Description>
        </Card.Content>
        <div>
          <Button
            isIconOnly
            variant="danger"
            onClick={(e) => {
              e.preventDefault()
              e.stopPropagation()
            }}
            className="z-20"
          >
            <TrashBin />
          </Button>
        </div>
      </Card>
    </Link>
  )
}
