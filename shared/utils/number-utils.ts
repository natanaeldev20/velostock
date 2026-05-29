export function formatPeruCurrency(value: number) {
  return (value ?? 0).toLocaleString('es-PE', {
    style: 'currency',
    currency: 'PEN'
  })
}

export function formatNumber(value: number) {
  return (value ?? 0).toLocaleString()
}
