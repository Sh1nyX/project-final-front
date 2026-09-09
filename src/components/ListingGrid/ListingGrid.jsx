import './ListingGrid.css'
import ListingCard from '../ListingCard/ListingCard'

function ListingGrid({ listings }) {
  return (
    <section className="listing-grid">
      {listings.map((listing) => (
        <ListingCard
          key={listing.id}
          listing={listing}
        />
      ))}
    </section>
  )
}

export default ListingGrid