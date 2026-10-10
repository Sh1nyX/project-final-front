import './BookingInfoBanner.css'

function BookingInfoBanner() {
  return (
    <section className="booking-info-banner">
      <div>
        <h2>Перевірте деталі бронювання</h2>
        <p>
          Переконайтеся, що дати та кількість гостей
          вибрані правильно.
        </p>
      </div>

      <span className="booking-info-icon" aria-hidden="true">
        ♧
      </span>
    </section>
  )
}

export default BookingInfoBanner