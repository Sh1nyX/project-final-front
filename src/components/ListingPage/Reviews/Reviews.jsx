import { useState } from 'react'

import './Reviews.css'

function formatReviewDate(value) {
  if (!value) {
    return ''
  }

  const date = new Date(value)

  return date.toLocaleDateString('uk-UA', {
    year: 'numeric',
    month: 'long',
  })
}

function Reviews({ listing }) {
  const reviews = Array.isArray(listing.reviews)
    ? listing.reviews
    : []

  const [showAll, setShowAll] = useState(false)

  const visibleReviews = showAll
    ? reviews
    : reviews.slice(0, 6)

  const reviewsCount =
    Number(listing.reviews_count) ||
    reviews.length ||
    0

  const rating =
    Number(listing.rating) || 0

  return (
    <section className="listing-reviews">

      <div className="reviews-header">

        <h2>
          Відгуки
        </h2>

        <div className="reviews-overview">

          <div className="reviews-score">

            <span className="reviews-star">
              ★
            </span>

            <strong>
              {rating.toFixed(1)}
            </strong>

          </div>

          <span className="reviews-count">
            {reviewsCount} відгуків
          </span>

        </div>

      </div>


      {reviews.length === 0 ? (

        <div className="reviews-empty">
          Поки що відгуків немає.
        </div>

      ) : (

        <>

          <div className="reviews-grid">

            {visibleReviews.map((review) => {

              const reviewerName = [
                review.first_name,
                review.last_name,
              ]
                .filter(Boolean)
                .join(' ')

              return (
                <article
                  key={review.id}
                  className="review-card"
                >

                  <div className="review-author">

                    {review.avatar_url ? (
                      <img
                        src={review.avatar_url}
                        alt=""
                        className="review-avatar"
                      />
                    ) : (
                      <div className="review-avatar-placeholder">
                        {review.first_name?.[0] || '?'}
                      </div>
                    )}

                    <div className="review-author-info">

                      <strong>
                        {reviewerName || 'Користувач'}
                      </strong>

                      <span>
                        {formatReviewDate(
                          review.created_at
                        )}
                      </span>

                    </div>

                  </div>

                  <div className="review-rating">

                    <span>
                      ★
                    </span>

                    <strong>
                      {Number(
                        review.rating || 0
                      ).toFixed(1)}
                    </strong>

                  </div>

                  <p className="review-comment">
                    {review.comment}
                  </p>

                </article>
              )
            })}

          </div>

          {reviews.length > 6 && (
            <button
              type="button"
              className="reviews-more"
              onClick={() =>
                setShowAll(
                  (current) => !current
                )
              }
            >
              {showAll
                ? 'Показати менше'
                : `Показати всі ${reviewsCount} відгуків`}
            </button>
          )}

        </>

      )}

    </section>
  )
}

export default Reviews