import './ListingCard.css'

import {
  useNavigate,
  useSearchParams,
} from 'react-router-dom'

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

  const navigate = useNavigate()
  const [searchParams] = useSearchParams()

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

  const openListing = () => {
    const checkIn =
      searchParams.get('check_in')

    const checkOut =
      searchParams.get('check_out')

    if (checkIn && checkOut) {
      navigate(
        `/listing/${listing.id}?check_in=${encodeURIComponent(
          checkIn
        )}&check_out=${encodeURIComponent(
          checkOut
        )}`
      )

      return
    }

    navigate(`/listing/${listing.id}`)
  }

  return (
    <article
      className="listing-card"
      onClick={(event) => {
        const selectedText =
          window.getSelection()?.toString()

        if (selectedText) {
          return
        }

        openListing()
      }}
    >

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
          onClick={(event) => {
            event.stopPropagation()
          }}
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