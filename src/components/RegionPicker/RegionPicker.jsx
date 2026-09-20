import { useEffect } from 'react'
import './RegionPicker.css'
import { regions } from '../../data/regions'

function RegionPicker({
  selectedRegion,
  onRegionChange,
  onClose,
}) {
  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (!event.target.closest('.region-picker')) {
        onClose?.()
      }
    }

    document.addEventListener('mousedown', handleOutsideClick)

    return () => {
      document.removeEventListener('mousedown', handleOutsideClick)
    }
  }, [onClose])

  const handleRegionClick = (region) => {
    onRegionChange(region)
    onClose?.()
  }

  return (
    <div className="region-picker-overlay">
      <div className="region-picker">

        <h2 className="region-picker-title">
          Пошук за регіонами
        </h2>

        <div className="region-grid">
          {regions.map((region) => {
            const isSelected =
              selectedRegion?.id === region.id

            return (
              <button
                key={region.id}
                type="button"
                className={`region-card ${
                  isSelected ? 'selected' : ''
                }`}
                onClick={() => handleRegionClick(region)}
              >
                <img
                  src={region.image}
                  alt=""
                  className="region-card-image"
                />

                <span className="region-card-name">
                  {region.name}
                </span>
              </button>
            )
          })}
        </div>

      </div>
    </div>
  )
}

export default RegionPicker