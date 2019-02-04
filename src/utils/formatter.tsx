export const formatCurrency = (
  value: number,
  currencyIsoCode: string
): string => {
  const lang = navigator.language
  return new Intl.NumberFormat(lang ? lang : 'de-DE', {
    currency: currencyIsoCode,
    style: 'currency',
  }).format(value)
}
