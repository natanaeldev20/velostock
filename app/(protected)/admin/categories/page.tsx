import { CategoryContainer } from '@/modules/categories/components/category-container'
import { Container } from '@/shared/components/container'
import { Section } from '@/shared/components/section'
import { SiteHeader } from '@/shared/components/site-header'

export default async function CategoriesPage({
  searchParams
}: {
  searchParams: Promise<{ search?: string }>
}) {
  const { search } = await searchParams

  return (
    <Section>
      <SiteHeader
        title="Gestión de categorías"
        description="Registro, control y administración de categorías del sistema"
      />
      <Container>
        <CategoryContainer search={search} />
      </Container>
    </Section>
  )
}
