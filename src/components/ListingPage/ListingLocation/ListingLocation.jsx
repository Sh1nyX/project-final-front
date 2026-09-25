import { useState } from 'react'

import './ListingLocation.css'

import ListingMap from './ListingMap/ListingMap'

function ListingLocation({ listing }) {
  const [isExpanded, setIsExpanded] = useState(false)

  const city = listing.location_city
  const country = listing.location_country

  const address = listing.address || ''

  const gettingAround =
    listing.getting_around || ''

  const locationText = [
    address,
    gettingAround,
  ]
    .filter(Boolean)
    .join(' ')

  const previewText =
    locationText.length > 260
      ? `${locationText.slice(0, 260)}...`
      : locationText

  const shouldExpand =
    locationText.length > 260

  return (
    <section className="listing-location">

      <h2>
        Де ви будете
      </h2>

      <div className="listing-location-map">
        <ListingMap
          listing={listing}
        />
      </div>

      <div className="listing-location-info">

        <strong>
          {city}, {country}
        </strong>

        {address && (
          <p className="listing-location-address">
            {address}
          </p>
        )}

        {locationText && (
          <p className="listing-location-description">
            {isExpanded
              ? locationText
              : previewText}
          </p>
        )}

        {shouldExpand && (
          <button
            type="button"
            className="listing-location-more"
            onClick={() =>
              setIsExpanded(
                (current) => !current
              )
            }
          >
            {isExpanded
              ? 'Показати менше'
              : 'Показати більше'}
          </button>
        )}

      </div>

    </section>
  )
}

export default ListingLocation