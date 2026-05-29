import { Section } from '@/shared/components/section'
import { Container } from '@/shared/components/container'
import { Welcome } from '@/modules/auth/components/welcome'
import { InventorySummary } from '@/modules/inventory/components/inventory-summary'
import { Stats } from '@/modules/analytics/components/stats'
import { RecentActivities } from '@/modules/activities/components/recent-activities'

export default async function AdminPage() {
  return (
    <Section>
      <Welcome />
      <Container>
        <InventorySummary />
        <Stats />
        <div className="w-full grid grid-cols-1 sm:grid-cols-2">
          <RecentActivities />
        </div>
      </Container>
    </Section>
  )
}
