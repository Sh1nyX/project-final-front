import './BookingCard.css'

function getNights(checkIn, checkOut) {
  if (!checkIn || !checkOut) {
    return 0
  }

  const from = new Date(`${checkIn}T00:00:00Z`)
  const to = new Date(`${checkOut}T00:00:00Z`)

  return Math.max(
    0,
    Math.round(
      (to - from) / (1000 * 60 * 60 * 24)
    )
  )
}

function formatDate(value) {
  if (!value) {
    return 'Додайте дату'
  }

  const [year, month, day] = value
    .split('-')
    .map(Number)

  return `${String(day).padStart(2, '0')}.${String(
    month
  ).padStart(2, '0')}.${year}`
}

function BookingCard({
  listing,
  checkIn,
  checkOut,
  onGuestsClick,
}) {
  const pricePerNight =
    Number(listing.price_per_night) || 0

  const nights = getNights(
    checkIn,
    checkOut
  )

  const accommodationTotal =
    pricePerNight * nights

  const hasDates =
    Boolean(checkIn && checkOut && nights > 0)

  const handleDateClick = () => {
    const calendar =
      document.querySelector(
        '.availability-calendar'
      )

    if (calendar) {
      calendar.scrollIntoView({
        behavior: 'smooth',
        block: 'center',
      })
    }
  }

  return (
    <aside className="booking-card">

      <div className="booking-price">

        <strong>
          ₴ {pricePerNight.toLocaleString('uk-UA')}
        </strong>

        <span>
          за ніч
        </span>

      </div>

      <div className="booking-fields">

        <button
          type="button"
          className="booking-field booking-field-date"
          onClick={handleDateClick}
        >
          <span className="booking-label">
            ПРИБУТТЯ
          </span>

          <span className="booking-value">
            {formatDate(checkIn)}
          </span>
        </button>

        <button
          type="button"
          className="booking-field booking-field-date"
          onClick={handleDateClick}
        >
          <span className="booking-label">
            ВИЇЗД
          </span>

          <span className="booking-value">
            {formatDate(checkOut)}
          </span>
        </button>

        <button
          type="button"
          className="booking-field booking-field-guests"
          onClick={onGuestsClick}
        >
          <span className="booking-label">
            ГОСТІ
          </span>

          <span className="booking-value">
            {listing.max_guests || 1} гостя
          </span>
        </button>

      </div>

      <button
        type="button"
        className="booking-button"
        disabled={!hasDates}
      >
        Забронювати
      </button>

      <p className="booking-note">
        Поки що ви нічого не платите
      </p>

      {hasDates && (
        <div className="booking-summary">

          <div className="booking-summary-row">
            <span>
              ₴ {pricePerNight.toLocaleString('uk-UA')}{' '}
              × {nights} {
                nights === 1
                  ? 'ніч'
                  : 'ночі'
              }
            </span>

            <strong>
              ₴ {accommodationTotal.toLocaleString('uk-UA')}
            </strong>
          </div>

          <div className="booking-summary-divider" />

          <div className="booking-summary-row booking-summary-total">
            <span>
              Усього до сплати податків
            </span>

            <strong>
              ₴ {accommodationTotal.toLocaleString('uk-UA')}
            </strong>
          </div>

        </div>
      )}

    </aside>
  )
}

export default BookingCard