import {
  formatPrice,
  getNightLabel,
} from '../bookingUtils'

import './BookingSummaryCard.css'

function BookingSummaryCard({
  listing,
  nights,
  accommodationTotal,
  cleaningFee,
  total,
}) {
  const image = Array.isArray(listing.images)
    ? listing.images[0]
    : ''

  const hostName = [
    listing.host_first_name || listing.host_name,
    listing.host_last_name,
  ]
    .filter(Boolean)
    .join(' ')

  const hasRating = listing.rating != null

  return (
    <aside className="booking-summary-card">
      <div className="booking-summary-listing">
        {image ? (
          <img
            src={image}
            alt={listing.title || 'Фото помешкання'}
          />
        ) : (
          <div className="booking-summary-image-placeholder">
            HomeFU
          </div>
        )}

        <div className="booking-summary-listing-info">
          <span>
            {listing.property_type || 'Помешкання'}
            {listing.location_city
              ? ` · ${listing.location_city}`
              : ''}
          </span>

          <strong>
            {listing.title || 'Помешкання для оренди'}
          </strong>

          {hasRating && (
            <span className="booking-rating">
              ★ {Number(listing.rating).toFixed(1)}
              {Number(listing.reviews_count) > 0 &&
                ` · ${listing.reviews_count} відгуків`}
            </span>
          )}
        </div>
      </div>

      {hostName && (
        <p className="booking-host-line">
          Господар: {hostName}
        </p>
      )}

      <div className="booking-summary-divider" />

      <h2>Детальніше про ціну</h2>

      <div className="booking-price-row">
        <span>
          {formatPrice(listing.price_per_night)} ×{' '}
          {getNightLabel(nights)}
        </span>

        <strong>{formatPrice(accommodationTotal)}</strong>
      </div>

      {cleaningFee > 0 && (
        <div className="booking-price-row">
          <span>Плата за прибирання</span>
          <strong>{formatPrice(cleaningFee)}</strong>
        </div>
      )}

      <div className="booking-summary-divider" />

      <div className="booking-total-row">
        <strong>Усього (UAH)</strong>
        <strong>{formatPrice(total)}</strong>
      </div>
    </aside>
  )
}

export default BookingSummaryCard