import { formatDateRange, getGuestLabel } from '../bookingUtils'
import './BookingTripDetails.css'

function BookingTripDetails({
  checkIn,
  checkOut,
  guests,
  onEdit,
}) {
  return (
    <section className="booking-trip-section">
      <h2>Ваша подорож</h2>

      <div className="booking-detail-row">
        <div>
          <strong>Дати</strong>
          <span>{formatDateRange(checkIn, checkOut)}</span>
        </div>

        <button
          type="button"
          className="booking-edit-button"
          onClick={onEdit}
        >
          Редагувати
        </button>
      </div>

      <div className="booking-detail-row">
        <div>
          <strong>Гості</strong>
          <span>{getGuestLabel(guests)}</span>
        </div>

        <button
          type="button"
          className="booking-edit-button"
          onClick={onEdit}
        >
          Редагувати
        </button>
      </div>
    </section>
  )
}

export default BookingTripDetails