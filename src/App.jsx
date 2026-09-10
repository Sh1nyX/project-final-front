import { useEffect, useState } from 'react'

import Header from './components/Header/Header'
import ListingGrid from './components/ListingGrid/ListingGrid'
import ContinueCategory from './components/ContinueCategory/ContinueCategory'
import Footer from './components/Footer/Footer'

import { getListings } from './services/api'


function App() {

  const [listings, setListings] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const [visibleCount, setVisibleCount] = useState(18)

  const [searchDates, setSearchDates] = useState({
    check_in: '',
    check_out: '',
    flexible_days: 0,
    category_id: 1,
  })

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

    try {

      const data = await getListings({
        check_in: searchDates.check_in,
        check_out: searchDates.check_out,
        flexible_days: searchDates.flexible_days,
        category_id: searchDates.category_id,
        limit: 100,
        page: 1,
      })

      

      console.log('SEARCH DATES:', searchDates)
      console.log('RESULTS:', data)

      setListings(data)

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

export default App