import { CreateMovementModal } from '@/modules/inventory-movements/components/create-movement-modal'
import { InventoryMovementContainer } from '@/modules/inventory-movements/components/inventory-movement-container'
import { Container } from '@/shared/components/container'
import { Section } from '@/shared/components/section'
import { SiteHeader } from '@/shared/components/site-header'
import { RefreshProvider } from '@/shared/context/refresh-context'

export default function InventoryMovementsPage() {
  return (
    <RefreshProvider>
      <Section>
        <SiteHeader
          title="Gestión de movimientos"
          description="Administra el control total de ingresos y salidas de productos del sistema"
        >
          <CreateMovementModal />
        </SiteHeader>
        <Container>
          <InventoryMovementContainer />
        </Container>
      </Section>
    </RefreshProvider>
  )
}
