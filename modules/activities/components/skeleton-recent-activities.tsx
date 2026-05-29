import { Card, Skeleton } from '@heroui/react'

export function SkeletonRecentActivities() {
  return (
    <div className="flex flex-col gap-3">
      {Array.from({ length: 5 }).map((_, index) => (
        <Card
          key={index}
          variant="secondary"
          className="flex flex-row items-start gap-4 p-4 rounded-xl border-slate-100 shadow-sm transition-all duration-200"
        >
          <div className="relative">
            <Skeleton className="w-10 h-10 rounded-full" />
            <div className="absolute bottom-0 right-0 w-3 h-3 bg-slate-200 rounded-full ring-2 ring-white" />
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between gap-2">
              <div className="flex items-center gap-2 w-full">
                <Skeleton className="h-4 w-28 rounded-md" />
                <Skeleton className="h-3 w-16 rounded-md" />
                <Skeleton className="h-4 w-10 rounded-md ml-1" />
              </div>
            </div>

            <div className="mt-2 space-y-1.5">
              <Skeleton className="h-3 w-5/6 rounded-md" />
              <Skeleton className="h-3 w-2/3 rounded-md" />
            </div>
          </div>
        </Card>
      ))}
    </div>
  )
}
