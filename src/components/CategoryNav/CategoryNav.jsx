import './CategoryNav.css'
import { categories } from '../../data/categories'

import filterIcon from '../../assets/filter-icon.svg'
import arrowIcon from '../../assets/arrow-icon.svg'

function CategoryNav({
  selectedCategory,
  onCategoryChange,
  isCollapsed,
  onToggleCollapse,
  isTotalPrice,
  onTotalPriceChange,
}) {
  return (
    <nav className="category-nav">

      <div
        className={`category-list ${
          isCollapsed ? 'collapsed' : ''
        }`}
      >
        {categories.map((category) => {
          const isSelected =
            selectedCategory?.id === category.id

          return (
            <button
              key={category.id}
              type="button"
              className={`category-item ${
                isSelected ? 'selected' : ''
              }`}
              onClick={() => onCategoryChange(category)}
            >
              <span className="category-icon">
                <img
                  src={category.icon}
                  alt=""
                />
              </span>

              <span className="category-name">
                {category.name}
              </span>
            </button>
          )
        })}
      </div>

      <button
        type="button"
        className={`category-arrow ${
          isCollapsed ? 'collapsed' : ''
        }`}
        onClick={onToggleCollapse}
      >
        <img
          src={arrowIcon}
          alt=""
        />
      </button>

      <button
        type="button"
        className="filters-button"
      >
        <span>Фільтри</span>

        <img
          src={filterIcon}
          alt=""
        />
      </button>

      <div className="tax-toggle">
        <span>
          Загальна сума до оподаткування
        </span>

        <button
          type="button"
          className={`toggle ${
            isTotalPrice ? 'active' : ''
          }`}
          onClick={() => {
            console.log('TOGGLE CLICK', isTotalPrice)
            onTotalPriceChange?.(!isTotalPrice)
          }}
        >
          <span />
        </button>
      </div>

    </nav>
  )
}

export default CategoryNav