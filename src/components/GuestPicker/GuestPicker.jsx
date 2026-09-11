import { useEffect } from 'react'
import './GuestPicker.css'

function GuestPicker({
  adults,
  children,
  infants,
  pets,
  onAdultsChange,
  onChildrenChange,
  onInfantsChange,
  onPetsChange,
  onClose,
}) {
  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (!event.target.closest('.guest-picker')) {
        onClose?.()
      }
    }

    document.addEventListener('mousedown', handleOutsideClick)

    return () => {
      document.removeEventListener('mousedown', handleOutsideClick)
    }
  }, [onClose])

  const guestRows = [
    {
      key: 'adults',
      title: 'Дорослі',
      description: 'Вік від 13 років',
      value: adults,
      onDecrease: () => onAdultsChange(Math.max(0, adults - 1)),
      onIncrease: () => onAdultsChange(adults + 1),
    },
    {
      key: 'children',
      title: 'Діти',
      description: 'Вік від 2 до 12 років',
      value: children,
      onDecrease: () => onChildrenChange(Math.max(0, children - 1)),
      onIncrease: () => onChildrenChange(children + 1),
    },
    {
      key: 'infants',
      title: 'Малюки',
      description: 'До 2 років',
      value: infants,
      onDecrease: () => onInfantsChange(Math.max(0, infants - 1)),
      onIncrease: () => onInfantsChange(infants + 1),
    },
    {
      key: 'pets',
      title: 'Домашні тварини',
      description: '',
      value: pets,
      onDecrease: () => onPetsChange(Math.max(0, pets - 1)),
      onIncrease: () => onPetsChange(pets + 1),
    },
  ]

  return (
    <div className="guest-picker-overlay">
      <div className="guest-picker">

        {guestRows.map((row) => (
          <div
            key={row.key}
            className="guest-row"
          >
            <div className="guest-row-info">
              <div className="guest-row-title">
                {row.title}
              </div>

              {row.description && (
                <div className="guest-row-description">
                  {row.description}
                </div>
              )}
            </div>

            <div className="guest-counter">
              <button
                type="button"
                className="guest-counter-button"
                onClick={row.onDecrease}
                disabled={row.value === 0}
              >
                −
              </button>

              <span className="guest-count">
                {row.value}
              </span>

              <button
                type="button"
                className="guest-counter-button"
                onClick={row.onIncrease}
              >
                +
              </button>
            </div>
          </div>
        ))}

      </div>
    </div>
  )
}

export default GuestPicker