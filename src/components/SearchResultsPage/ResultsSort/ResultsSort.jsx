import { useState } from 'react'
import { useSearchParams } from 'react-router-dom'

import './ResultsSort.css'

const sortOptions = [
  {
    value: 'recommended',
    label: 'Рекомендовані',
  },
  {
    value: 'price_asc',
    label: 'Ціна: від найнижчої',
  },
  {
    value: 'price_desc',
    label: 'Ціна: від найвищої',
  },
]

function ResultsSort() {
  const [searchParams, setSearchParams] = useSearchParams()
  const [isOpen, setIsOpen] = useState(false)

  const currentSort =
    searchParams.get('sort') || 'recommended'

  const currentOption =
    sortOptions.find(
      (option) => option.value === currentSort
    ) || sortOptions[0]

  const handleSortChange = (value) => {
    const params = new URLSearchParams(searchParams)

    if (value === 'recommended') {
      params.delete('sort')
    } else {
      params.set('sort', value)
    }

    // При зміні сортування починаємо з першої сторінки
    params.delete('page')

    setSearchParams(params)
    setIsOpen(false)
  }

  return (
    <div className="results-sort-wrapper">

      <button
        type="button"
        className="results-sort"
        onClick={() => setIsOpen((current) => !current)}
      >
        <span>Сортувати:</span>

        <strong>
          {currentOption.label}
        </strong>

        <span
          className={`results-sort-arrow ${
            isOpen ? 'open' : ''
          }`}
        >
          ↓
        </span>
      </button>

      {isOpen && (
        <div className="results-sort-menu">
          {sortOptions.map((option) => (
            <button
              key={option.value}
              type="button"
              className={`results-sort-option ${
                option.value === currentSort
                  ? 'active'
                  : ''
              }`}
              onClick={() =>
                handleSortChange(option.value)
              }
            >
              {option.label}
            </button>
          ))}
        </div>
      )}

    </div>
  )
}

export default ResultsSort