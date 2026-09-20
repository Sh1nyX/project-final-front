import './SearchBar.css'

import searchIcon from '../../assets/search-icon.svg'
import separatorIcon from '../../assets/separator.svg'

function SearchBar({
  compact = false,
  checkIn,
  checkOut,
  onSearch,
  onDateClick,
  activeDateField,
  onDestinationClick,
  isRegionPickerOpen,
  selectedRegion,
  onGuestsClick,
  guestCount,
  isGuestPickerOpen,
}) {
  return (
    <div className={compact ? 'compact-search-row' : 'search-row'}>
      <div className={compact ? 'compact-search-bar' : 'search-bar'}>

        <div
          className={`search-field destination ${
            isRegionPickerOpen ? 'destination-selected' : ''
          }`}
          onClick={onDestinationClick}
        >
          <span className="field-title">
            {compact ? 'Будь-куди' : 'Куди'}
          </span>

          {!compact && (
            <span className="field-placeholder">
              {selectedRegion?.name || 'Пошук напрямку'}
            </span>
          )}
        </div>

        <img
          className="search-separator"
          src={separatorIcon}
          alt=""
        />

        <div
          className={`search-field date-field ${
            activeDateField === 'checkin'
              ? 'date-field-selected'
              : ''
          }`}
        >
          <span className="field-title">
            Прибуття
          </span>

          <button
            type="button"
            className="date-input-button"
            onClick={() => onDateClick('checkin')}
          >
            {checkIn || 'Додайте дати'}
          </button>
        </div>

        {!compact && (
          <>
            <img
              className="search-separator"
              src={separatorIcon}
              alt=""
            />

            <div
              className={`search-field date-field ${
                activeDateField === 'checkout'
                  ? 'date-field-selected'
                  : ''
              }`}
            >
              <span className="field-title">
                Виїзд
              </span>

              <button
                type="button"
                className="date-input-button"
                onClick={() => onDateClick('checkout')}
              >
                {checkOut || 'Додайте дати'}
              </button>
            </div>
          </>
        )}

        <img
          className="search-separator"
          src={separatorIcon}
          alt=""
        />

        <div
          className={`search-field guests ${
            isGuestPickerOpen ? 'guests-selected' : ''
          }`}
          onClick={onGuestsClick}
        >
          <span className="field-title">
            {compact ? 'Додайте гостей' : 'Хто'}
          </span>

          <span className="field-placeholder">
            {guestCount > 0
              ? `${guestCount} ${
                  guestCount === 1 ? 'гість' : 'гостей'
                }`
              : 'Додайте гостей'}
          </span>
        </div>

        <button
          type="button"
          className="search-button"
          onClick={onSearch}
        >
          <img src={searchIcon} alt="" />
        </button>

      </div>
    </div>
  )
}

export default SearchBar