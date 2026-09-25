import './ListingFooter.css'

function ListingFooter() {
  return (
    <footer className="listing-footer">
      <div className="listing-footer-inner">
        <div className="listing-footer-breadcrumbs">
          <span className="listing-footer-logo">
            HomeFU
          </span>

          <span className="listing-footer-arrow">
            ›
          </span>

          <span>Україна</span>

          <span className="listing-footer-arrow">
            ›
          </span>

          <span>Odesa Oblast</span>

          <span className="listing-footer-arrow">
            ›
          </span>

          <span>Odesa</span>
        </div>

        <a
          href="#"
          className="listing-footer-support"
          onClick={(event) => event.preventDefault()}
        >
          Підтримка
        </a>
      </div>
    </footer>
  )
}

export default ListingFooter