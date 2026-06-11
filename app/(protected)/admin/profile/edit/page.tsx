import { getUserId } from '@/modules/auth/action/auth.action'
import { getUser } from '@/modules/users/actions'
import { EditProfileForm } from '@/modules/users/components/edit-profile-form'
import { Container } from '@/shared/components/container'
import { Section } from '@/shared/components/section'
import { ErrorMessage } from '@heroui/react'

export default async function EditProfilePage() {
  const { data } = await getUserId()
  if (!data) return <ErrorMessage>Error al cargar el usuarios</ErrorMessage>

  const res = await getUser(data.userId)
  if (!res.data) return <ErrorMessage>Error al cargar el perfil</ErrorMessage>

  return (
    <Section>
      <Container>
        <EditProfileForm user={res.data} />
      </Container>
    </Section>
  )
}
