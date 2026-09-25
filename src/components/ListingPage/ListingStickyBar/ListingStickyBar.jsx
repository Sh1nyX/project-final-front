import './ListingStickyBar.css'

function ListingStickyBar({
  listing,
  isVisible,
  onDetailsClick,
}) {
  if (!isVisible) {
    return null
  }

  const price = Number(listing.price_per_night || 0)
  const rating = Number(listing.rating || 0)
  const reviewsCount = Number(listing.reviews_count || 0)

  const scrollToSection = (id) => {
  const element = document.getElementById(id)

  if (!element) return

  const top =
    element.getBoundingClientRect().top +
    window.scrollY -
    30

  window.scrollTo({
    top,
    behavior: 'smooth',
  })
}

  return (
    <div className="listing-sticky-bar">
      <div className="listing-sticky-bar-inner">
        <div className="listing-sticky-nav">
            <button onClick={() => scrollToSection('listing-gallery')}>
                Фотографії
            </button>

            <button onClick={() => scrollToSection('listing-amenities')}>
                Зручності
            </button>

            <button onClick={() => scrollToSection('listing-reviews')}>
                Відгуки
            </button>

            <button onClick={() => scrollToSection('listing-location')}>
                Розташування
            </button>

            <button
                className="listing-sticky-details"
                onClick={() => scrollToSection('listing-details')}
            >
                Деталі
            </button>
            </div>

        <div className="listing-sticky-booking">
          <div className="listing-sticky-price">
            <strong>${price.toFixed(0)}</strong>
            <span>ніч</span>
          </div>

          <div className="listing-sticky-rating">
            ★ {rating.toFixed(2)} · {reviewsCount} відгуків
          </div>

          <button className="listing-sticky-book-button">
            Забронювати
          </button>
        </div>
      </div>
    </div>
  )
}

export default ListingStickyBar