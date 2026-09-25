import { useNavigate } from 'react-router-dom'

import './ListingHeader.css'

import searchIcon from '../../../assets/search-icon.svg'
import menuIcon from '../../../assets/menu-icon.svg'
import profileIcon from '../../../assets/profile-icon.svg'

function ListingHeader({ listing }) {
  const navigate = useNavigate()

  const hostName = [
    listing.host_first_name,
    listing.host_last_name,
  ]
    .filter(Boolean)
    .join(' ')

  return (
    <header className="listing-header">

      <div className="listing-header-top">

        <button
          type="button"
          className="listing-logo"
          onClick={() => navigate('/')}
        >
          HomeFU
        </button>

        <button
          type="button"
          className="listing-search"
          onClick={() => navigate('/search')}
        >
          <span>Почніть пошук</span>

          <span className="listing-search-button">
            <img
              src={searchIcon}
              alt=""
            />
          </span>
        </button>

        <a
          href="#"
          className="listing-host-link"
          onClick={(event) => {
            event.preventDefault()
          }}
        >
          Запропонувати помешкання на HomeFU
        </a>

        <button
          type="button"
          className="listing-account-button"
        >
          <img
            src={menuIcon}
            alt=""
          />

          <img
            src={profileIcon}
            alt=""
          />
        </button>

      </div>

      <div className="listing-heading-row">

        <div className="listing-heading">

          <h1>
            {listing.title}
          </h1>

          <div className="listing-meta">

            <span>
              ★ {Number(listing.rating || 0).toFixed(2)}
            </span>

            <span>
              {listing.reviews_count || 0} відгуків
            </span>

            <span>
              {listing.location_city},{' '}
              {listing.location_country}
            </span>

          </div>

        </div>

        <div className="listing-actions">

          <button type="button">
            Поділитися
          </button>

          <button type="button">
            Зберегти
          </button>

        </div>

      </div>

    </header>
  )
}

export default ListingHeader