import { useSearchParams } from 'react-router-dom'

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

function SearchResultsPage() {
  const [searchParams] = useSearchParams()

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

      <ResultsHeader />

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