import { StatsSection } from '@/modules/analytics/components/stats-section'
import { StatsSkeleton } from '@/modules/analytics/components/stats-skeleton'
import { Suspense } from 'react'
import { SectionContainer } from '@/shared/components/section-container'

export default async function AdminPage() {
  return (
    <SectionContainer>
      <Suspense fallback={<StatsSkeleton />}>
        <StatsSection />
      </Suspense>
    </SectionContainer>
  )
}
