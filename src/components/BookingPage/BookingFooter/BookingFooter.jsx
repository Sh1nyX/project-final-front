import './BookingFooter.css'

function BookingFooter() {
  return (
    <footer className="booking-footer">
      <span>© 2026 HomeFU, Inc.</span>

      <a href="#privacy">Конфіденційність</a>
      <a href="#terms">Умови</a>
      <a href="#sitemap">Мапа сайту</a>

      <span className="booking-footer-spacer" />

      <span>Українська (UA)</span>
      <span>₴ UAH</span>
    </footer>
  )
}

export default BookingFooter