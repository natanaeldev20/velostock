import { auth } from '@/auth'
import { SiteHeader } from '@/shared/components/site-header'
import { formatLongDate } from '@/shared/utils/date-utils'

export async function Welcome() {
  const session = await auth()
  const date = new Date()

  return (
    <SiteHeader
      title={`Hola, ${session?.user?.name} 👋`}
      description={`Aquí esta el resumen de tu inventario hoy (${formatLongDate(date)})`}
    />
  )
}
