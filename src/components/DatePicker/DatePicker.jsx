import { useEffect, useMemo, useState } from 'react'
import './DatePicker.css'

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

const WEEKDAYS = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Нд']

function toDateString(date) {
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')

  return `${year}-${month}-${day}`
}

function getMonthDays(year, month) {
  const firstDay = new Date(year, month, 1)
  const daysInMonth = new Date(year, month + 1, 0).getDate()

  // JS: Sunday = 0. Нам нужно, чтобы Monday = 0.
  const startOffset = (firstDay.getDay() + 6) % 7

  const days = []

  for (let i = 0; i < startOffset; i += 1) {
    days.push(null)
  }

  for (let day = 1; day <= daysInMonth; day += 1) {
    days.push(
      new Date(year, month, day)
    )
  }

  return days
}

function DatePicker({
  checkIn,
  checkOut,
  flexibleDays,
  onFlexibleDaysChange,
  onCheckInChange,
  onCheckOutChange,
  onClose,
}) {
  const today = new Date()

  const [currentMonth, setCurrentMonth] = useState(
    new Date(today.getFullYear(), today.getMonth(), 1)
  )

  const [selecting, setSelecting] = useState(
    checkIn ? 'checkout' : 'checkin'
  )

  const secondMonth = useMemo(() => {
    return new Date(
      currentMonth.getFullYear(),
      currentMonth.getMonth() + 1,
      1
    )
  }, [currentMonth])

  useEffect(() => {
    if (!checkIn) {
      setSelecting('checkin')
    } else if (!checkOut) {
      setSelecting('checkout')
    }
  }, [checkIn, checkOut])

  const handleDayClick = (date) => {
  if (!date) return

  const selectedDate = toDateString(date)

  if (selectedDate === checkIn) {
    onCheckInChange('')
    onCheckOutChange('')
    setSelecting('checkin')
    return
  }

  if (selectedDate === checkOut) {
    onCheckOutChange('')
    setSelecting('checkout')
    return
  }

  if (!checkIn) {
    onCheckInChange(selectedDate)
    onCheckOutChange('')
    setSelecting('checkout')
    return
  }

  if (!checkOut) {
    if (selectedDate <= checkIn) {
      onCheckInChange(selectedDate)
      onCheckOutChange('')
      setSelecting('checkout')
      return
    }

    onCheckOutChange(selectedDate)
    setSelecting('checkin')
    return
  }

  onCheckInChange(selectedDate)
  onCheckOutChange('')
  setSelecting('checkout')
}

  const isSelected = (date) => {
    if (!date) {
      return false
    }

    const value = toDateString(date)

    return value === checkIn || value === checkOut
  }

  const isInRange = (date) => {
    if (!date || !checkIn || !checkOut) {
      return false
    }

    const value = toDateString(date)

    return value > checkIn && value < checkOut
  }

  const goPreviousMonth = () => {
    setCurrentMonth(
      new Date(
        currentMonth.getFullYear(),
        currentMonth.getMonth() - 1,
        1
      )
    )
  }

  

  const goNextMonth = () => {
    setCurrentMonth(
      new Date(
        currentMonth.getFullYear(),
        currentMonth.getMonth() + 1,
        1
      )
    )
  }

  const handleFlexibleChange = (days) => {
  console.log('FLEXIBLE BUTTON:', days)
  onFlexibleDaysChange(days)
}

  const renderMonth = (monthDate) => {
    const year = monthDate.getFullYear()
    const month = monthDate.getMonth()
    const days = getMonthDays(year, month)

    return (
      <div className="calendar-month">

        <div className="calendar-month-title">
          {MONTHS[month]} {year}
        </div>

        <div className="calendar-weekdays">
          {WEEKDAYS.map((weekday) => (
            <div
              key={weekday}
              className="calendar-weekday"
            >
              {weekday}
            </div>
          ))}
        </div>

        <div className="calendar-days">
          {days.map((date, index) => (
            <button
              key={`${month}-${index}`}
              type="button"
              className={[
                'calendar-day',
                !date ? 'empty' : '',
                isSelected(date) ? 'selected' : '',
                isInRange(date) ? 'in-range' : '',
              ].join(' ')}
              disabled={
                !date ||
                (
                  selecting === 'checkout' &&
                  checkIn &&
                  toDateString(date) < checkIn
                )
              }
              onClick={() => handleDayClick(date)}
            >
              {date ? date.getDate() : ''}
            </button>
          ))}
        </div>

      </div>
    )
  }

  useEffect(() => {
  const handleOutsideClick = (event) => {
    if (!event.target.closest('.date-picker')) {
      onClose?.()
    }
  }

  document.addEventListener('mousedown', handleOutsideClick)

  return () => {
    document.removeEventListener('mousedown', handleOutsideClick)
  }
}, [onClose])

  return (
    <div className="date-picker-overlay">
      <div className="date-picker">

        <div className="date-picker-header">

          <button
            type="button"
            className="calendar-nav-button"
            onClick={goPreviousMonth}
          >
            ←
          </button>

          <div className="date-picker-tabs">
            <button
              type="button"
              className="date-picker-tab active"
            >
              Дати
            </button>

            <button
              type="button"
              className="date-picker-tab"
            >
              Місяці
            </button>

            <button
              type="button"
              className="date-picker-tab"
            >
              Гнучкі правила
            </button>
          </div>

          <button
            type="button"
            className="calendar-nav-button"
            onClick={goNextMonth}
          >
            →
          </button>

        </div>


        <div className="date-picker-flexible">
            <button
                type="button"
                className={`flexible-button ${flexibleDays === 0 ? 'active' : ''}`}
                onClick={() => handleFlexibleChange(0)}
            >
                Точні дати
            </button>

            <button
                type="button"
                className={`flexible-button ${flexibleDays === 1 ? 'active' : ''}`}
                onClick={() => handleFlexibleChange(1)}
            >
                +/- 1 день
            </button>

            <button
                type="button"
                className={`flexible-button ${flexibleDays === 2 ? 'active' : ''}`}
                onClick={() => handleFlexibleChange(2)}
            >
                +/- 2 дні
            </button>

            <button
                type="button"
                className={`flexible-button ${flexibleDays === 3 ? 'active' : ''}`}
                onClick={() => handleFlexibleChange(3)}
            >
                +/- 3 дні
            </button>

            <button
                type="button"
                className={`flexible-button ${flexibleDays === 7 ? 'active' : ''}`}
                onClick={() => handleFlexibleChange(7)}
            >
                +/- 7 днів
            </button>
        </div>


        <div className="date-picker-months">
          {renderMonth(currentMonth)}
          {renderMonth(secondMonth)}
        </div>

      </div>
    </div>
  )
}

export default DatePicker