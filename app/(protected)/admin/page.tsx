import { StatSection } from '@/modules/analytics/components/stat-section'
import { StatsSkeleton } from '@/modules/analytics/components/stat-list-skeleton'
import { Suspense } from 'react'
import { Section } from '@/shared/components/section'
import { Button, Card } from '@heroui/react'
import { Person, ListUl, Box, Folders, Boxes3 } from '@gravity-ui/icons'
import { DashboardButton } from '@/shared/components/dashboard/dashboard-button'
import { DashboardButtonContainer } from '@/shared/components/dashboard/dashboard-button-container'

export default async function AdminPage() {
  return (
    <Section>
      <Suspense fallback={<StatsSkeleton />}>
        <StatSection />
      </Suspense>
      <div className="mt-4 grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="md:col-span-3 space-y-6">
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
              className="bg-indigo-600 hover:bg-indigo-600"
            />
          </DashboardButtonContainer>
          <DashboardButtonContainer title="Productos y catego">
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
              text="Lista de categorías"
              className="bg-green-600 hover:bg-green-500"
            />
            <DashboardButton
              url="/"
              icon={ListUl}
              text="Lista de categorías"
              className="bg-green-600 hover:bg-green-500"
            />
          </DashboardButtonContainer>
        </div>
        <Card>
          <div className="flex flex-row items-center justify-between">
            <h1>Actividad reciente</h1>
            <Button className="bg-indigo-600">Ver todas</Button>
          </div>
          <p>hahaha</p>
          <p>hahaha</p>
          <p>hahaha</p>
          <p>hahaha</p>
          <p>hahaha</p>
          <p>hahaha</p>
          <p>hahaha</p>
          <p>hahaha</p>
          <p>hahaha</p>
          <p>hahaha</p>
          <p>hahaha</p>
          <p>hahaha</p>
          <p>hahaha</p>
        </Card>
      </div>
    </Section>
  )
}
