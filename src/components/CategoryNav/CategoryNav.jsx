import './CategoryNav.css'

import viewsIcon from '../../assets/categories-icons/views-icon.svg'
import smallApartmentsIcon from '../../assets/categories-icons/small-apartments-icon.svg'
import hugeApartmentsIcon from '../../assets/categories-icons/huge-apartments-icon.svg'
import roomsIcon from '../../assets/categories-icons/rooms-icon.svg'
import hostelIcon from '../../assets/categories-icons/hostel-icon.svg'
import luxeIcon from '../../assets/categories-icons/luxe-icon.svg'
import centerIcon from '../../assets/categories-icons/center-icon.svg'
import villageIcon from '../../assets/categories-icons/village-icon.svg'
import fromDesignerIcon from '../../assets/categories-icons/from-designer-icon.svg'
import nearSeaIcon from '../../assets/categories-icons/near-sea-icon.svg'
import mansionIcon from '../../assets/categories-icons/mansion-icon.svg'
import legendaryIcon from '../../assets/categories-icons/legendary-icon.svg'

import filterIcon from '../../assets/filter-icon.svg'
import arrowIcon from '../../assets/arrow-icon.svg'

const categories = [
  { id: 1, name: 'Гарні краєвиди', icon: viewsIcon },
  { id: 2, name: 'Невеликі квартири', icon: smallApartmentsIcon },
  { id: 3, name: 'Великі квартири', icon: hugeApartmentsIcon },
  { id: 4, name: 'Кімнати', icon: roomsIcon },
  { id: 5, name: 'Хостели', icon: hostelIcon },
  { id: 6, name: 'Luxe', icon: luxeIcon },
  { id: 7, name: 'У центрі міста', icon: centerIcon },
  { id: 8, name: 'Сільська місцевість', icon: villageIcon },
  { id: 9, name: 'Від дизайнера', icon: fromDesignerIcon },
  { id: 10, name: 'Біля моря', icon: nearSeaIcon },
  { id: 11, name: 'Особняки', icon: mansionIcon },
  { id: 12, name: 'Легендарне', icon: legendaryIcon },
]

function CategoryNav({
  selectedCategory,
  onCategoryChange,
}) {
  return (
    <nav className="category-nav">

      <div className="category-list">
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
        className="category-arrow"
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
          className="toggle"
        >
          <span />
        </button>
      </div>

    </nav>
  )
}

export default CategoryNav