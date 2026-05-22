import { StatSection } from '@/modules/analytics/components/stat-section'
import { StatsSkeleton } from '@/modules/analytics/components/stat-list-skeleton'
import { Suspense } from 'react'
import { SectionContainer } from '@/shared/components/section-container'
import { Button, Card } from '@heroui/react'
import { Person } from '@gravity-ui/icons'

export default async function AdminPage() {
  return (
    <SectionContainer>
      <Suspense fallback={<StatsSkeleton />}>
        <StatSection />
      </Suspense>
      <div className="mt-4 grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="md:col-span-3 space-y-6">
          <div className="space-y-2">
            <h2>Usuarios</h2>
            <div className="grid gap-4 grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
              <Card className="flex flex-col items-center bg-indigo-600">
                <h1>Nuevo usuario</h1>
                <Person className="size-6" />
              </Card>
              <Card className="bg-indigo-600">
                <h1>Lista de usuarios</h1>
              </Card>
            </div>
          </div>
          <div className="space-y-2">
            <h2>Productos y categorías</h2>
            <div className="grid gap-4 grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
              <Card className="bg-orange-600">
                <h1>Nuevo producto</h1>
              </Card>
              <Card className="bg-orange-600">
                <h1>Lista de productos</h1>
              </Card>
              <Card className="bg-orange-600">
                <h1>Nueva categoría</h1>
              </Card>
              <Card className="bg-orange-600">
                <h1>Lista de categorías</h1>
              </Card>
            </div>
          </div>
          <div className="space-y-2">
            <h2>Inventario</h2>
            <div className="grid gap-4 grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
              <Card className="bg-green-600">
                <h1>Crear movimiento manual</h1>
              </Card>
              <Card className="bg-green-600">
                <h1>Lista de movimientos</h1>
              </Card>
            </div>
          </div>
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
    </SectionContainer>
  )
}
