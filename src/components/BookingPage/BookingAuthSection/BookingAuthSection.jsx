
import { useEffect, useState } from 'react'

import LoginModal from '../../Auth/LoginModal'
import RegisterModal from '../../Auth/RegisterModal'

import './BookingAuthSection.css'

function formatPrice(value) {
  return new Intl.NumberFormat('uk-UA', {
    style: 'currency',
    currency: 'UAH',
    maximumFractionDigits: 2,
  }).format(Number(value) || 0)
}

function BookingAuthSection({
  user,
  isAuthenticated,
  hasValidDates,
  isGuestCountValid,
  maxGuests,
  onContinue,
  isProcessingPayment,
  paymentError,
  paymentResult,
}) {
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false)
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false)
  const [notice, setNotice] = useState('')

  useEffect(() => {
    if (isAuthenticated) {
      setIsLoginModalOpen(false)
      setIsRegisterModalOpen(false)
      setNotice('')
    }
  }, [isAuthenticated])

  async function handleContinue() {
    setNotice('')

    if (!hasValidDates) {
      setNotice(
        'Оберіть дати заїзду та виїзду на сторінці помешкання.'
      )
      return
    }

    if (!isGuestCountValid) {
      setNotice(
        `Це помешкання розраховане максимум на ${maxGuests} гостей.`
      )
      return
    }

    if (!isAuthenticated) {
      setNotice('Увійдіть або зареєструйтеся, щоб продовжити.')
      setIsLoginModalOpen(true)
      return
    }

    if (typeof onContinue === 'function') {
      await onContinue()
    }
  }

  const booking = paymentResult?.booking

  return (
    <section className="booking-auth-section">
      {isAuthenticated ? (
        <>
          <h2>Ваш обліковий запис</h2>

          <div className="booking-signed-in">
            <div className="booking-user-avatar">
              {(user?.first_name || user?.email || 'U')
                .slice(0, 1)
                .toUpperCase()}
            </div>

            <div className="booking-signed-in-info">
              <strong>
                {[user?.first_name, user?.last_name]
                  .filter(Boolean)
                  .join(' ') || 'Ви ввійшли в акаунт'}
              </strong>

              <span>{user?.email}</span>
            </div>
          </div>

          <p className="booking-auth-description">
            Перевірте дані подорожі перед продовженням.
          </p>
        </>
      ) : (
        <>
          <h2>
            Увійдіть або зареєструйтеся,
            щоб зробити бронювання
          </h2>

          <p className="booking-auth-description">
            Увійдіть у свій акаунт HomeFU або створіть новий,
            щоб продовжити оформлення.
          </p>

          <div className="booking-auth-actions">
            <button
              type="button"
              className="booking-primary-button"
              onClick={() => {
                setNotice('')
                setIsLoginModalOpen(true)
              }}
            >
              Увійти
            </button>

            <button
              type="button"
              className="booking-secondary-button"
              onClick={() => {
                setNotice('')
                setIsRegisterModalOpen(true)
              }}
            >
              Зареєструватися
            </button>
          </div>
        </>
      )}

      {notice && (
        <p className="booking-notice" role="status">
          {notice}
        </p>
      )}

      {paymentError && !paymentResult && (
        <p className="booking-payment-error" role="alert">
          {paymentError}
        </p>
      )}

      {paymentResult && booking ? (
        <div className="booking-payment-success" role="status">
          <h3>Бронювання підтверджено!</h3>

          <p>
            Номер бронювання: <strong>#{booking.id}</strong>
          </p>

          <p>
            Статус: <strong>підтверджено</strong>
          </p>

          <p>
            Демо-оплата: <strong>успішна</strong>
          </p>

          <p>
            Оплачено в демо-режимі:{' '}
            <strong>{formatPrice(paymentResult.amountPaid)}</strong>
          </p>

          {booking.payment_status === 'partially_paid' && (
            <p>
              Це демонстраційна часткова оплата. Решта суми
              залишається до сплати за обраним сценарієм.
            </p>
          )}

          <p className="booking-privacy-note">
            Гроші з картки не списувалися. Це навчальна імітація оплати.
          </p>
        </div>
      ) : (
        <>
          <button
            type="button"
            className="booking-primary-button booking-continue-button"
            onClick={handleContinue}
            disabled={
              !hasValidDates ||
              !isGuestCountValid ||
              isProcessingPayment
            }
          >
            {isProcessingPayment
              ? 'Обробка бронювання...'
              : 'Продовжити'}
          </button>

          <p className="booking-privacy-note">
            Демо-режим: реального списання коштів немає.
          </p>
        </>
      )}

      {isLoginModalOpen && (
        <LoginModal
          onClose={() => setIsLoginModalOpen(false)}
          onRegisterClick={() => {
            setIsLoginModalOpen(false)
            setIsRegisterModalOpen(true)
          }}
        />
      )}

      {isRegisterModalOpen && (
        <RegisterModal
          onClose={() => setIsRegisterModalOpen(false)}
          onLoginClick={() => {
            setIsRegisterModalOpen(false)
            setIsLoginModalOpen(true)
          }}
        />
      )}
    </section>
  )
}

export default BookingAuthSection
