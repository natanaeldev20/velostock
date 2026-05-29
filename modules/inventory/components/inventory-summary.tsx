import { Suspense } from 'react'
import { InventorySummaryContainer } from './inventory-summary-container'
import InventorySummarySkeleton from './inventory-summary-skeleton'

export function InventorySummary() {
  return (
    <div>
      <Suspense fallback={<InventorySummarySkeleton />}>
        <InventorySummaryContainer />
      </Suspense>
    </div>
  )
}
