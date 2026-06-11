import { ErrorMessage } from '@heroui/react'
import { getDeletedProducts } from '../actions'
import { DeletedProductTable } from './deleted-product-table'

export async function DeletedProductContainer() {
  const { ok, data } = await getDeletedProducts()

  if (!ok)
    return <ErrorMessage>Error al cargar los productos eliminados</ErrorMessage>

  return <DeletedProductTable products={data ?? []} />
}
