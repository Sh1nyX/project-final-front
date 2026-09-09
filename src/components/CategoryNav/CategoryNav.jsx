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
  {
    name: 'Гарні краєвиди',
    icon: viewsIcon,
  },
  {
    name: 'Невеликі квартири',
    icon: smallApartmentsIcon,
  },
  {
    name: 'Великі квартири',
    icon: hugeApartmentsIcon,
  },
  {
    name: 'Кімнати',
    icon: roomsIcon,
  },
  {
    name: 'Хостели',
    icon: hostelIcon,
  },
  {
    name: 'Luxe',
    icon: luxeIcon,
    className: 'luxe',
  },
  {
    name: 'У центрі міста',
    icon: centerIcon,
  },
  {
    name: 'Сільська місцевість',
    icon: villageIcon,
  },
  {
    name: 'Від дизайнера',
    icon: fromDesignerIcon,
  },
  {
    name: 'Біля моря',
    icon: nearSeaIcon,
  },
  {
    name: 'Особняки',
    icon: mansionIcon,
  },
  {
    name: 'Легендарне',
    icon: legendaryIcon,
  },
]

function CategoryNav() {
  return (
    <div className="category-nav">

      <div className="category-list">

        {categories.map((category) => (
          <button
            className={`category-item ${category.className || ''}`}
            key={category.name}
          >
            <div className="category-icon">
              {category.icon && (
                <img src={category.icon} alt="" />
              )}
            </div>

            <span>{category.name}</span>
          </button>
        ))}

      </div>


    <button className="category-arrow">
        <img src={arrowIcon} alt="" />
    </button>


      <button className="filters-button">
        <img src={filterIcon} alt="" />
        <span>Фільтри</span>
    </button>


      <div className="tax-toggle">

        <span>
          Загальна сума до оподаткування
        </span>

        <button className="toggle">
          <span />
        </button>

      </div>

    </div>
  )
}

export default CategoryNav