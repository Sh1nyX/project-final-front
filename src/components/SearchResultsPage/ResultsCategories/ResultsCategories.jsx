import './ResultsCategories.css'
import { useSearchParams } from 'react-router-dom'

import { categories } from '../../../data/categories'
import removeIcon from '../../../assets/searchpageicons/remove-icon.svg'

function ResultsCategories() {
  const [searchParams, setSearchParams] = useSearchParams()

  const selectedCategoryIds = searchParams.get('category_id')
    ? searchParams
        .get('category_id')
        .split(',')
        .map(Number)
        .filter(Boolean)
    : []

  const handleCategoryChange = (categoryId) => {
    const params = new URLSearchParams(searchParams)

    const isSelected = selectedCategoryIds.includes(categoryId)

    let nextCategoryIds

    if (isSelected) {
      nextCategoryIds = selectedCategoryIds.filter(
        (id) => id !== categoryId
      )
    } else {
      nextCategoryIds = [
        ...selectedCategoryIds,
        categoryId,
      ]
    }

    if (nextCategoryIds.length > 0) {
      params.set(
        'category_id',
        nextCategoryIds.join(',')
      )
    } else {
      params.delete('category_id')
    }

    setSearchParams(params)
  }

  return (
    <section className="results-categories">
      <div className="results-categories-list">

        {categories.map((category) => {
          const isSelected =
            selectedCategoryIds.includes(category.id)

          return (
            <button
              key={category.id}
              type="button"
              className={`results-category ${
                isSelected ? 'active' : ''
              }`}
              onClick={() =>
                handleCategoryChange(category.id)
              }
            >
              {isSelected ? (
                <img
                  className="results-category-remove-icon"
                  src={removeIcon}
                  alt=""
                />
              ) : (
                <img
                  className="results-category-icon"
                  src={category.icon}
                  alt=""
                />
              )}

              <span className="results-category-name">
                {category.name}
              </span>
            </button>
          )
        })}

      </div>
    </section>
  )
}

export default ResultsCategories