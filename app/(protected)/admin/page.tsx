import { StatContainer } from '@/modules/analytics/components/stat-container'
import { StatsSkeleton } from '@/modules/analytics/components/stat-list-skeleton'
import { Suspense } from 'react'
import { Section } from '@/shared/components/section'
import { Person, ListUl, Box, Folders, Boxes3 } from '@gravity-ui/icons'
import { DashboardButton } from '@/shared/components/dashboard/dashboard-button'
import { DashboardButtonContainer } from '@/shared/components/dashboard/dashboard-button-container'
import { RecentActivities } from '@/modules/activities/components/recent-activities'
import { SiteHeader } from '@/shared/components/site-header'
import { Container } from '@/shared/components/container'
import { auth } from '@/auth'
import { Card } from '@heroui/react'
import { TagDollar } from '@gravity-ui/icons'
import { InventorySummaryContainer } from '@/modules/inventory/components/inventory-summary-container'

export default async function AdminPage() {
  const session = await auth()
  const date = new Date()

  return (
    <Section>
      <SiteHeader
        title={`Hola, ${session?.user?.name} 👋`}
        description={`Aquí esta el resumen de tu inventario hoy (${date.toLocaleString()})`}
      />
      <Container>
        <Suspense fallback={<p>Loading...</p>}>
          <InventorySummaryContainer />
        </Suspense>
        <Card className="ring-1 ring-slate-100 dark:ring-slate-800">
          <h2 className="text-xl font-semibold">Estadísticas Generales</h2>
          <Suspense fallback={<StatsSkeleton />}>
            <StatContainer />
          </Suspense>
        </Card>
      </Container>
    </Section>
  )
}
