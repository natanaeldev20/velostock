import { Button, Card } from '@heroui/react'
import { Suspense } from 'react'
import { RecentActivitiesContainer } from './recent-activities-container'
import Link from 'next/link'
import { SkeletonRecentActivities } from './skeleton-recent-activities'

export function RecentActivities() {
  return (
    <Card>
      <div className="flex flex-row items-center justify-between">
        <h2 className="text-xl font-semibold">Actividades recientes</h2>
        <Link href={`/admin/activities`}>
          <Button className="bg-indigo-600 transition-all hover:bg-indigo-500">
            Ver todas
          </Button>
        </Link>
      </div>
      <Suspense fallback={<SkeletonRecentActivities />}>
        <RecentActivitiesContainer />
      </Suspense>
    </Card>
  )
}
