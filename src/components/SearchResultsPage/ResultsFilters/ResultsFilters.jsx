import { useState } from 'react'
import { useSearchParams } from 'react-router-dom'

import './ResultsFilters.css'

const priceOptions = [
  {
    id: 'under2500',
    label: 'До 2 500 ₴',
    min: '',
    max: '2500',
  },
  {
    id: '2500-4000',
    label: '2 500–4 000 ₴',
    min: '2500',
    max: '4000',
  },
  {
    id: 'over4000',
    label: 'Понад 4 000 ₴',
    min: '4000',
    max: '',
  },
]

const propertyTypes = [
  'Квартира',
  'Будинок',
  'Гостьовий будинок',
  'Студія',
]

const amenitiesList = [
  'Wi-Fi',
  'Кухня',
  'Кондиціонер',
  'Паркінг',
  'Пральна машина',
]

function ResultsFilters() {
  const [searchParams, setSearchParams] = useSearchParams()

  const [selectedPrice, setSelectedPrice] = useState(() => {
    const minPrice = searchParams.get('min_price')
    const maxPrice = searchParams.get('max_price')

    if (minPrice === '2500' && maxPrice === '4000') {
      return '2500-4000'
    }

    if (maxPrice === '2500') {
      return 'under2500'
    }

    if (minPrice === '4000') {
      return 'over4000'
    }

    return ''
  })

  const [selectedPropertyTypes, setSelectedPropertyTypes] = useState(() => {
    const value = searchParams.get('property_type')

    return value
      ? value.split(',').filter(Boolean)
      : []
  })

  const [minBedrooms, setMinBedrooms] = useState(
    searchParams.get('min_bedrooms') || ''
  )

  const [minBeds, setMinBeds] = useState(
    searchParams.get('min_beds') || ''
  )

  const [selectedAmenities, setSelectedAmenities] = useState(() => {
    const value = searchParams.get('amenities')

    return value
      ? value.split(',').filter(Boolean)
      : []
  })

  const handlePropertyTypeChange = (type) => {
    setSelectedPropertyTypes((current) => {
      if (current.includes(type)) {
        return current.filter((item) => item !== type)
      }

      return [...current, type]
    })
  }

  const handleAmenityChange = (amenity) => {
    setSelectedAmenities((current) => {
      if (current.includes(amenity)) {
        return current.filter((item) => item !== amenity)
      }

      return [...current, amenity]
    })
  }

  const handleApply = () => {
    const params = new URLSearchParams(searchParams)

    // PRICE
    const price = priceOptions.find(
      (item) => item.id === selectedPrice
    )

    if (price?.min) {
      params.set('min_price', price.min)
    } else {
      params.delete('min_price')
    }

    if (price?.max) {
      params.set('max_price', price.max)
    } else {
      params.delete('max_price')
    }

    if (selectedPropertyTypes.length > 0) {
      params.set(
        'property_type',
        selectedPropertyTypes.join(',')
      )
    } else {
      params.delete('property_type')
    }


    if (minBedrooms) {
      params.set('min_bedrooms', minBedrooms)
    } else {
      params.delete('min_bedrooms')
    }

    if (minBeds) {
      params.set('min_beds', minBeds)
    } else {
      params.delete('min_beds')
    }


    // AMENITIES
    if (selectedAmenities.length > 0) {
      params.set(
        'amenities',
        selectedAmenities.join(',')
      )
    } else {
      params.delete('amenities')
    }

    setSearchParams(params)
  }

  const handleClear = () => {
    setSelectedPrice('')
    setSelectedPropertyTypes([])
    setMinBedrooms('')
    setMinBeds('')
    setSelectedAmenities([])

    const params = new URLSearchParams(searchParams)

    params.delete('min_price')
    params.delete('max_price')
    params.delete('property_type')
    params.delete('min_bedrooms')
    params.delete('min_beds')
    params.delete('amenities')

    setSearchParams(params)
  }


  return (
    <aside className="results-filters">

      <div className="filters-header">
        <h2>Фільтри</h2>

        <button
          type="button"
          onClick={handleClear}
        >
          Очистити
        </button>
      </div>

      <div className="filter-group">
        <h3>Діапазон цін</h3>

        {priceOptions.map((option) => (
          <label key={option.id}>
            <input
              type="checkbox"
              checked={selectedPrice === option.id}
              onChange={() =>
                setSelectedPrice((current) =>
                  current === option.id
                    ? ''
                    : option.id
                )
              }
            />

            {option.label}
          </label>
        ))}
      </div>

      <div className="filter-group">
        <h3>Тип помешкання</h3>

        {propertyTypes.map((type) => (
          <label key={type}>
            <input
              type="checkbox"
              checked={selectedPropertyTypes.includes(type)}
              onChange={() =>
                handlePropertyTypeChange(type)
              }
            />

            {type}
          </label>
        ))}
      </div>

      <div className="filter-group">
        <h3>Кімнати й ліжка</h3>

        <label>
          <input
            type="checkbox"
            checked={minBedrooms === '1'}
            onChange={() =>
              setMinBedrooms((current) =>
                current === '1' ? '' : '1'
              )
            }
          />

          1+ кімната
        </label>

        <label>
          <input
            type="checkbox"
            checked={minBedrooms === '2'}
            onChange={() =>
              setMinBedrooms((current) =>
                current === '2' ? '' : '2'
              )
            }
          />

          2+ кімнати
        </label>

        <label>
          <input
            type="checkbox"
            checked={minBeds === '3'}
            onChange={() =>
              setMinBeds((current) =>
                current === '3' ? '' : '3'
              )
            }
          />

          3+ ліжка
        </label>
      </div>

      <div className="filter-group">
        <h3>Зручності</h3>

        {amenitiesList.map((amenity) => (
          <label key={amenity}>
            <input
              type="checkbox"
              checked={selectedAmenities.includes(amenity)}
              onChange={() =>
                handleAmenityChange(amenity)
              }
            />

            {amenity}
          </label>
        ))}
      </div>

      <button
        type="button"
        className="apply-filters-button"
        onClick={handleApply}
      >
        Показати варіанти
      </button>

    </aside>
  )
}

export default ResultsFilters