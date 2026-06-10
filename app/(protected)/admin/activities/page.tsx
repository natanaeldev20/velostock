import { ActivityContainer } from '@/modules/activities/components/activity-container'
import { Container } from '@/shared/components/container'
import { Section } from '@/shared/components/section'
import { SiteHeader } from '@/shared/components/site-header'
import { RefreshProvider } from '@/shared/context/refresh-context'

export default function ActivitiesPage() {
  return (
    <RefreshProvider>
      <Section>
        <SiteHeader
          title="Historial de Actividad"
          description="Registro detallado de las acciones y movimientos de los usuarios."
        />
        <Container>
          <ActivityContainer />
        </Container>
      </Section>
    </RefreshProvider>
  )
}
