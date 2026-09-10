import './ContinueCategory.css'

function ContinueCategory({ onShowMore, hasMore }) {
  if (!hasMore) {
    return null
  }

  return (
    <section className="continue-category">

      <h2>
        Продовжити огляд категорії “Біля моря”
      </h2>

      <button onClick={onShowMore}>
        Показати більше
      </button>

    </section>
  )
}

export default ContinueCategory