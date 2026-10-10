
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import api from '../../services/api'

import BookingHeader from '../BookingPage/BookingHeader/BookingHeader'
import BookingFooter from '../BookingPage/BookingFooter/BookingFooter'

import BookingList from './BookingList/BookingList'
import BookingsEmptyState from './BookingsEmptyState/BookingsEmptyState'

import './MyBookingsPage.css'

function getDateKey(value) {
  return value ? String(value).slice(0, 10) : ''
}

function getTodayKey() {
  const now = new Date()

  const year = now.getFullYear()
  const month = String(now.getMonth() + 1).padStart(2, '0')
  const day = String(now.getDate()).padStart(2, '0')

  return `${year}-${month}-${day}`
}

function MyBookingsPage() {
  const navigate = useNavigate()

  const [bookings, setBookings] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState('')
  const [reloadKey, setReloadKey] = useState(0)

  useEffect(() => {
    let cancelled = false

    async function loadBookings() {
      try {
        setIsLoading(true)
        setError('')

        const response = await api.get('/bookings/my')

        if (cancelled) return

        const data = Array.isArray(response.data)
          ? response.data
          : response.data?.bookings || []

        setBookings(data)
      } catch (err) {
        if (cancelled) return

        console.error('MY BOOKINGS ERROR:', err)

        if (err.response?.status === 401) {
          setError(
            'Щоб переглянути свої бронювання, увійди у свій акаунт.'
          )
        } else {
          setError(
            'Не вдалося завантажити бронювання. Спробуй ще раз.'
          )
        }
      } finally {
        if (!cancelled) {
          setIsLoading(false)
        }
      }
    }

    loadBookings()

    return () => {
      cancelled = true
    }
  }, [reloadKey])

  const today = getTodayKey()

  const activeBookings = bookings
    .filter((booking) => {
      const status = String(booking.status || '').toLowerCase()

      return (
        status === 'confirmed' &&
        getDateKey(booking.check_out) >= today
      )
    })
    .sort((a, b) =>
      getDateKey(a.check_in).localeCompare(
        getDateKey(b.check_in)
      )
    )

  function handleOpenListing(listingId) {
    navigate(`/listing/${listingId}`)
  }

  return (
    <div className="my-bookings-page">
      <BookingHeader onHome={() => navigate('/')} />

      <main className="my-bookings-main">
        <button
          type="button"
          className="my-bookings-back"
          onClick={() => navigate('/profile')}
        >
          ← Профіль
        </button>

        <div className="my-bookings-page-heading">
          <div>
            <h1>Мої бронювання</h1>

            <p>
              Керуй своїми подорожами та переглядай
              деталі підтверджених бронювань.
            </p>
          </div>

          {!isLoading && !error && (
            <span className="my-bookings-count">
              {activeBookings.length}{' '}
              {activeBookings.length === 1
                ? 'бронювання'
                : 'бронювань'}
            </span>
          )}
        </div>

        {isLoading ? (
          <div className="my-bookings-message">
            Завантаження бронювань...
          </div>
        ) : error ? (
          <div className="my-bookings-error" role="alert">
            <p>{error}</p>

            {error.includes('увійди') ? (
              <button
                type="button"
                onClick={() => navigate('/profile')}
              >
                Перейти до профілю
              </button>
            ) : (
              <button
                type="button"
                onClick={() => setReloadKey((value) => value + 1)}
              >
                Спробувати ще раз
              </button>
            )}
          </div>
        ) : activeBookings.length > 0 ? (
          <BookingList
            bookings={activeBookings}
            onOpenListing={handleOpenListing}
          />
        ) : (
          <BookingsEmptyState
            onExplore={() => navigate('/')}
          />
        )}
      </main>

      <BookingFooter />
    </div>
  )
}

export default MyBookingsPage
