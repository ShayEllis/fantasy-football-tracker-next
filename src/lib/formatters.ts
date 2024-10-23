const CURRENCY_FORMATTER = new Intl.NumberFormat('en-US', {
  currency: 'USD',
  style: 'currency',
  minimumFractionDigits: 0,
})

export function formatCurrencyFromCents(amount: number) {
  return CURRENCY_FORMATTER.format(amount / 100)
}

export function formatNumber(number: number) {
  return CURRENCY_FORMATTER.format(number)
}
