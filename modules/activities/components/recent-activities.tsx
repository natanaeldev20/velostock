import { Button, Card } from '@heroui/react'
import { Suspense } from 'react'
import { RecentActivitiesContainer } from './recent-activities-container'
import Link from 'next/link'
import { SkeletonListRecentActivities } from './skeleton-list-recent-activities'

export function RecentActivities() {
  return (
    <Card>
      <div className="flex flex-row items-center justify-between">
        <h2 className="text-md font-semibold lg:text-start md:text-lg">
          Actividades recientes
        </h2>
        <Link href={`/admin/activities`}>
          <Button className="bg-indigo-600">Ver todas</Button>
        </Link>
      </div>
      <Suspense fallback={<SkeletonListRecentActivities />}>
        <RecentActivitiesContainer />
      </Suspense>
    </Card>
  )
}
