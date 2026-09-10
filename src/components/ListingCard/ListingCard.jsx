import './ListingCard.css'

function ListingCard({ listing }) {
  console.log('LISTING:', listing)
  const image = listing.images?.[0]

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

        <button className="favorite-button">
          ♡
        </button>

      </div>


      <div className="listing-info">

        <div className="listing-location-row">
  <h3>
    {listing.location_city}, {listing.location_country}
  </h3>

        <span className="listing-rating">
          ★ {Number(listing.rating || 0).toFixed(2)}
        </span>
      </div>

      <div className="listing-details">
        {listing.category_name && (
          <span>{listing.category_name}</span>
        )}

        {listing.date_range && (
          <span>{listing.date_range}</span>
        )}
      </div>

      <div className="listing-price">
        ${listing.price_per_night} ніч
      </div>

      </div>

    </article>
  )
}

export default ListingCard