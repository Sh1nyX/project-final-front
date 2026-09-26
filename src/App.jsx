import { useEffect, useState } from 'react'
import { Routes, Route } from 'react-router-dom'

import Header from './components/Header/Header'
import ListingGrid from './components/ListingGrid/ListingGrid'
import ContinueCategory from './components/ContinueCategory/ContinueCategory'
import Footer from './components/Footer/Footer'
import SearchResultsPage from './components/SearchResultsPage/SearchResultsPage'
import ListingPage from './components/ListingPage/ListingPage'
import ProfilePage from './components/ProfilePage/ProfilePage'
import ListingsMapModal from './components/ListingsMapModal/ListingsMapModal'

import { getListings } from './services/api'

function getNights(checkIn, checkOut) {
  if (!checkIn || !checkOut) {
    return 0
  }

  const [fromYear, fromMonth, fromDay] = checkIn
    .split('-')
    .map(Number)

  const [toYear, toMonth, toDay] = checkOut
    .split('-')
    .map(Number)

  const from = Date.UTC(
    fromYear,
    fromMonth - 1,
    fromDay
  )

  const to = Date.UTC(
    toYear,
    toMonth - 1,
    toDay
  )

  const difference = to - from

  return Math.max(
    0,
    Math.round(difference / (1000 * 60 * 60 * 24))
  )
}

function HomePage() {

  const [listings, setListings] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [isMapOpen, setIsMapOpen] = useState(false)

  const [visibleCount, setVisibleCount] = useState(18)
  const [isTotalPrice, setIsTotalPrice] = useState(false)

  const [searchDates, setSearchDates] = useState({
    check_in: '',
    check_out: '',
    flexible_days: 0,
    category_id: 1,
    guests: 0,
  })

  const nights = getNights(
  searchDates.check_in,
  searchDates.check_out
)

  const [selectedCategory, setSelectedCategory] = useState({
    id: 1,
    name: 'Гарні краєвиди',
  })

  const handleCategoryChange = (category) => {
    setSelectedCategory(category)

    setSearchDates((prev) => ({
      ...prev,
      category_id: category.id,
    }))
  }

  useEffect(() => {
    const loadListings = async () => {
      setLoading(true)
      setError(null)

      try {
        const data = await getListings({
          check_in: searchDates.check_in,
          check_out: searchDates.check_out,
          flexible_days: searchDates.flexible_days,
          category_id: searchDates.category_id,
          guests: searchDates.guests,
          limit: 100,
          page: 1,
        })

        console.log('SEARCH DATES:', searchDates)
        console.log('RESULTS:', data)

        setListings(data.listings)
        setVisibleCount(18)
      } catch (error) {
        console.error(error)
        setError('Не вдалося завантажити оголошення')
      } finally {
        setLoading(false)
      }
    }

    loadListings()
  }, [searchDates])

  const handleShowMore = () => {
    setVisibleCount(listings.length)
  }

  const hasMoreListings = visibleCount < listings.length

  return (
    <>
      <Header
        onDatesChange={setSearchDates}
        selectedCategory={selectedCategory}
        onCategoryChange={handleCategoryChange}
        isTotalPrice={isTotalPrice}
        onTotalPriceChange={setIsTotalPrice}
        onMapOpen={() => setIsMapOpen(true)}
      />

      <ListingsMapModal
        isOpen={isMapOpen}
        onClose={() => setIsMapOpen(false)}
      />

      <main>

        {loading && (
          <p>Завантаження...</p>
        )}

        {error && (
          <p>{error}</p>
        )}

        {!loading && !error && (
          <>
            <ListingGrid
              listings={listings}
              visibleCount={visibleCount}
              isTotalPrice={isTotalPrice}
              nights={nights}
            />

            <ContinueCategory
              categoryName={selectedCategory.name}
              onShowMore={handleShowMore}
              hasMore={hasMoreListings}
            />
          </>
        )}

      </main>

      <Footer />
    </>
  )
}





function App() {
  return (
    <Routes>
      <Route
        path="/"
        element={<HomePage />}
      />

      <Route
        path="/search"
        element={<SearchResultsPage />}
      />

      <Route
        path="/listing/:id"
        element={<ListingPage />}
      />

      <Route 
        path="/profile" 
        element={<ProfilePage />} 
      />
    </Routes>

    
  )
}

export default App
