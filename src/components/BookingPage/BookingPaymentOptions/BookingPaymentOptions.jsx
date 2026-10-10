import { formatPrice } from '../bookingUtils'
import './BookingPaymentOptions.css'

function BookingPaymentOptions({
  paymentMethod,
  onPaymentMethodChange,
  total,
  firstPayment,
  laterPayment,
}) {
  return (
    <section className="booking-payment-section">
      <h2>Виберіть варіант оплати</h2>

      <div className="booking-payment-options">
        <label
          className={`booking-payment-option ${
            paymentMethod === 'full' ? 'selected' : ''
          }`}
        >
          <input
            type="radio"
            name="paymentMethod"
            value="full"
            checked={paymentMethod === 'full'}
            onChange={() => onPaymentMethodChange('full')}
          />

          <span className="booking-payment-copy">
            <strong>Оплатити в повному обсязі</strong>
            <span>
              Сплатіть усю суму ({formatPrice(total)}) одразу.
            </span>
          </span>
        </label>

        <label
          className={`booking-payment-option ${
            paymentMethod === 'split' ? 'selected' : ''
          }`}
        >
          <input
            type="radio"
            name="paymentMethod"
            value="split"
            checked={paymentMethod === 'split'}
            onChange={() => onPaymentMethodChange('split')}
          />

          <span className="booking-payment-copy">
            <strong>Оплата двома частинами</strong>
            <span>
              {formatPrice(firstPayment)} сьогодні,
              {' '}
              {formatPrice(laterPayment)} пізніше.
            </span>
            <span className="booking-payment-note">
              Попередній розрахунок. Реальна оплата частинами
              ще не підключена.
            </span>
          </span>
        </label>
      </div>
    </section>
  )
}

export default BookingPaymentOptions