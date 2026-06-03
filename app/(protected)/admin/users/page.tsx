// src/app/admin/users/page.tsx
import { Section } from '@/shared/components/section'
import { SiteHeader } from '@/shared/components/site-header'
import { Container } from '@/shared/components/container'
import { UserContainer } from '@/modules/users/components/user-container'
import { CreateUserButton } from '@/modules/users/components/create-user-button'

export default async function UserPage({
  searchParams
}: {
  searchParams: Promise<{ search?: string }>
}) {
  const { search } = await searchParams

  return (
    <Section>
      <SiteHeader
        title="Gestión de usuarios"
        description="Registro, control y administración de las cuentas de acceso para el personal autorizado en el sistema"
      >
        <CreateUserButton />
      </SiteHeader>
      <Container>
        <UserContainer search={search} />
      </Container>
    </Section>
  )
}
