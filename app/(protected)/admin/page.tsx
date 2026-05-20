import { StatSection } from '@/modules/analytics/components/stat-section'
import { StatsSkeleton } from '@/modules/analytics/components/stat-list-skeleton'
import { Suspense } from 'react'
import { SectionContainer } from '@/shared/components/section-container'

export default async function AdminPage() {
  return (
    <SectionContainer>
      <Suspense fallback={<StatsSkeleton />}>
        <StatSection />
      </Suspense>
    </SectionContainer>
  )
}
