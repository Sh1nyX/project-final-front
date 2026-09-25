import { useEffect, useState } from 'react'
import {
  useParams,
  useSearchParams,
} from 'react-router-dom'

import './ListingPage.css'

import { getListingById } from '../../services/api'

import ListingHeader from './ListingHeader/ListingHeader'
import ListingGallery from './ListingGallery/ListingGallery'
import ListingOverview from './ListingOverview/ListingOverview'
import BookingCard from './BookingCard/BookingCard'
import SleepingArrangements from './SleepingArrangements/SleepingArrangements'
import Amenities from './Amenities/Amenities'
import AvailabilityCalendar from './AvailabilityCalendar/AvailabilityCalendar'
import Reviews from './Reviews/Reviews'
import ListingLocation from './ListingLocation/ListingLocation'
import ListingHost from './ListingHost/ListingHost'
import ImportantInformation from './ImportantInformation/ImportantInformation'
import ListingFooter from './ListingFooter/ListingFooter'
import ListingStickyBar from './ListingStickyBar/ListingStickyBar'

function ListingPage() {
  const { id } = useParams()

  const [searchParams] = useSearchParams()

  const initialCheckIn =
    searchParams.get('check_in') || ''

  const initialCheckOut =
    searchParams.get('check_out') || ''

  const [listing, setListing] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  
  const [checkIn, setCheckIn] =
  useState(initialCheckIn)

  const [checkOut, setCheckOut] =
  useState(initialCheckOut)

  const [isStickyBarVisible, setIsStickyBarVisible] = useState(true)

  useEffect(() => {
    const loadListing = async () => {
      try {
        setLoading(true)
        setError(null)

        const data = await getListingById(id)

        setListing(data)
      } catch (error) {
        console.error(error)
        setError('Не вдалося завантажити помешкання')
      } finally {
        setLoading(false)
      }
    }

    loadListing()
  }, [id])

  useEffect(() => {
  const footer = document.querySelector('.listing-footer')

  if (!footer) return

  const checkFooterVisibility = () => {
    const footerRect = footer.getBoundingClientRect()

    const footerReachedViewport =
      footerRect.top <= window.innerHeight

    setIsStickyBarVisible(!footerReachedViewport)
  }

  checkFooterVisibility()

  window.addEventListener('scroll', checkFooterVisibility, {
    passive: true,
  })

  window.addEventListener('resize', checkFooterVisibility)

  return () => {
    window.removeEventListener('scroll', checkFooterVisibility)
    window.removeEventListener('resize', checkFooterVisibility)
  }
}, [listing])

  if (loading) {
    return (
      <div className="listing-page-status">
        Завантаження...
      </div>
    )
  }

  if (error) {
    return (
      <div className="listing-page-status">
        {error}
      </div>
    )
  }

  if (!listing) {
    return (
      <div className="listing-page-status">
        Помешкання не знайдено
      </div>
    )
  }

  return (
  <>
    <main className="listing-page">
      <ListingHeader listing={listing} />

      <div id="listing-gallery">
        <ListingGallery listing={listing} />
      </div>

      <div className="listing-booking-section">
        <div className="listing-content-main">
          <div id="listing-details">
            <ListingOverview listing={listing} />

            <SleepingArrangements listing={listing} />
          </div>

          <div id="listing-amenities">
            <Amenities listing={listing} />
          </div>

          <AvailabilityCalendar
            listing={listing}
            checkIn={checkIn}
            checkOut={checkOut}
            onDatesChange={(checkInDate, checkOutDate) => {
              setCheckIn(checkInDate)
              setCheckOut(checkOutDate)
            }}
          />
        </div>

        <BookingCard
          listing={listing}
          checkIn={checkIn}
          checkOut={checkOut}
        />
      </div>

      <div className="listing-reviews-wide" id="listing-reviews">
        <Reviews listing={listing} />
      </div>

      <div id="listing-location">
        <ListingLocation listing={listing} />
      </div>

      <ListingHost listing={listing} />

      <ImportantInformation listing={listing} />

      
    </main>

    <ListingStickyBar
      listing={listing}
      isVisible={isStickyBarVisible}
    />

    <ListingFooter />
  </>
)
}

export default ListingPage