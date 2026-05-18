import { StatsSection } from '@/modules/analytics/components/stats-section'
import { StatsSkeleton } from '@/modules/analytics/components/stats-skeleton'
import { Suspense } from 'react'
import { getUserId } from '@/modules/auth/action/auth.action'
import { SectionContainer } from '@/shared/components/section-container'

export default async function AdminPage() {
  const { data } = await getUserId()
  return (
    <SectionContainer>
      <Suspense fallback={<StatsSkeleton />}>
        <StatsSection />
      </Suspense>
      <p>{data?.userId}</p>
    </SectionContainer>
  )
}
