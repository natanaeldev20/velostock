import { Section } from '@/shared/components/section'
import { Container } from '@/shared/components/container'
import { Welcome } from '@/modules/auth/components/welcome'
import { InventorySummary } from '@/modules/inventory/components/inventory-summary'
import { Stats } from '@/modules/analytics/components/stats'
import { RecentActivities } from '@/modules/activities/components/recent-activities'
import { Movements } from '@/modules/inventory-movements/components/movements'

export default async function AdminPage() {
  return (
    <Section>
      <Welcome />
      <Container>
        <InventorySummary />
        <Stats />
        <div className="w-full grid gap-4 grid-cols-1 md:grid-cols-2">
          <RecentActivities />
          <Movements />
        </div>
      </Container>
    </Section>
  )
}
