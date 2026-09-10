import { useEffect, useState } from 'react'
import './Header.css'

import CategoryNav from '../CategoryNav/CategoryNav'
import DatePicker from '../DatePicker/DatePicker'

import mapIcon from '../../assets/map-icon.svg'
import searchIcon from '../../assets/search-icon.svg'
import menuIcon from '../../assets/menu-icon.svg'
import profileIcon from '../../assets/profile-icon.svg'
import separatorIcon from '../../assets/separator.svg'


function SearchBar({
  compact = false,
  checkIn,
  checkOut,
  onCheckInChange,
  onCheckOutChange,
  onSearch,
  onDateClick,
  activeDateField,
}) {
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

        <div
          className={`search-field date-field ${
            activeDateField === 'checkin' ? 'date-field-selected' : ''
          }`}
        >
          <span className="field-title">
            Прибуття
          </span>

          <button
            type="button"
            className="date-input-button"
            onClick={() => onDateClick('checkin')}
          >
            {checkIn || 'Додайте дати'}
          </button>
        </div>

        {!compact && (
          <>
            <img
              className="search-separator"
              src={separatorIcon}
              alt=""
            />

            <div
              className={`search-field date-field ${
                activeDateField === 'checkout' ? 'date-field-selected' : ''
              }`}
            >
              <span className="field-title">
                Виїзд
              </span>

              <button
                type="button"
                className="date-input-button"
                onClick={() => onDateClick('checkout')}
              >
                {checkOut || 'Додайте дати'}
              </button>
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

        <button
          className="search-button"
          onClick={onSearch}
        >
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


function Header({
  onDatesChange,
  selectedCategory,
  onCategoryChange,
}) {

  const [isScrolled, setIsScrolled] = useState(false)
  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false)
  
  const [checkIn, setCheckIn] = useState('')
  const [checkOut, setCheckOut] = useState('')
  const [flexibleDays, setFlexibleDays] = useState(0)
  const [activeDateField, setActiveDateField] = useState(null)

  const openDatePicker = (field) => {
  setActiveDateField(field)
  setIsDatePickerOpen(true)
}

  const closeDatePicker = () => {
  setIsDatePickerOpen(false)
  setActiveDateField(null)
}

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

const handleSearch = () => {
  onDatesChange({
    check_in: checkIn,
    check_out: checkOut,
    flexible_days: flexibleDays,
  })
}

const handleLogoClick = (e) => {
  e.preventDefault()

  setCheckIn('')
  setCheckOut('')
  setFlexibleDays(0)

  onDatesChange({
    check_in: '',
    check_out: '',
    flexible_days: 0,
  })

  window.scrollTo({
    top: 0,
    behavior: 'smooth',
  })

}

  return (
    <>
      <header className={`header ${isScrolled ? 'header-scrolled' : ''}`}>

        <a href="/" className="logo" onClick={handleLogoClick}>
          HomeFU
        </a>

        <nav className="header-nav">
          <a href="#">Варіанти помешкань</a>
          <a href="#">Враження</a>
          <a href="#">Онлайн-враження</a>
        </nav>

        <a href="#" className="host-link">
          Запропонувати помешкання на HomeFU
        </a>

        <AccountButton />

        <SearchBar
          checkIn={checkIn}
          checkOut={checkOut}
          onCheckInChange={setCheckIn}
          onCheckOutChange={setCheckOut}
          onSearch={handleSearch}
          onDateClick={openDatePicker}
          activeDateField={activeDateField}
        />

        <button className="map-button">
          <span>Показати мапу</span>
          <img src={mapIcon} alt="" />
        </button>

        <CategoryNav
          selectedCategory={selectedCategory}
          onCategoryChange={onCategoryChange}
        />

      </header>

      {isScrolled && (
        <header className="compact-header">

          <div className="compact-top">

            <div className="compact-logo">
              HomeFU
            </div>

            <SearchBar
              compact
              checkIn={checkIn}
              checkOut={checkOut}
              onCheckInChange={setCheckIn}
              onCheckOutChange={setCheckOut}
              onSearch={handleSearch}
              onDateClick={openDatePicker}
              activeDateField={activeDateField}
            />

            <AccountButton />

          </div>

          <CategoryNav
            selectedCategory={selectedCategory}
            onCategoryChange={onCategoryChange}
          />

        </header>
      )}

      {isDatePickerOpen && (
        <DatePicker
          checkIn={checkIn}
          checkOut={checkOut}
          flexibleDays={flexibleDays}
          onFlexibleDaysChange={setFlexibleDays}
          onCheckInChange={setCheckIn}
          onCheckOutChange={setCheckOut}
          onClose={closeDatePicker}
        />
      )}

    </>
  )
}

export default Header