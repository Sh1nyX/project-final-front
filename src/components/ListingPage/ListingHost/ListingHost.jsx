import './ListingHost.css'

function ListingHost({ listing }) {
  const hostName = [
    listing.host_first_name,
    listing.host_last_name,
  ]
    .filter(Boolean)
    .join(' ')

  const reviewsCount = Number(
    listing.reviews_count || 0
  )

  const joinedDate = listing.host_joined
    ? new Date(listing.host_joined).getFullYear()
    : null

  const hostLanguages = listing.host_languages?.trim()
  const hostProfession = listing.host_profession?.trim()
  const hostResidence = listing.host_residence?.trim()
  const hostEducation = listing.host_education?.trim()
  const hostHobby = listing.host_biggest_hobby?.trim()
  const hostPets = listing.host_pets?.trim()

  const favoriteInterests = Array.isArray(
    listing.host_favorite_interests
  )
    ? listing.host_favorite_interests.filter(Boolean).slice(0, 3)
    : []

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

          <h2>
            Господар: {hostName || 'Невідомо'}
          </h2>

          {joinedDate && (
            <p>
              На HomeFU з {joinedDate} року
            </p>
          )}

          <div className="listing-host-meta">

            <span>
              {reviewsCount} відгуків
            </span>

            {listing.host_verified && (
              <span>
                ✓ Особа підтверджена
              </span>
            )}

          </div>

        </div>

      </div>

      {listing.host_bio && (
        <div className="listing-host-bio">

          <h3>Про господаря</h3>

          <p>
            {listing.host_bio}
          </p>

        </div>
      )}

      {favoriteInterests.length > 0 && (
        <div className="listing-host-interests">
          <h3>Улюблене</h3>

          <div className="listing-host-interest-list">
            {favoriteInterests.map((interest, index) => (
              <span
                key={`${interest}-${index}`}
                className="listing-host-interest"
              >
                {interest}
              </span>
            ))}
          </div>
        </div>
      )}

      {(hostLanguages ||
        hostProfession ||
        hostResidence ||
        hostEducation ||
        hostHobby ||
        hostPets) && (

        <div className="listing-host-profile">

          {hostProfession && (
            <p>
              <strong>Професія:</strong>{' '}
              {hostProfession}
            </p>
          )}

          {hostLanguages && (
            <p>
              <strong>Мови:</strong>{' '}
              {hostLanguages}
            </p>
          )}

          {hostResidence && (
            <p>
              <strong>Місце проживання:</strong>{' '}
              {hostResidence}
            </p>
          )}

          {hostEducation && (
            <p>
              <strong>Навчальний заклад:</strong>{' '}
              {hostEducation}
            </p>
          )}

          {hostHobby && (
            <p>
              <strong>Найбільше захоплення:</strong>{' '}
              {hostHobby}
            </p>
          )}

          {hostPets && (
            <p>
              <strong>Домашні тварини:</strong>{' '}
              {hostPets}
            </p>
          )}

        </div>
      )}

      <div className="listing-host-contact">

        <h3>Під час подорожі</h3>

        <p>
          Господар доступний для зв'язку під час
          вашого перебування.
        </p>

        {hostLanguages && (
          <p>
            Мови спілкування: {hostLanguages}
          </p>
        )}

        <button
          type="button"
          className="listing-host-contact-button"
        >
          Зв'язатись з господарем
        </button>

      </div>

    </section>
  )
}

export default ListingHost