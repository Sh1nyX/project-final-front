import { useEffect, useState } from 'react'

import Header from './components/Header/Header'
import ListingGrid from './components/ListingGrid/ListingGrid'

import { getListings } from './services/api'

function App() {
  const [listings, setListings] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const loadListings = async () => {
      try {
        const data = await getListings()

        setListings(data)
      } catch (error) {
        console.error(error)
        setError('Не вдалося завантажити оголошення')
      } finally {
        setLoading(false)
      }
    }

    loadListings()
  }, [])

  return (
    <>
      <Header />

      <main>

        {loading && (
          <p>Завантаження...</p>
        )}

        {error && (
          <p>{error}</p>
        )}

        {!loading && !error && (
          <ListingGrid listings={listings} />
        )}

      </main>
    </>
  )
}

export default App