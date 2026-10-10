import './BookingHeader.css'

function BookingHeader({ onHome }) {
  return (
    <header className="booking-header">
      <button
        type="button"
        className="booking-logo"
        onClick={onHome}
      >
        HomeFU
      </button>
    </header>
  )
}

export default BookingHeader