import {
  useEffect,
  useMemo,
  useState,
} from 'react'

import './AvailabilityCalendar.css'

const MONTHS = [
  'Січень',
  'Лютий',
  'Березень',
  'Квітень',
  'Травень',
  'Червень',
  'Липень',
  'Серпень',
  'Вересень',
  'Жовтень',
  'Листопад',
  'Грудень',
]

const WEEK_DAYS = [
  'Пн',
  'Вт',
  'Ср',
  'Чт',
  'Пт',
  'Сб',
  'Нд',
]

function toDateKey(value) {
  if (!value) {
    return ''
  }

  const date = new Date(value)

  return [
    date.getUTCFullYear(),
    String(date.getUTCMonth() + 1).padStart(2, '0'),
    String(date.getUTCDate()).padStart(2, '0'),
  ].join('-')
}

function parseDateKey(value) {
  const [year, month, day] = value
    .split('-')
    .map(Number)

  return new Date(
    Date.UTC(year, month - 1, day)
  )
}

function formatDate(value) {
  const date = parseDateKey(value)

  return `${String(date.getUTCDate()).padStart(2, '0')}.${String(
    date.getUTCMonth() + 1
  ).padStart(2, '0')}.${date.getUTCFullYear()}`
}

function addMonths(date, amount) {
  return new Date(
    Date.UTC(
      date.getUTCFullYear(),
      date.getUTCMonth() + amount,
      1
    )
  )
}

function getMonthDays(date) {
  const year = date.getUTCFullYear()
  const month = date.getUTCMonth()

  const firstDay = new Date(
    Date.UTC(year, month, 1)
  )

  const daysInMonth = new Date(
    Date.UTC(year, month + 1, 0)
  ).getUTCDate()

  let weekday = firstDay.getUTCDay()

  // Переводим воскресенье из 0 в 7,
  // потому что календарь начинается с понедельника.
  if (weekday === 0) {
    weekday = 7
  }

  const emptyDays = weekday - 1

  const days = []

  for (let i = 0; i < emptyDays; i += 1) {
    days.push(null)
  }

  for (let day = 1; day <= daysInMonth; day += 1) {
    days.push(
      new Date(
        Date.UTC(year, month, day)
      )
    )
  }

  return days
}

function isBetween(dateKey, from, to) {
  return (
    from &&
    to &&
    dateKey > from &&
    dateKey < to
  )
}

function isBooked(dateKey, bookings) {
  return bookings.some((booking) => {
    const from = toDateKey(booking.check_in)
    const to = toDateKey(booking.check_out)

    return dateKey >= from && dateKey < to
  })
}

function getNights(checkIn, checkOut) {
  if (!checkIn || !checkOut) {
    return 0
  }

  const from = parseDateKey(checkIn)
  const to = parseDateKey(checkOut)

  return Math.max(
    0,
    Math.round(
      (to - from) /
      (1000 * 60 * 60 * 24)
    )
  )
}

function CalendarMonth({
  monthDate,
  availableFrom,
  availableTo,
  bookings,
  checkIn,
  checkOut,
  onDateClick,
}) {
  const days = useMemo(
    () => getMonthDays(monthDate),
    [monthDate]
  )

  return (
    <div className="availability-month">

      <h3>
        {MONTHS[monthDate.getUTCMonth()]}{' '}
        {monthDate.getUTCFullYear()}
      </h3>

      <div className="availability-weekdays">
        {WEEK_DAYS.map((day) => (
          <span key={day}>
            {day}
          </span>
        ))}
      </div>

      <div className="availability-days">

        {days.map((date, index) => {
          if (!date) {
            return (
              <span
                key={`empty-${index}`}
                className="availability-empty"
              />
            )
          }

          const dateKey = toDateKey(date)

          const isBeforeAvailability =
            availableFrom &&
            dateKey < toDateKey(availableFrom)

          const isAfterAvailability =
            availableTo &&
            dateKey >= toDateKey(availableTo)

          const booked = isBooked(
            dateKey,
            bookings
          )

          const disabled =
            isBeforeAvailability ||
            isAfterAvailability ||
            booked

          const selectedStart =
            dateKey === checkIn

          const selectedEnd =
            dateKey === checkOut

          const selectedBetween =
            isBetween(
              dateKey,
              checkIn,
              checkOut
            )

          return (
            <button
              key={dateKey}
              type="button"
              className={[
                'availability-day',
                disabled
                  ? 'disabled'
                  : '',
                selectedStart
                  ? 'selected-start'
                  : '',
                selectedEnd
                  ? 'selected-end'
                  : '',
                selectedBetween
                  ? 'selected-between'
                  : '',
                booked
                  ? 'booked'
                  : '',
              ]
                .filter(Boolean)
                .join(' ')}
              disabled={disabled}
              onClick={() =>
                onDateClick(dateKey)
              }
            >
              {date.getUTCDate()}
            </button>
          )
        })}

      </div>

    </div>
  )
}

function AvailabilityCalendar({
  listing,
  checkIn,
  checkOut,
  onDatesChange,
}) {
  const availableFrom = listing.available_from
    ? toDateKey(listing.available_from)
    : ''

  const availableTo = listing.available_to
    ? toDateKey(listing.available_to)
    : ''

  const bookings = Array.isArray(listing.bookings)
    ? listing.bookings
    : []

  const initialMonth = checkIn
  ? parseDateKey(checkIn)
  : availableFrom
    ? parseDateKey(availableFrom)
    : new Date()

    const [visibleMonth, setVisibleMonth] =
    useState(
        new Date(
        Date.UTC(
            initialMonth.getUTCFullYear(),
            initialMonth.getUTCMonth(),
            1
        )
        )
    )

    useEffect(() => {
  if (!checkIn) {
    return
  }

  const selectedMonth = parseDateKey(checkIn)

  setVisibleMonth(
    new Date(
      Date.UTC(
        selectedMonth.getUTCFullYear(),
        selectedMonth.getUTCMonth(),
        1
      )
    )
  )
}, [checkIn])

  const nights = getNights(
    checkIn,
    checkOut
  )

  const handleDateClick = (dateKey) => {
    if (!checkIn) {
      onDatesChange(dateKey, '')
      return
    }

    if (!checkOut) {
      if (dateKey <= checkIn) {
        onDatesChange(dateKey, '')
        return
      }

      onDatesChange(
        checkIn,
        dateKey
      )

      return
    }

    onDatesChange(
      dateKey,
      ''
    )
  }

  const handleClear = () => {
    onDatesChange('', '')
  }

  const previousMonth = () => {
    setVisibleMonth((current) =>
      addMonths(current, -1)
    )
  }

  const nextMonth = () => {
    setVisibleMonth((current) =>
      addMonths(current, 1)
    )
  }

  const secondMonth = addMonths(
    visibleMonth,
    1
  )

  return (
    <section className="availability-calendar">

      <div className="availability-heading">

        <div>

          <h2>
            {listing.location_city}
            {nights > 0
              ? ` : ${nights} ${
                  nights === 1
                    ? 'ніч'
                    : 'ночі'
                }`
              : ''}
          </h2>

          {checkIn && checkOut && (
            <p>
              {formatDate(checkIn)}
              {' — '}
              {formatDate(checkOut)}
            </p>
          )}

        </div>

        <div className="availability-controls">

          <button
            type="button"
            onClick={previousMonth}
          >
            ←
          </button>

          <button
            type="button"
            onClick={nextMonth}
          >
            →
          </button>

        </div>

      </div>

      <div className="availability-months">

        <CalendarMonth
          monthDate={visibleMonth}
          availableFrom={availableFrom}
          availableTo={availableTo}
          bookings={bookings}
          checkIn={checkIn}
          checkOut={checkOut}
          onDateClick={handleDateClick}
        />

        <CalendarMonth
          monthDate={secondMonth}
          availableFrom={availableFrom}
          availableTo={availableTo}
          bookings={bookings}
          checkIn={checkIn}
          checkOut={checkOut}
          onDateClick={handleDateClick}
        />

      </div>

      {(checkIn || checkOut) && (
        <button
          type="button"
          className="availability-clear"
          onClick={handleClear}
        >
          Очистити дати
        </button>
      )}

    </section>
  )
}

export default AvailabilityCalendar