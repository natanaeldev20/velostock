import { CreateMovementModal } from '@/modules/inventory-movements/components/create-movement-modal'
import { Container } from '@/shared/components/container'
import { Section } from '@/shared/components/section'
import { SiteHeader } from '@/shared/components/site-header'

export default function InventoryMovementsPage() {
  return (
    <Section>
      <SiteHeader
        title="Gestión de movimientos"
        description="Administra el control total de ingresos y salidas de productos del sistema"
      >
        <CreateMovementModal />
      </SiteHeader>
      {/* <Container></Container> */}
    </Section>
  )
}
