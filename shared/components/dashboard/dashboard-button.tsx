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
        className={`grid grid-cols-1 grid-rows-2 justify-items-center transition-colors ${className}`}
      >
        <div className="line-clamp-1">
          <Card.Title className="text-center text-white font-semibold">
            {text}
          </Card.Title>
        </div>
        <Icon className="text-white" data={icon} size={25} />
      </Card>
    </Link>
  )
}
