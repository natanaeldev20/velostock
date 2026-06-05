import { ErrorMessage } from '@heroui/react'
import { getCategories } from '../actions'
import { CategoryTable } from './category-table'
import { Search } from '@/shared/components/search/search'

export async function CategoryContainer({ search }: { search?: string }) {
  const res = await getCategories(search)
  if (!res.ok)
    return <ErrorMessage>No se pudo traer las categorías</ErrorMessage>

  return (
    <div className="flex flex-col gap-4">
      <Search label="Busca por nombre" />
      <CategoryTable categories={res.data ?? []} />
    </div>
  )
}
