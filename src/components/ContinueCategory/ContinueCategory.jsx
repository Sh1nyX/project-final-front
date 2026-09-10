import './ContinueCategory.css'

function ContinueCategory({
  categoryName,
  onShowMore,
  hasMore,
}) {
  return (
    <section className="continue-category">
      <h2>
        Продовжити огляд категорії “{categoryName}”
      </h2>

      {hasMore && (
        <button
          type="button"
          onClick={onShowMore}
        >
          Показати більше
        </button>
      )}
    </section>
  )
}

export default ContinueCategory