export function formatDate(value: Date): string {
  if (!value) return 'No hay fecha disponible'

  return value.toLocaleDateString('es-PE', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  })
}

export function formatLongDate(value: Date): string {
  if (!value) return 'No hay fecha disponible'

  return value.toLocaleDateString('es-PE', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  })
}

export function formatDateTime(value: Date): string {
  if (!value) return 'No hay fecha disponible'

  return value.toLocaleDateString('es-PE', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    hour12: true
  })
}

export function formatHour12(value: Date): string {
  if (!value) return 'No hay fecha disponible'

  return value.toLocaleTimeString('es-PE', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: true
  })
}
