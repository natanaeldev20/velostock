import { Skeleton } from '@heroui/react'

export default function InventorySummarySkeleton() {
  return (
    <div className="w-full grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {Array.from({ length: 4 }).map((_, index) => (
        <div key={index} className="w-full p-4 flex flex-row">
          <div className="flex-3 space-y-4">
            <Skeleton className="w-full h-4" />
            <Skeleton className="w-full h-4" />
            <Skeleton className="w-12 h-8" />
          </div>
          <div className="flex-1 flex flex-row justify-end">
            <Skeleton className="w-8 h-8 rounded-xl" />
          </div>
        </div>
      ))}
    </div>
  )
}
