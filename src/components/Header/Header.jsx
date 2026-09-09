import './Header.css'
import CategoryNav from '../CategoryNav/CategoryNav'

import mapIcon from '../../assets/map-icon.svg'
import searchIcon from '../../assets/search-icon.svg'
import menuIcon from '../../assets/menu-icon.svg'
import profileIcon from '../../assets/profile-icon.svg'
import separatorIcon from '../../assets/separator.svg'

function Header() {
  return (
    <header className="header">

      <div className="logo">
        HomeFU
      </div>

      <nav className="header-nav">
        <a href="#">Варіанти помешкань</a>
        <a href="#">Враження</a>
        <a href="#">Онлайн-враження</a>
      </nav>

      <a href="#" className="host-link">
        Запропонувати помешкання на HomeFU
      </a>

      <button className="account-button">
        <img src={menuIcon} alt="" />
        <img src={profileIcon} alt="" />
      </button>

      <div className="search-row">

        <div className="search-bar">

            <div className="search-field destination">
                <div className="field-title">
                Куди
                </div>

                <div className="field-placeholder">
                Пошук напрямку
                </div>
            </div>

            <img className="search-separator" src={separatorIcon} alt="" />

            <div className="search-field">
                <div className="field-title">
                Прибуття
                </div>

                <div className="field-placeholder">
                Додайте дати
                </div>
            </div>

            <img className="search-separator" src={separatorIcon} alt="" />

            <div className="search-field">
                <div className="field-title">
                Виїзд
                </div>

                <div className="field-placeholder">
                Додайте дати
                </div>
            </div>

            <img className="search-separator" src={separatorIcon} alt="" />

            <div className="search-field guests">
                <div className="field-title">
                Хто
                </div>

                <div className="field-placeholder">
                Додайте гостей
                </div>
            </div>

            <button className="search-button">
                <img src={searchIcon} alt="" />
            </button>

            </div>

        <button className="map-button">
          <span>Показати мапу</span>
          <img src={mapIcon} alt="" />
        </button>

      </div>

      <CategoryNav />

    </header>
  )
}

export default Header