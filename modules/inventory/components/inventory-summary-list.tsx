import { InventorySummaryList as InventorySummaryListProps } from '../contracts/inventory.contract'
import { InventorySummaryCard } from './inventory-summary-card'

export function InventorySummaryList({ items }: InventorySummaryListProps) {
  return (
    <div className="w-full grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {items.map((item) => (
        <InventorySummaryCard
          key={item.title}
          title={item.title}
          description={item.description}
          value={item.value}
          icon={item.icon}
        />
      ))}
    </div>
  )
}
