
import './BookingsEmptyState.css'

function BookingsEmptyState({ onExplore }) {
  return (
    <section className="my-bookings-empty">
      <div className="my-bookings-empty-icon" aria-hidden="true">
        ♧
      </div>

      <h2>Поки що немає активних бронювань</h2>

      <p>
        Тут з’являться твої підтверджені подорожі.
        Знайди помешкання та заплануй наступну поїздку.
      </p>

      <button
        type="button"
        className="my-bookings-explore-button"
        onClick={onExplore}
      >
        Знайти помешкання
      </button>
    </section>
  )
}

export default BookingsEmptyState
