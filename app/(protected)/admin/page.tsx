import { StatSection } from '@/modules/analytics/components/stat-section'
import { StatsSkeleton } from '@/modules/analytics/components/stat-list-skeleton'
import { Suspense } from 'react'
import { Section } from '@/shared/components/section'
import { Person, ListUl, Box, Folders, Boxes3 } from '@gravity-ui/icons'
import { DashboardButton } from '@/shared/components/dashboard/dashboard-button'
import { DashboardButtonContainer } from '@/shared/components/dashboard/dashboard-button-container'
import { RecentActivities } from '@/modules/activities/components/recent-activities'

export default async function AdminPage() {
  return (
    <Section>
      <Suspense fallback={<StatsSkeleton />}>
        <StatSection />
      </Suspense>
      <div className="mt-4 grid grid-cols-1 lg:grid-cols-4 gap-4">
        <div className="lg:col-span-3 space-y-6">
          <DashboardButtonContainer title="Usuarios">
            <DashboardButton
              url="/admin/products"
              icon={Person}
              text="Nuevo usuario"
              className="bg-indigo-600 hover:bg-indigo-500"
            />
            <DashboardButton
              url="/admin/products"
              icon={ListUl}
              text="Lista de usuarios"
              className="bg-indigo-600 hover:bg-indigo-500"
            />
          </DashboardButtonContainer>
          <DashboardButtonContainer title="Productos y categorías">
            <DashboardButton
              url="/"
              icon={Box}
              text="Nuevo producto"
              className="bg-orange-600 hover:bg-orange-500"
            />
            <DashboardButton
              url="/"
              icon={ListUl}
              text="Lista de productos"
              className="bg-orange-600 hover:bg-orange-500"
            />
            <DashboardButton
              url="/"
              icon={Folders}
              text="Nueva categoría"
              className="bg-orange-600 hover:bg-orange-500"
            />
            <DashboardButton
              url="/"
              icon={ListUl}
              text="Lista de categorías"
              className="bg-orange-600 hover:bg-orange-500"
            />
          </DashboardButtonContainer>
          <DashboardButtonContainer title="Inventario">
            <DashboardButton
              url="/"
              icon={Boxes3}
              text="Nuevo movimiento manual"
              className="bg-green-600 hover:bg-green-500"
            />
            <DashboardButton
              url="/"
              icon={ListUl}
              text="Lista de movimientos"
              className="bg-green-600 hover:bg-green-500"
            />
          </DashboardButtonContainer>
        </div>
        <RecentActivities />
      </div>
    </Section>
  )
}
