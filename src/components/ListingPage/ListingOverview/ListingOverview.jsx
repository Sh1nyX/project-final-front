import { useState } from 'react'
import './ListingOverview.css'


function ListingOverview({ listing }) {
  const [isDescriptionExpanded, setIsDescriptionExpanded] =
    useState(false)

  const hostName = [
    listing.host_first_name,
    listing.host_last_name,
  ]
    .filter(Boolean)
    .join(' ')

  const description = listing.description || ''

  const amenities = Array.isArray(listing.amenities)
    ? listing.amenities
    : []

  const shouldCollapseDescription =
    description.length > 300

  const visibleDescription =
    isDescriptionExpanded || !shouldCollapseDescription
      ? description
      : `${description.slice(0, 300)}...`

  return (
    <section className="listing-overview">

      <div className="listing-overview-top">

        <div>

          <h2>
            Помешкання для оренди
            {hostName && `, господар - ${hostName}`}
          </h2>

          <p className="listing-capacity">
            {listing.max_guests || 0} гостя ·{' '}
            {listing.bedrooms || 0} спальня ·{' '}
            {listing.beds || 0} ліжка ·{' '}
            {listing.bathrooms || 0} ванна кімната
          </p>

        </div>

      </div>

      <div className="listing-highlights">

        {amenities.length > 0 && (
          <div className="listing-highlight">

            <strong>
              Зручності
            </strong>

            <p>
              {amenities.slice(0, 4).join(', ')}
            </p>

          </div>
        )}

        <div className="listing-highlight">

          <strong>
            Тип помешкання
          </strong>

          <p>
            {listing.property_type || 'Помешкання'}
          </p>

        </div>

        <div className="listing-highlight">

          <strong>
            Розташування
          </strong>

          <p>
            {listing.location_city},{' '}
            {listing.location_country}
          </p>

        </div>

      </div>

      <div className="listing-description">

        <p className="listing-description-text">
          {visibleDescription}
        </p>

        {shouldCollapseDescription && (
          <button
            type="button"
            className="listing-description-more"
            onClick={() =>
              setIsDescriptionExpanded(
                (current) => !current
              )
            }
          >
            {isDescriptionExpanded
              ? 'Показати менше'
              : 'Показати більше'}
          </button>
        )}

      </div>

    </section>
  )
}

export default ListingOverview