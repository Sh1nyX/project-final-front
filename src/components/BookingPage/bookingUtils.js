export function getNights(checkIn, checkOut) {
  if (!checkIn || !checkOut) return 0

  const [y1, m1, d1] = checkIn.split('-').map(Number)
  const [y2, m2, d2] = checkOut.split('-').map(Number)

  const from = Date.UTC(y1, m1 - 1, d1)
  const to = Date.UTC(y2, m2 - 1, d2)

  return Math.max(
    0,
    Math.round((to - from) / 86400000)
  )
}

export function formatDateRange(checkIn, checkOut) {
  if (!checkIn || !checkOut) return 'Оберіть дати'

  const months = [
    'січ.', 'лют.', 'бер.', 'квіт.',
    'трав.', 'черв.', 'лип.', 'серп.',
    'вер.', 'жовт.', 'лист.', 'груд.',
  ]

  const [y1, m1, d1] = checkIn.split('-').map(Number)
  const [y2, m2, d2] = checkOut.split('-').map(Number)

  if (y1 === y2 && m1 === m2) {
    return `${d1}–${d2} ${months[m1 - 1]} ${y1}`
  }

  return `${d1} ${months[m1 - 1]} ${y1} – ${d2} ${months[m2 - 1]} ${y2}`
}

export function formatPrice(value) {
  return `₴ ${Number(value || 0).toLocaleString('uk-UA', {
    maximumFractionDigits: 2,
  })}`
}

export function getGuestLabel(count) {
  if (count === 1) return '1 гість'
  if (count >= 2 && count <= 4) return `${count} гості`
  return `${count} гостей`
}

export function getNightLabel(count) {
  const lastTwo = count % 100
  const lastOne = count % 10

  if (lastOne === 1 && lastTwo !== 11) return `${count} ніч`

  if (
    lastOne >= 2 &&
    lastOne <= 4 &&
    (lastTwo < 12 || lastTwo > 14)
  ) {
    return `${count} ночі`
  }

  return `${count} ночей`
}