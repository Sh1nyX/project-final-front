import './ListingGrid.css'
import ListingCard from '../ListingCard/ListingCard'

function ListingGrid({ listings }) {

  const visibleListings = listings.slice(0, 18)

  return (
    <section className="listing-grid">
      {visibleListings.map(listing => (
        <ListingCard
          key={listing.id}
          listing={listing}
        />
      ))}
    </section>
  )
}

export default ListingGrid