import { useState } from 'react'

import './Amenities.css'

function Amenities({ listing }) {
  const [isExpanded, setIsExpanded] =
    useState(false)

  const amenities = Array.isArray(listing.amenities)
    ? listing.amenities
    : []

  const visibleAmenities = isExpanded
    ? amenities
    : amenities.slice(0, 4)

  return (
    <section className="listing-amenities">

      <h2>
        Які тут зручності
      </h2>

      <div className="amenities-grid">

        {visibleAmenities.map(
          (amenity, index) => (
            <div
              key={`${amenity}-${index}`}
              className="amenity-item"
            >
              <span className="amenity-dot" />

              <span>
                {amenity}
              </span>
            </div>
          )
        )}

      </div>

      {amenities.length > 4 && (
        <button
          type="button"
          className="amenities-more"
          onClick={() =>
            setIsExpanded(
              (current) => !current
            )
          }
        >
          {isExpanded
            ? 'Показати менше'
            : `Показати всі зручності(${amenities.length})`}
        </button>
      )}

    </section>
  )
}

export default Amenities