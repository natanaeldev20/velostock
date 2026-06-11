import { ErrorMessage } from '@heroui/react'
import { getDeletedCategories } from '../actions'
import { DeletedCategoryTable } from './deleted-category-table'

export async function DeletedCategoryContainer() {
  const { data, ok } = await getDeletedCategories()

  if (!ok)
    return (
      <ErrorMessage>Error al cargar las categorías eliminadas</ErrorMessage>
    )
  return <DeletedCategoryTable categories={data ?? []} />
}
