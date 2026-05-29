import { Card } from '@heroui/react'
import { Suspense } from 'react'
import { StatsSkeleton } from './stats-skeleton'
import { StatsContainer } from './stats-container'

export function Stats() {
  return (
    <Card className="ring-1 ring-slate-100 dark:ring-slate-800">
      <h2 className="text-xl font-semibold">Estadísticas Generales</h2>
      <Suspense fallback={<StatsSkeleton />}>
        <StatsContainer />
      </Suspense>
    </Card>
  )
}
