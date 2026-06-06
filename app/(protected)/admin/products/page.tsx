import { getCategories } from '@/modules/categories/actions'
import { CreateProductModal } from '@/modules/products/components/create-product-modal'
import { ProductContainer } from '@/modules/products/components/product-container'
import { Container } from '@/shared/components/container'
import { Section } from '@/shared/components/section'
import { SiteHeader } from '@/shared/components/site-header'

export default async function ProductsPage({
  searchParams
}: {
  searchParams: Promise<{ search: string }>
}) {
  const { search } = await searchParams

  const categeries = await getCategories()

  return (
    <Section>
      <SiteHeader
        title="Gestión de productos"
        description="Registro, control y administración de productos del sistema"
      >
        <CreateProductModal categories={categeries.data ?? []} />
      </SiteHeader>
      <Container>
        <ProductContainer search={search} />
      </Container>
    </Section>
  )
}
