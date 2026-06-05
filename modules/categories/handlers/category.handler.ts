import { toast } from '@heroui/react'
import { softDeleteManyCategories } from '../actions'

export const handleDeleteAll = async () => {
  const res = await softDeleteManyCategories()
  if (!res.ok) {
    toast.danger(res.message)
    return
  }
  toast.success(res.message)
}
