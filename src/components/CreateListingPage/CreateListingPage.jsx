
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import api from '../../services/api'
import { useAuth } from '../../context/AuthContext'

import BookingHeader from '../BookingPage/BookingHeader/BookingHeader'
import BookingFooter from '../BookingPage/BookingFooter/BookingFooter'

import IdentityVerificationFlow from './IdentityVerificationFlow/IdentityVerificationFlow'
import CreateListingForm from './CreateListingForm/CreateListingForm'

import './CreateListingPage.css'

function CreateListingPage() {
  const navigate = useNavigate()
  const { isAuthenticated } = useAuth()

  const [pageState, setPageState] = useState('checking')
  const [error, setError] = useState('')
  const [retryKey, setRetryKey] = useState(0)

  useEffect(() => {
    let cancelled = false

    async function checkVerification() {
      if (!isAuthenticated) {
        setPageState('auth-required')
        return
      }

      setPageState('checking')
      setError('')

      try {
        const response = await api.get('/verification/status')
        if (cancelled) return

        const status = response.data?.verification ?? response.data

        const hasDocument = Boolean(
          status?.is_identity_verified ||
          status?.identity_document_url ||
          status?.document_front_url ||
          status?.verification_status === 'verified'
        )

        setPageState(hasDocument ? 'form' : 'verification')
      } catch (err) {
        if (cancelled) return

        console.error('VERIFICATION STATUS ERROR:', err)

        if (err.response?.status === 401) {
          setPageState('auth-required')
        } else {
          setError(
            'Не вдалося перевірити статус документа. Спробуйте ще раз.'
          )
          setPageState('error')
        }
      }
    }

    checkVerification()

    return () => {
      cancelled = true
    }
  }, [isAuthenticated, retryKey])

  function handleListingCreated(listing) {
    navigate(`/listing/${listing.id}`, { replace: true })
  }

  return (
    <div className="create-listing-page">
      <BookingHeader onHome={() => navigate('/')} />

      <main className="create-listing-main">
        {pageState === 'checking' && (
          <div className="create-listing-message">
            Перевіряємо наявність посвідчення особи...
          </div>
        )}

        {pageState === 'auth-required' && (
          <div className="create-listing-message">
            <h1>Увійдіть у свій акаунт</h1>

            <p>
              Щоб запропонувати помешкання, потрібно
              авторизуватися.
            </p>

            <button
              type="button"
              onClick={() => navigate('/')}
            >
              На головну
            </button>
          </div>
        )}

        {pageState === 'error' && (
          <div className="create-listing-message">
            <h1>Не вдалося перевірити документ</h1>
            <p>{error}</p>

            <button
              type="button"
              onClick={() => setRetryKey((value) => value + 1)}
            >
              Спробувати ще раз
            </button>
          </div>
        )}

        {pageState === 'verification' && (
          <IdentityVerificationFlow
            onComplete={() => setPageState('form')}
          />
        )}

        {pageState === 'form' && (
          <CreateListingForm
            onCreated={handleListingCreated}
          />
        )}
      </main>

      <BookingFooter />
    </div>
  )
}

export default CreateListingPage
