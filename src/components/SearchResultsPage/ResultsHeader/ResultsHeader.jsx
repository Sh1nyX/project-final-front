import './ResultsHeader.css'

import menuIcon from '../../../assets/menu-icon.svg'
import profileIcon from '../../../assets/profile-icon.svg'

function ResultsHeader() {
  return (
    <header className="results-header">
      <div className="results-header-nav">

        <div className="results-logo">
          HomeFU
        </div>

        <nav className="results-nav-links">
          <a href="/" className="active">
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

          <button className="results-profile-button">
            <img src={menuIcon} alt="" />
            <img src={profileIcon} alt="" />
          </button>
        </div>

      </div>
    </header>
  )
}

export default ResultsHeader