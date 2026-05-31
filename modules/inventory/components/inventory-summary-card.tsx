import { Icon } from '@gravity-ui/uikit'
import { Card } from '@heroui/react'
import { InventorySummaryCard as InventorySummaryCardProps } from '../contracts/inventory.contract'

export function InventorySummaryCard(item: InventorySummaryCardProps) {
  return (
    <Card className="w-full flex flex-row gap-6 border-t-3 border-indigo-600 ring-1 ring-slate-100 hover:shadow-lg/10 hover:shadow-indigo-600/80 transition-all hover:-translate-y-1 dark:ring-slate-800">
      <div className="space-y-2 flex-4">
        <Card.Header>
          <Card.Title className="font-bold">{item.title}</Card.Title>
          <Card.Description>{item.description}</Card.Description>
        </Card.Header>
        <Card.Content>
          <span className="text-2xl font-semibold sm:text-3xl">
            {item.value}
          </span>
        </Card.Content>
      </div>
      <div className="flex-1 flex justify-end">
        <div className="max-w-max max-h-max bg-indigo-50 text-indigo-600 p-2 rounded-xl dark:bg-indigo-950/50 dark:text-indigo-400">
          <Icon data={item.icon} className="size-6" />
        </div>
      </div>
    </Card>
  )
}
