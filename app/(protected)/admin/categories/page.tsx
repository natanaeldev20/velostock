import { CategoryContainer } from '@/modules/categories/components/category-container'
import { CreateCategoryModal } from '@/modules/categories/components/create-category-modal'
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
      >
        <CreateCategoryModal />
      </SiteHeader>
      <Container>
        <CategoryContainer search={search} />
      </Container>
    </Section>
  )
}
