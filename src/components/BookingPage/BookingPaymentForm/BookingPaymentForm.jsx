
import './BookingPaymentForm.css'

function BookingPaymentForm({
  onConfirm,
  isProcessing,
  paymentError,
  disabled,
}) {
  return (
    <div className="booking-checkout">
      <section className="booking-checkout-section">
        <h2>Оплатити за допомогою</h2>

        <label className="booking-payment-method">
          <span className="booking-visually-hidden">
            Спосіб оплати
          </span>

          <select defaultValue="card">
            <option value="card">
              Кредитна або дебетова картка
            </option>
          </select>
        </label>

        <div className="booking-card-fields">
          <input
            type="text"
            placeholder="Номер картки"
            aria-label="Номер картки"
            inputMode="numeric"
            autoComplete="off"
          />

          <div className="booking-card-fields-row">
            <input
              type="text"
              placeholder="Термін дії"
              aria-label="Термін дії картки"
              autoComplete="off"
            />

            <input
              type="text"
              placeholder="CVV"
              aria-label="CVV"
              inputMode="numeric"
              autoComplete="off"
            />
          </div>

          <input
            type="text"
            placeholder="Індекс"
            aria-label="Поштовий індекс"
            autoComplete="postal-code"
          />

          <label className="booking-payment-method">
            <span className="booking-visually-hidden">
              Країна або регіон
            </span>

            <select defaultValue="UA">
              <option value="UA">Країна/регіон — Україна</option>
              <option value="PL">Польща</option>
              <option value="DE">Німеччина</option>
              <option value="OTHER">Інша країна</option>
            </select>
          </label>
        </div>

        <p className="booking-demo-payment-note">
          Навчальна демо-оплата. Дані картки не надсилаються
          на сервер, реальні кошти не списуються.
        </p>
      </section>

      <section className="booking-checkout-section">
        <h2>Потрібно для подорожі</h2>

        <div className="booking-travel-requirement">
          <h3>Напишіть господарю</h3>
          <p>
            Повідомте господаря про мету своєї подорожі
            та час прибуття.
          </p>
        </div>

        <div className="booking-travel-requirement">
          <h3>Фотографія профілю</h3>
          <p>
            Господарі хочуть знати, хто гостюватиме
            в їхній оселі.
          </p>
        </div>

        <div className="booking-travel-requirement">
          <h3>Номер телефону</h3>
          <p>
            Додайте та підтвердьте номер телефону,
            щоб отримувати новини про подорож.
          </p>
        </div>
      </section>

      <section className="booking-checkout-section">
        <h2>Правила скасування бронювання</h2>

        <p className="booking-checkout-text">
          Перед підтвердженням ознайомтеся з умовами
          скасування бронювання, які діють для цього помешкання.
        </p>

        <button
          type="button"
          className="booking-text-link"
          onClick={() =>
            document
              .getElementById('booking-house-rules')
              ?.scrollIntoView({ behavior: 'smooth' })
          }
        >
          Докладніше
        </button>
      </section>

      <section
        className="booking-checkout-section"
        id="booking-house-rules"
      >
        <h2>Основні правила</h2>

        <p className="booking-checkout-text">
          Ми просимо всіх мандрівників пам’ятати кілька
          простих правил належної поведінки гостей.
        </p>

        <ul className="booking-house-rules">
          <li>Дотримуйтеся правил дому.</li>
          <li>Ставтеся до помешкання господаря як до власної оселі.</li>
        </ul>
      </section>

      <div className="booking-checkout-terms">
        Натискаючи кнопку нижче, ви погоджуєтеся з правилами
        помешкання та умовами бронювання HomeFU. Це навчальний
        проєкт: оплата імітується, реального списання коштів немає.
      </div>

      {paymentError && (
        <p className="booking-payment-error" role="alert">
          {paymentError}
        </p>
      )}

      <button
        type="button"
        className="booking-primary-button booking-confirm-payment-button"
        onClick={onConfirm}
        disabled={disabled || isProcessing}
      >
        {isProcessing
          ? 'Обробка бронювання...'
          : 'Підтвердити й оплатити'}
      </button>
    </div>
  )
}

export default BookingPaymentForm
