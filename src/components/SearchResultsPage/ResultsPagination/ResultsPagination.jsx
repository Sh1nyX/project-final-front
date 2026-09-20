import './ResultsPagination.css'

function ResultsPagination({
  currentPage,
  totalPages,
  onPageChange,
}) {
  if (totalPages <= 1) {
    return null
  }

  const pages = []

  const start = Math.max(1, currentPage - 2)
  const end = Math.min(totalPages, start + 4)

  for (let page = start; page <= end; page += 1) {
    pages.push(page)
  }

  return (
    <div className="results-pagination">

      <button
        type="button"
        className="pagination-arrow"
        disabled={currentPage === 1}
        onClick={() => onPageChange(currentPage - 1)}
      >
        ←
      </button>

      {pages.map((page) => (
        <button
          key={page}
          type="button"
          className={`pagination-page ${
            page === currentPage ? 'active' : ''
          }`}
          onClick={() => onPageChange(page)}
        >
          {page}
        </button>
      ))}

      <button
        type="button"
        className="pagination-arrow"
        disabled={currentPage === totalPages}
        onClick={() => onPageChange(currentPage + 1)}
      >
        →
      </button>

    </div>
  )
}

export default ResultsPagination