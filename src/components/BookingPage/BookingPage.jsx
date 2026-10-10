import { useEffect, useState } from 'react'
import {
  useNavigate,
  useParams,
  useSearchParams,
} from 'react-router-dom'

import api, { getListingById } from '../../services/api'
import { useAuth } from '../../context/AuthContext'

import BookingHeader from './BookingHeader/BookingHeader'
import BookingInfoBanner from './BookingInfoBanner/BookingInfoBanner'
import BookingTripDetails from './BookingTripDetails/BookingTripDetails'
import BookingPaymentOptions from './BookingPaymentOptions/BookingPaymentOptions'
import BookingAuthSection from './BookingAuthSection/BookingAuthSection'
import BookingSummaryCard from './BookingSummaryCard/BookingSummaryCard'
import BookingFooter from './BookingFooter/BookingFooter'
import BookingPaymentForm from './BookingPaymentForm/BookingPaymentForm'

import { getNights } from './bookingUtils'

import './BookingPage.css'

function BookingPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()

  const { user, isAuthenticated } = useAuth()

  const checkIn = searchParams.get('check_in') || ''
  const checkOut = searchParams.get('check_out') || ''

  const parsedGuests = Number.parseInt(
    searchParams.get('guests') || '1',
    10
  )

  const guests = Number.isFinite(parsedGuests)
    ? Math.max(1, parsedGuests)
    : 1

  const nights = getNights(checkIn, checkOut)

  const [listing, setListing] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState('')

  const [paymentMethod, setPaymentMethod] = useState('full')

    const [isProcessingPayment, setIsProcessingPayment] = useState(false)
    const [paymentError, setPaymentError] = useState('')
    const [paymentResult, setPaymentResult] = useState(null)
    const [pendingBookingId, setPendingBookingId] = useState(null)



  useEffect(() => {
    let cancelled = false


    


    async function loadListing() {
      try {
        setIsLoading(true)
        setError('')

        const data = await getListingById(id)

        if (cancelled) return

        const loadedListing =
          data?.listing ??
          data?.data?.listing ??
          data?.data ??
          data

        if (!loadedListing?.id) {
          setListing(null)
          setError('Помешкання не знайдено')
          return
        }

        setListing(loadedListing)
      } catch (err) {
        if (cancelled) return

        console.error('BOOKING LISTING ERROR:', err)
        setError(
          'Не вдалося завантажити інформацію про помешкання'
        )
      } finally {
        if (!cancelled) {
          setIsLoading(false)
        }
      }
    }

    loadListing()

    return () => {
      cancelled = true
    }
  }, [id])

  const pricePerNight =
    Number(listing?.price_per_night) || 0

  const accommodationTotal = pricePerNight * nights

  const cleaningFee = Math.max(
    0,
    Number(listing?.cleaning_fee) || 0
  )

  const total = accommodationTotal + cleaningFee

  const firstPayment = total * 0.2
  const laterPayment = total - firstPayment

  const hasValidDates = Boolean(
    checkIn && checkOut && nights > 0
  )

  const maxGuests = Number(listing?.max_guests) || 0

  const isGuestCountValid =
    maxGuests === 0 || guests <= maxGuests

    async function handleContinue() {
    if (!isAuthenticated || !hasValidDates || !isGuestCountValid) {
        return
    }

    setIsProcessingPayment(true)
    setPaymentError('')

    try {
        let bookingId = pendingBookingId

        if (!bookingId) {
        const bookingResponse = await api.post('/bookings', {
            listing_id: Number(id),
            check_in: checkIn,
            check_out: checkOut,
            guests_count: guests,
            payment_option: paymentMethod,
        })

        bookingId = bookingResponse.data?.id

        if (!bookingId) {
            throw new Error('Не удалось создать бронирование')
        }

        setPendingBookingId(bookingId)
        }
        const paymentResponse = await api.post('/payments/process', {
        booking_id: bookingId,
        payment_method: 'demo',
        })

        setPaymentResult(paymentResponse.data)
        setPendingBookingId(null)
        setPaymentError('')

        navigate('/', {
        replace: true,
        state: {
            bookingSuccess: true,
            bookingId,
        },
        })

        return
    } catch (err) {
        console.error('BOOKING PAYMENT ERROR:', err)

        const serverError = err.response?.data?.error || err.message

        const errorMessages = {
        DATES_ALREADY_BOOKED:
            'Эти даты уже заняты. Вернитесь к объявлению и выберите другие даты.',
        INVALID_DATES:
            'Выбраны некорректные даты. Проверьте даты заезда и выезда.',
        INVALID_GUEST_COUNT:
            'Количество гостей превышает допустимое для этого жилья.',
        LISTING_NOT_FOUND:
            'Помешкание не найдено.',
        BOOKING_ALREADY_PROCESSED:
            'Это бронирование уже обработано.',
        BOOKING_CANCELLED:
            'Это бронирование отменено.',
        }

        setPaymentError(
        errorMessages[serverError] ||
            serverError ||
            'Не удалось завершить бронирование. Попробуйте ещё раз.'
        )
    } finally {
        setIsProcessingPayment(false)
    }
    }

  function handleEditDetails() {
    const params = new URLSearchParams()

    if (checkIn) params.set('check_in', checkIn)
    if (checkOut) params.set('check_out', checkOut)

    params.set('guests', String(guests))

    navigate(`/listing/${id}?${params.toString()}`)
  }

  if (isLoading) {
    return (
      <div className="booking-page">
        <BookingHeader onHome={() => navigate('/')} />

        <main className="booking-state">
          Завантаження помешкання...
        </main>

        <BookingFooter />
      </div>
    )
  }

  if (error || !listing) {
    return (
      <div className="booking-page">
        <BookingHeader onHome={() => navigate('/')} />

        <main className="booking-state">
          <h1>{error || 'Помешкання не знайдено'}</h1>

          <button
            type="button"
            className="booking-primary-button"
            onClick={() => navigate('/')}
          >
            На головну
          </button>
        </main>

        <BookingFooter />
      </div>
    )
  }

  return (
    <div className="booking-page">
      <BookingHeader onHome={() => navigate('/')} />

      <main className="booking-layout">
        <section className="booking-main-column">
          <button
            type="button"
            className="booking-back"
            onClick={() => navigate(`/listing/${id}`)}
            aria-label="Назад до оголошення"
          >
            ‹
          </button>

          <h1 className="booking-page-title">
            {isAuthenticated
                ? 'Підтвердження й оплата'
                : 'Запит на бронювання'}
            </h1>

          <BookingInfoBanner />

          <BookingTripDetails
            checkIn={checkIn}
            checkOut={checkOut}
            guests={guests}
            onEdit={handleEditDetails}
          />

          <BookingPaymentOptions
            paymentMethod={paymentMethod}
            onPaymentMethodChange={setPaymentMethod}
            total={total}
            firstPayment={firstPayment}
            laterPayment={laterPayment}
          />

          
        {isAuthenticated ? (
        <BookingPaymentForm
            onConfirm={handleContinue}
            isProcessing={isProcessingPayment}
            paymentError={paymentError}
            disabled={!hasValidDates || !isGuestCountValid}
        />
        ) : (
        <BookingAuthSection
            user={user}
            isAuthenticated={isAuthenticated}
            hasValidDates={hasValidDates}
            isGuestCountValid={isGuestCountValid}
            maxGuests={maxGuests}
            onContinue={handleContinue}
            isProcessingPayment={isProcessingPayment}
            paymentError={paymentError}
            paymentResult={paymentResult}
        />
        )}

        </section>

        <BookingSummaryCard
          listing={listing}
          nights={nights}
          accommodationTotal={accommodationTotal}
          cleaningFee={cleaningFee}
          total={total}
        />
      </main>

      <BookingFooter />
    </div>
  )
}

export default BookingPage