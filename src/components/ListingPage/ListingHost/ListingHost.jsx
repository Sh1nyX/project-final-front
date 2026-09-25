import './ListingHost.css'

function ListingHost({ listing }) {
  const hostName = [listing.host_first_name, listing.host_last_name]
    .filter(Boolean)
    .join(' ')

  const reviewsCount = Number(listing.reviews_count || 0)

  const joinedDate = listing.host_joined
    ? new Date(listing.host_joined).getFullYear()
    : null

  return (
    <section className="listing-host">
      <div className="listing-host-main">
        <div className="listing-host-avatar-wrapper">
          {listing.host_avatar ? (
            <img
              src={listing.host_avatar}
              alt={hostName}
              className="listing-host-avatar"
            />
          ) : (
            <div className="listing-host-avatar-placeholder">
              {hostName?.charAt(0) || '?'}
            </div>
          )}
        </div>

        <div className="listing-host-info">
          <h2>Господар: {hostName || 'Невідомо'}</h2>

          {joinedDate && (
            <p>На HomeFU з {joinedDate} року</p>
          )}

          <div className="listing-host-meta">
            <span>{reviewsCount} відгуків</span>

            {listing.host_verified && (
              <span>✓ Особа підтверджена</span>
            )}
          </div>
        </div>
      </div>

      {listing.host_bio && (
        <div className="listing-host-bio">
          <h3>Про господаря</h3>
          <p>{listing.host_bio}</p>
        </div>
      )}

      <div className="listing-host-contact">
        <h3>Під час подорожі</h3>
        <p>
          Господар доступний для зв'язку під час вашого перебування.
        </p>

        <button className="listing-host-contact-button">
          Зв'язатись з господарем
        </button>
      </div>
    </section>
  )
}

export default ListingHost