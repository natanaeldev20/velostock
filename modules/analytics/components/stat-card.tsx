import { Icon } from '@gravity-ui/uikit'
import { Card } from '@heroui/react'
import Link from 'next/link'
import type { StatCard } from '../contracts/analytic.contract'

export function StatCard({ route, icon, title, value }: StatCard) {
  return (
    <Link href={route}>
      <Card
        className="border-2 border-gray-100 hover:bg-black/3 transition-all duration-300
       dark:border-white/7 dark:hover:bg-white/7"
      >
        <div className="flex flex-row items-center gap-4">
          <div
            className="w-12 h-12 bg-indigo-600 rounded-full flex items-center
         justify-center"
          >
            <Icon data={icon} size={25} className="text-white" />
          </div>
          <div className="space-y-2">
            <Card.Header>
              <Card.Description className="font-medium">
                {title}
              </Card.Description>
            </Card.Header>
            <Card.Content>
              <Card.Title className="text-2xl">{value}</Card.Title>
            </Card.Content>
          </div>
        </div>
      </Card>
    </Link>
  )
}
