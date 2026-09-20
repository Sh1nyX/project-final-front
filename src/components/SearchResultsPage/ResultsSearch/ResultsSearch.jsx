import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'

import './ResultsSearch.css'

import { regions } from '../../../data/regions'
import SearchBar from '../../SearchBar/SearchBar'
import DatePicker from '../../DatePicker/DatePicker'
import RegionPicker from '../../RegionPicker/RegionPicker'
import GuestPicker from '../../GuestPicker/GuestPicker'

import mapIcon from '../../../assets/searchpageicons/map-icon.svg'

function ResultsSearch() {
  const [searchParams, setSearchParams] = useSearchParams()

  const [checkIn, setCheckIn] = useState(
    searchParams.get('check_in') || ''
  )

  const [checkOut, setCheckOut] = useState(
    searchParams.get('check_out') || ''
  )

  const [flexibleDays, setFlexibleDays] = useState(
    Number(searchParams.get('flexible_days')) || 0
  )

  const [activeDateField, setActiveDateField] = useState(null)
  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false)

  const regionId = searchParams.get('region')

  const [selectedRegion, setSelectedRegion] = useState(() => {
    return (
      regions.find((region) => region.id === regionId) || null
    )
  })
  const [isRegionPickerOpen, setIsRegionPickerOpen] = useState(false)

  const [adults, setAdults] = useState(
    Number(searchParams.get('guests')) || 0
  )

  const [children, setChildren] = useState(0)
  const [infants, setInfants] = useState(0)
  const [pets, setPets] = useState(0)

  const [isGuestPickerOpen, setIsGuestPickerOpen] = useState(false)

  const totalGuests = adults + children

  useEffect(() => {
    setCheckIn(searchParams.get('check_in') || '')
    setCheckOut(searchParams.get('check_out') || '')

    setFlexibleDays(
      Number(searchParams.get('flexible_days')) || 0
    )

    setAdults(
      Number(searchParams.get('guests')) || 0
    )

    setChildren(0)

    const regionId = searchParams.get('region')

    setSelectedRegion(
      regions.find(
        (region) => region.id === regionId
      ) || null
    )
  }, [searchParams])

  const openDatePicker = (field) => {
    setActiveDateField(field)
    setIsDatePickerOpen(true)
  }

  const closeDatePicker = () => {
    setIsDatePickerOpen(false)
    setActiveDateField(null)
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

  const handleSearch = () => {
    const params = new URLSearchParams(searchParams)

    if (checkIn) {
      params.set('check_in', checkIn)
    } else {
      params.delete('check_in')
    }

    if (checkOut) {
      params.set('check_out', checkOut)
    } else {
      params.delete('check_out')
    }

    if (flexibleDays > 0) {
      params.set('flexible_days', flexibleDays)
    } else {
      params.delete('flexible_days')
    }

    if (totalGuests > 0) {
      params.set('guests', totalGuests)
    } else {
      params.delete('guests')
    }

    if (selectedRegion?.id && selectedRegion.id !== 'all') {
      params.set('region', selectedRegion.id)
    } else {
      params.delete('region')
    }

    setSearchParams(params)
  }

  return (
    <>
      <section className="results-search">
        <div className="results-search-inner">

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

          <button
            type="button"
            className="results-map-button"
          >
            <span>Показати мапу</span>

            <img
              src={mapIcon}
              alt=""
            />
          </button>

        </div>
      </section>

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

export default ResultsSearch