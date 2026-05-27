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
        <div className="w-full mb-10 grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          <Card className="w-full flex flex-row gap-6 shadow-xl/50 shadow-indigo-600/80 ring-1 ring-indigo-400">
            <div className="space-y-2 flex-4">
              <Card.Header>
                <Card.Title className="font-bold">
                  VALOR DEL INVENTARIO
                </Card.Title>
                <Card.Description>Valor total del inventario</Card.Description>
              </Card.Header>
              <Card.Content>
                <span className="text-xl font-semibold sm:text-2xl">
                  $ 3000,000 💰
                </span>
              </Card.Content>
            </div>
            <div className="flex-1 flex justify-end">
              <div className="max-w-max max-h-max bg-indigo-600 p-2 rounded-lg shadow-sm shadow-blue-50/20">
                <Box className="size-6" />
              </div>
            </div>
          </Card>
          <Card className="w-full flex flex-row gap-6 shadow-xl/50 shadow-green-400/80 ring-1 ring-green-400">
            <div className="space-y-2 flex-4">
              <Card.Header>
                <Card.Title className="font-bold">
                  STOCK TOTAL GLOBAL
                </Card.Title>
                <Card.Description>Stock total del inventario</Card.Description>
              </Card.Header>
              <Card.Content>
                <span className="text-xl font-semibold sm:text-2xl">
                  3000 Unidades 📦
                </span>
              </Card.Content>
            </div>
            <div className="flex-1 flex justify-end">
              <div className="max-w-max max-h-max bg-green-400 p-2 rounded-lg shadow-sm shadow-blue-50/20">
                <Box className="size-6" />
              </div>
            </div>
          </Card>
          <Card className="w-full flex flex-row gap-6 shadow-xl/50 shadow-orange-400/80 ring-1 ring-orange-400">
            <div className="space-y-2 flex-4">
              <Card.Header>
                <Card.Title className="font-bold">PRODUCTOS ACTIVOS</Card.Title>
                <Card.Description>
                  Cantidad total de productos activos
                </Card.Description>
              </Card.Header>
              <Card.Content>
                <span className="text-xl font-semibold sm:text-2xl">
                  2,800 (de 3,200) 🏷️
                </span>
              </Card.Content>
            </div>
            <div className="flex-1 flex justify-end">
              <div className="max-w-max max-h-max bg-orange-400 p-2 rounded-lg shadow-sm shadow-blue-50/20">
                <Box className="size-6" />
              </div>
            </div>
          </Card>
          <Card className="w-full flex flex-row gap-6 shadow-xl/50 shadow-red-400/80 ring-1 ring-red-400">
            <div className="space-y-2 flex-4">
              <Card.Header>
                <Card.Title className="font-bold">PRODUCTOS ACTIVOS</Card.Title>
                <Card.Description>
                  Cantidad total de productos activos
                </Card.Description>
              </Card.Header>
              <Card.Content>
                <span className="text-xl font-semibold sm:text-2xl">
                  2,800 (de 3,200) 🏷️
                </span>
              </Card.Content>
            </div>
            <div className="flex-1 flex justify-end">
              <div className="max-w-max max-h-max bg-red-500 p-2 rounded-lg shadow-sm shadow-blue-50/20">
                <Box className="size-6" />
              </div>
            </div>
          </Card>
        </div>
        <Suspense fallback={<StatsSkeleton />}>
          <StatContainer />
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
      </Container>
    </Section>
  )
}
