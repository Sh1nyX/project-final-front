import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'

import './ResultsGrid.css'

import { getListings } from '../../../services/api'
import ResultsPagination from '../ResultsPagination/ResultsPagination'

const PAGE_SIZE = 6

function ResultsGrid() {
  const [searchParams, setSearchParams] = useSearchParams()

  const [listings, setListings] = useState([])
  const [total, setTotal] = useState(0)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  const currentPage =
    Number(searchParams.get('page')) || 1

  const totalPages =
    Math.ceil(total / PAGE_SIZE)

  useEffect(() => {
    const loadListings = async () => {
      try {
        setLoading(true)
        setError('')

        const data = await getListings({
          check_in: searchParams.get('check_in') || '',
          check_out: searchParams.get('check_out') || '',
          flexible_days:
            Number(searchParams.get('flexible_days')) || 0,

          region:
            searchParams.get('region') || '',

          category_id:
            searchParams.get('category_id') || '',

          guests:
            Number(searchParams.get('guests')) || 0,

          min_price:
            searchParams.get('min_price') || '',

          max_price:
            searchParams.get('max_price') || '',

          property_type:
            searchParams.get('property_type') || '',

          min_bedrooms:
            searchParams.get('min_bedrooms') || '',

          min_beds:
            searchParams.get('min_beds') || '',

          amenities:
            searchParams.get('amenities') || '',

          limit: PAGE_SIZE,
          page: currentPage,
        })

        const items = Array.isArray(data)
        ? data
        : data?.listings || []

      const totalItems = Array.isArray(data)
        ? data.length
        : Number(data?.total) || 0

      setListings(items)
      setTotal(totalItems)
      } catch (err) {
        console.error(
          'Не удалось загрузить объявления:',
          err
        )

        setError(
          'Не вдалося завантажити помешкання'
        )
      } finally {
        setLoading(false)
      }
    }

    loadListings()
  }, [searchParams])

  if (loading) {
    return (
      <div className="results-grid-status">
        Завантаження помешкань...
      </div>
    )
  }

  if (error) {
    return (
      <div className="results-grid-status">
        {error}
      </div>
    )
  }

  if (listings.length === 0) {
    return (
      <div className="results-grid-status">
        За вашим запитом нічого не знайдено
      </div>
    )
  }

  return (
  <div className="results-grid-wrapper">

    <div className="results-grid">
      {listings.map((listing) => {
        const image = listing.images?.[0]

        const bedrooms = Number(listing.bedrooms) || 0
        const beds = Number(listing.beds) || 0

        const bedroomText =
          bedrooms === 1
            ? 'кімната'
            : bedrooms < 5
              ? 'кімнати'
              : 'кімнат'

        const bedText =
          beds === 1
            ? 'ліжко'
            : beds < 5
              ? 'ліжка'
              : 'ліжок'

        return (
          <article
            className="result-card"
            key={listing.id}
          >
            <div className="result-card-image-wrapper">

              {image ? (
                <img
                  className="result-card-image"
                  src={image}
                  alt={listing.title}
                />
              ) : (
                <div className="result-card-no-image">
                  Немає фото
                </div>
              )}

              <button
                type="button"
                className="result-card-favorite"
                aria-label="Додати до обраного"
              >
                ♡
              </button>

            </div>

            <div className="result-card-content">

              <div className="result-card-location-row">
                <span className="result-card-location">
                  {listing.location_city},{' '}
                  {listing.location_country}
                </span>

                <span className="result-card-rating">
                  ★ {Number(listing.rating || 0).toFixed(2)}
                </span>
              </div>

              <h3 className="result-card-title">
                {listing.title}
              </h3>

              <p className="result-card-details">
                {bedrooms} {bedroomText}
                {' · '}
                {beds} {bedText}
              </p>

              <p className="result-card-price">
                <strong>
                  ₴{' '}
                  {Number(
                    listing.price_per_night
                  ).toLocaleString('uk-UA')}
                </strong>
                {' за ніч'}
              </p>

            </div>
          </article>
        )
      })}
    </div>

    <ResultsPagination
      currentPage={currentPage}
      totalPages={totalPages}
      onPageChange={(page) => {
        const params = new URLSearchParams(searchParams)

        if (page === 1) {
          params.delete('page')
        } else {
          params.set('page', page)
        }

        setSearchParams(params)
      }}
    />

  </div>
)
}

export default ResultsGrid