import { useEffect, useState } from 'react'
import './Header.css'

import CategoryNav from '../CategoryNav/CategoryNav'
import DatePicker from '../DatePicker/DatePicker'
import RegionPicker from '../RegionPicker/RegionPicker'
import GuestPicker from '../GuestPicker/GuestPicker'

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
  onDestinationClick,
  isRegionPickerOpen,
  selectedRegion,
  onGuestsClick,
  guestCount,
  isGuestPickerOpen,
}) {
  return (
    <div className={compact ? 'compact-search-row' : 'search-row'}>

      <div className={compact ? 'compact-search-bar' : 'search-bar'}>

        <div
          className={`search-field destination ${
            isRegionPickerOpen ? 'destination-selected' : ''
          }`}
          onClick={onDestinationClick}
        >
          <span className="field-title">
            {compact ? 'Будь-куди' : 'Куди'}
          </span>

          {!compact && (
            <span className="field-placeholder">
              {selectedRegion?.name || 'Пошук напрямку'}
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

        <div
          className={`search-field guests ${
            isGuestPickerOpen ? 'guests-selected' : ''
          }`}
          onClick={onGuestsClick}
        >
          <span className="field-title">
            {compact ? 'Додайте гостей' : 'Хто'}
          </span>

          <span className="field-placeholder">
            {guestCount > 0
              ? `${guestCount} ${guestCount === 1 ? 'гість' : 'гостей'}`
              : 'Додайте гостей'}
          </span>
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

  const [isRegionPickerOpen, setIsRegionPickerOpen] = useState(false)
  const [selectedRegion, setSelectedRegion] = useState(null)

  const [isGuestPickerOpen, setIsGuestPickerOpen] = useState(false)
  const [adults, setAdults] = useState(0)
  const [children, setChildren] = useState(0)
  const [infants, setInfants] = useState(0)
  const [pets, setPets] = useState(0)
  
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

const totalGuests = adults + children

const handleSearch = () => {
  onDatesChange({
    check_in: checkIn,
    check_out: checkOut,
    flexible_days: flexibleDays,
    guests: totalGuests,
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

const openRegionPicker = () => {
  setIsRegionPickerOpen(true)
}

const closeRegionPicker = () => {
  setIsRegionPickerOpen(false)
}

const openGuestPicker = () => {
  setIsGuestPickerOpen(true)
}

const closeGuestPicker = () => {
  setIsGuestPickerOpen(false)
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
          onDestinationClick={openRegionPicker}
          isRegionPickerOpen={isRegionPickerOpen}
          selectedRegion={selectedRegion}
          onGuestsClick={openGuestPicker}
          guestCount={totalGuests}
          isGuestPickerOpen={isGuestPickerOpen}
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
              onDestinationClick={openRegionPicker}
              isRegionPickerOpen={isRegionPickerOpen}
              selectedRegion={selectedRegion}
              onGuestsClick={openGuestPicker}
              guestCount={totalGuests}
              isGuestPickerOpen={isGuestPickerOpen}
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

      {isRegionPickerOpen && (
        <RegionPicker
          selectedRegion={selectedRegion}
          onRegionChange={setSelectedRegion}
          onClose={closeRegionPicker}
        />
      )}

      {isGuestPickerOpen && (
        <GuestPicker
          adults={adults}
          children={children}
          infants={infants}
          pets={pets}
          onAdultsChange={setAdults}
          onChildrenChange={setChildren}
          onInfantsChange={setInfants}
          onPetsChange={setPets}
          onClose={closeGuestPicker}
        />
      )}

    </>
  )
}

export default Header