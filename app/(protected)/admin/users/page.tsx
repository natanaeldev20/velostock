// src/app/admin/users/page.tsx
import { Section } from '@/shared/components/section'
import { SiteHeader } from '@/shared/components/site-header'
import { Container } from '@/shared/components/container'
import { UserContainer } from '@/modules/users/components/user-container'

interface PageProps {
  searchParams: Promise<{ name?: string; lastName?: string; username?: string }>
}

export default async function UserPage({ searchParams }: PageProps) {
  const filters = await searchParams

  return (
    <Section>
      <SiteHeader
        title="Gestión de usuarios"
        description="Registro, control y administración de las cuentas de acceso para el personal autorizado en el sistema"
      />
      <Container>
        <UserContainer filters={filters} />
      </Container>
    </Section>
  )
}
