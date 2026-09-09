import { useEffect, useState } from 'react'
import './Header.css'

import CategoryNav from '../CategoryNav/CategoryNav'

import mapIcon from '../../assets/map-icon.svg'
import searchIcon from '../../assets/search-icon.svg'
import menuIcon from '../../assets/menu-icon.svg'
import profileIcon from '../../assets/profile-icon.svg'
import separatorIcon from '../../assets/separator.svg'


function SearchBar({ compact = false }) {
  return (
    <div className={compact ? 'compact-search-row' : 'search-row'}>

      <div className={compact ? 'compact-search-bar' : 'search-bar'}>

        <div className="search-field destination">
          <span className="field-title">
            {compact ? 'Будь-куди' : 'Куди'}
          </span>

          {!compact && (
            <span className="field-placeholder">
              Пошук напрямку
            </span>
          )}
        </div>

        <img
          className="search-separator"
          src={separatorIcon}
          alt=""
        />

        <div className="search-field">
          <span className="field-title">
            {compact ? 'Будь-який тиждень' : 'Прибуття'}
          </span>

          {!compact && (
            <span className="field-placeholder">
              Додайте дати
            </span>
          )}
        </div>

        {!compact && (
          <>
            <img
              className="search-separator"
              src={separatorIcon}
              alt=""
            />

            <div className="search-field">
              <span className="field-title">
                Виїзд
              </span>

              <span className="field-placeholder">
                Додайте дати
              </span>
            </div>
          </>
        )}

        <img
          className="search-separator"
          src={separatorIcon}
          alt=""
        />

        <div className="search-field guests">
          <span className="field-title">
            {compact ? 'Додайте гостей' : 'Хто'}
          </span>

          {!compact && (
            <span className="field-placeholder">
              Додайте гостей
            </span>
          )}
        </div>

        <button className="search-button">
          <img src={searchIcon} alt="" />
        </button>

      </div>

    </div>
  )
}


function AccountButton() {
  return (
    <button className="account-button">
      <img src={menuIcon} alt="" />
      <img src={profileIcon} alt="" />
    </button>
  )
}


function Header() {

  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
  const handleScroll = () => {
    console.log('SCROLL:', window.scrollY)
    setIsScrolled(window.scrollY > 100)
  }

  window.addEventListener('scroll', handleScroll)

  return () => {
    window.removeEventListener('scroll', handleScroll)
  }
}, [])


  return (
    <>
      {/* =========================
          ОБЫЧНЫЙ HEADER
      ========================= */}

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

        <AccountButton />

        <SearchBar />

        <button className="map-button">
          <span>Показати мапу</span>
          <img src={mapIcon} alt="" />
        </button>

        <CategoryNav />

      </header>


      {/* =========================
          КОМПАКТНЫЙ HEADER
      ========================= */}

      {isScrolled && (
        <header className="compact-header">

          <div className="compact-top">

            <div className="compact-logo">
              HomeFU
            </div>

            <SearchBar compact />

            <AccountButton />

          </div>

          <CategoryNav />

        </header>
      )}

    </>
  )
}

export default Header