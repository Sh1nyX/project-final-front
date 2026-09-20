import './ResultsHeader.css'

import { useNavigate } from 'react-router-dom'

import menuIcon from '../../../assets/menu-icon.svg'
import profileIcon from '../../../assets/profile-icon.svg'

function ResultsHeader() {

  const navigate = useNavigate()

  const handleLogoClick = (e) => {
    e.preventDefault()
    navigate('/')
  }

  return (
    <header className="results-header">

      <div className="results-header-nav">

        <a
          href="/"
          className="results-logo"
          onClick={handleLogoClick}
        >
          HomeFU
        </a>

        <nav className="results-nav-links">

          <a
            href="/"
            className="active"
          >
            Пошук
          </a>

          <a href="#">
            Подорожі
          </a>

          <a href="#">
            Повідомлення
          </a>

        </nav>

        <div className="results-profile">

          <a href="#">
            Запропонувати помешкання...
          </a>

          <button
            className="results-profile-button"
            type="button"
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

      </div>

    </header>
  )
}

export default ResultsHeader