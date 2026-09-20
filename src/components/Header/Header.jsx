import { useEffect, useState } from 'react'
import './Header.css'
import { useNavigate } from 'react-router-dom'

import CategoryNav from '../CategoryNav/CategoryNav'
import DatePicker from '../DatePicker/DatePicker'
import RegionPicker from '../RegionPicker/RegionPicker'
import GuestPicker from '../GuestPicker/GuestPicker'
import SearchBar from '../SearchBar/SearchBar'

import mapIcon from '../../assets/map-icon.svg'
import menuIcon from '../../assets/menu-icon.svg'
import profileIcon from '../../assets/profile-icon.svg'


function AccountButton() {
  return (
    <button className="account-button">
      <img src={menuIcon} alt="" />
      <img src={profileIcon} alt="" />
    </button>
  )
}


function Header({
  selectedCategory,
  onCategoryChange,
  onDatesChange,
  isTotalPrice,
  onTotalPriceChange,
}) {
  const navigate = useNavigate()

  const [isScrolled, setIsScrolled] = useState(false)
  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false)
  const [isCategoriesCollapsed, setIsCategoriesCollapsed] = useState(false)

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
      setIsScrolled(window.scrollY > 100)
    }

    window.addEventListener('scroll', handleScroll)

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  const totalGuests = adults + children

  useEffect(() => {
  onDatesChange?.({
    check_in: checkIn,
    check_out: checkOut,
    flexible_days: flexibleDays,
    category_id: selectedCategory?.id || 1,
    guests: totalGuests,
  })
}, [
  checkIn,
  checkOut,
  flexibleDays,
  selectedCategory,
  totalGuests,
  onDatesChange,
])

  const handleSearch = () => {
    const params = new URLSearchParams()

    if (selectedRegion?.id && selectedRegion.id !== 'all') {
      params.set('region', selectedRegion.id)
    } else {
      params.delete('region')
    }

    if (checkIn) {
      params.set('check_in', checkIn)
    }

    if (checkOut) {
      params.set('check_out', checkOut)
    }

    if (flexibleDays > 0) {
      params.set('flexible_days', flexibleDays)
    }

    if (totalGuests > 0) {
      params.set('guests', totalGuests)
    }

    if (selectedCategory?.id) {
      params.set('category_id', selectedCategory.id)
    }

    navigate(`/search?${params.toString()}`)
  }

  const handleLogoClick = (e) => {
    e.preventDefault()

    setCheckIn('')
    setCheckOut('')
    setFlexibleDays(0)

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

        <a
          href="/"
          className="logo"
          onClick={handleLogoClick}
        >
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
          isCollapsed={isCategoriesCollapsed}
          onToggleCollapse={() =>
            setIsCategoriesCollapsed((current) => !current)
          }
          isTotalPrice={isTotalPrice}
          onTotalPriceChange={onTotalPriceChange}
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
            isCollapsed={isCategoriesCollapsed}
            onToggleCollapse={() =>
              setIsCategoriesCollapsed((current) => !current)
            }
            isTotalPrice={isTotalPrice}
            onTotalPriceChange={onTotalPriceChange}
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