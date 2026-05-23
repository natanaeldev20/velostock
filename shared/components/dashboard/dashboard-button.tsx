import { DashboardButtonProps } from '@/shared/domain/types/dashboard-button'
import { Icon } from '@gravity-ui/uikit'
import { Card } from '@heroui/react'
import Link from 'next/link'

export function DashboardButton({
  url,
  icon,
  className,
  text
}: DashboardButtonProps) {
  return (
    <Link href={url}>
      <Card
        variant="secondary"
        className={`flex flex-col items-center transition-colors ${className}`}
      >
        <Card.Title className="text-center text-white font-semibold">
          {text}
        </Card.Title>
        <Icon className="text-white" data={icon} size={25} />
      </Card>
    </Link>
  )
}
