import { useSearchParams } from 'react-router-dom'
import { useState } from 'react'

import './SearchResultsPage.css'

import { categories } from '../../data/categories'

import ResultsHeader from './ResultsHeader/ResultsHeader'
import ResultsSearch from './ResultsSearch/ResultsSearch'
import ResultsCategories from './ResultsCategories/ResultsCategories'
import ResultsFilters from './ResultsFilters/ResultsFilters'
import ResultsGrid from './ResultsGrid/ResultsGrid'
import ResultsFooter from './ResultsFooter/ResultsFooter'
import ResultsPagination from './ResultsPagination/ResultsPagination'
import ResultsSort from './ResultsSort/ResultsSort'
import ListingsMapModal from '../ListingsMapModal/ListingsMapModal'

function SearchResultsPage() {
  const [searchParams] = useSearchParams()
  const [isMapOpen, setIsMapOpen] = useState(false)

  const mapSearchParams = {
  check_in: searchParams.get('check_in') || '',
  check_out: searchParams.get('check_out') || '',
  flexible_days: searchParams.get('flexible_days') || '',
  region: searchParams.get('region') || '',
  category_id: searchParams.get('category_id') || '',
  guests: searchParams.get('guests') || '',
  min_price: searchParams.get('min_price') || '',
  max_price: searchParams.get('max_price') || '',
  property_type: searchParams.get('property_type') || '',
  min_bedrooms: searchParams.get('min_bedrooms') || '',
  min_beds: searchParams.get('min_beds') || '',
  amenities: searchParams.get('amenities') || '',
  sort: searchParams.get('sort') || 'recommended',
}

  const selectedCategoryIds = searchParams.get('category_id')
    ? searchParams
        .get('category_id')
        .split(',')
        .map(Number)
        .filter(Boolean)
    : [1]

    const selectedCategories = categories.filter(
      (category) =>
        selectedCategoryIds.includes(category.id)
    )

    const categoryTitle =
      selectedCategories.length > 0
        ? selectedCategories.map(
            (category) => category.name
          ).join(', ')
        : 'Всі помешкання'

  return (
    <div className="search-results-page">

      <ResultsHeader
        onMapOpen={() => setIsMapOpen(true)}
      />

      <ListingsMapModal
        isOpen={isMapOpen}
        onClose={() => setIsMapOpen(false)}
        searchParams={mapSearchParams}
      />

      <ResultsSearch />

      <ResultsCategories />

      <main className="search-results-content">

        <div className="results-title-row">

          <div className="results-intro">

            <span className="results-overtitle">
              Помешкання в категорії
            </span>

            <h1 className="results-title">
              {categoryTitle}
            </h1>

          </div>

          <ResultsSort />

        </div>

        <div className="results-catalog">
          <ResultsFilters />
          <ResultsGrid />
        </div>

      </main>

      <ResultsFooter />

    </div>
  )
}

export default SearchResultsPage