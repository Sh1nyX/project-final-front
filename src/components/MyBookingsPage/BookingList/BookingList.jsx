
import BookingCard from '../BookingCard/BookingCard'

import './BookingList.css'

function BookingList({ bookings, onOpenListing }) {
  return (
    <div className="my-bookings-list">
      {bookings.map((booking) => (
        <BookingCard
          key={booking.id}
          booking={booking}
          onOpenListing={onOpenListing}
        />
      ))}
    </div>
  )
}

export default BookingList
