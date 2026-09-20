import './ListingCard.css'

function getAvailableNights(from, to) {
  if (!from || !to) {
    return 0
  }

  const fromDate = new Date(from)
  const toDate = new Date(to)

  const difference = toDate - fromDate

  return Math.max(
    0,
    Math.round(
      difference / (1000 * 60 * 60 * 24)
    )
  )
}

function ListingCard({
  listing,
  isTotalPrice,
}) {
  const image = listing.images?.[0]

  const pricePerNight =
    Number(listing.price_per_night) || 0

  const availableNights = getAvailableNights(
    listing.available_from,
    listing.available_to
  )

  const totalPrice =
    isTotalPrice && availableNights > 0
      ? pricePerNight * availableNights
      : pricePerNight

  return (
    <article className="listing-card">

      <div className="listing-image-wrapper">

        {image && (
          <img
            className="listing-image"
            src={image}
            alt={listing.title}
          />
        )}

        <button
          type="button"
          className="favorite-button"
        >
          ♡
        </button>

      </div>

      <div className="listing-info">

        <div className="listing-location-row">

          <h3>
            {listing.location_city},{' '}
            {listing.location_country}
          </h3>

          <span className="listing-rating">
            ★ {Number(listing.rating || 0).toFixed(2)}
          </span>

        </div>

        <div className="listing-details">

          {listing.category_name && (
            <span>
              {listing.category_name}
            </span>
          )}

          {listing.date_range && (
            <span>
              {listing.date_range}
            </span>
          )}

        </div>

        <div className="listing-price">
          ₴ {totalPrice.toLocaleString('uk-UA')}{' '}

          {isTotalPrice && availableNights > 0
            ? `за ${availableNights} ${
                availableNights === 1
                  ? 'ніч'
                  : 'ночі'
              }`
            : 'за ніч'}
        </div>

      </div>

    </article>
  )
}

export default ListingCard