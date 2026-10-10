
import './BookingCard.css'

function getDateKey(value) {
  return value ? String(value).slice(0, 10) : ''
}

function formatDate(value) {
  const key = getDateKey(value)
  const [year, month, day] = key.split('-')

  if (!year || !month || !day) {
    return '—'
  }

  return `${day}.${month}.${year}`
}

function formatPrice(value) {
  return new Intl.NumberFormat('uk-UA', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 2,
  }).format(Number(value) || 0)
}

function getImageUrl(images) {
  const image = Array.isArray(images) ? images[0] : images

  if (typeof image !== 'string' || !image.trim()) {
    return ''
  }

  if (/^https?:\/\//i.test(image)) {
    return image
  }

  return `http://localhost:5000${
    image.startsWith('/') ? '' : '/'
  }${image}`
}

function getGuestLabel(value) {
  const guests = Number(value) || 1

  if (guests === 1) return '1 гість'
  if (guests >= 2 && guests <= 4) return `${guests} гості`

  return `${guests} гостей`
}

function BookingCard({ booking, onOpenListing }) {
  const imageUrl = getImageUrl(booking.images)

  const paymentLabel =
    booking.payment_status === 'paid'
      ? 'Оплачено'
      : booking.payment_status === 'partially_paid'
        ? 'Частково оплачено'
        : 'Статус оплати уточнюється'

  return (
    <article className="my-booking-card">
      <div className="my-booking-image-wrapper">
        {imageUrl ? (
          <img
            className="my-booking-image"
            src={imageUrl}
            alt={booking.title || 'Помешкання'}
          />
        ) : (
          <div className="my-booking-image-placeholder">
            HomeFU
          </div>
        )}
      </div>

      <div className="my-booking-content">
        <div className="my-booking-heading">
          <div>
            <p className="my-booking-location">
              {booking.location_city || 'Місце не вказано'}
            </p>

            <h2 className="my-booking-title">
              {booking.title || 'Помешкання'}
            </h2>
          </div>

          <span className="my-booking-status">
            Підтверджено
          </span>
        </div>

        <div className="my-booking-dates">
          <div>
            <span>Заїзд</span>
            <strong>{formatDate(booking.check_in)}</strong>
          </div>

          <div className="my-booking-date-divider" />

          <div>
            <span>Виїзд</span>
            <strong>{formatDate(booking.check_out)}</strong>
          </div>
        </div>

        <div className="my-booking-meta">
          <span>
            {getGuestLabel(booking.guests_count)}
          </span>

          <span>{paymentLabel}</span>
        </div>

        <div className="my-booking-bottom">
          <div className="my-booking-price">
            <strong>{formatPrice(booking.total_price)}</strong>
            <span>загальна вартість</span>
          </div>

          <button
            type="button"
            className="my-booking-view-button"
            onClick={() => onOpenListing(booking.listing_id)}
          >
            Переглянути помешкання
          </button>
        </div>
      </div>
    </article>
  )
}

export default BookingCard
