import { Search } from '@/shared/components/search/search'
import { ProductTable } from './product-table'
import { getProducts } from '../actions'
import { ErrorMessage } from '@heroui/react'

export async function ProductContainer({ search }: { search: string }) {
  const products = await getProducts(search)

  if (!products.ok)
    return <ErrorMessage>No se pudo traer los productos</ErrorMessage>

  return (
    <div className="flex flex-col gap-4">
      <Search label="Buscar por nombre o por nombre de categoría" />
      <ProductTable products={products.data ?? []} />
    </div>
  )
}
