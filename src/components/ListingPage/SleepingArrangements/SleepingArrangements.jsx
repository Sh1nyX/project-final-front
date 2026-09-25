import './SleepingArrangements.css'

function SleepingArrangements({ listing }) {
  const images = listing.images || []

  const bedroomImage =
    images[1] || images[0]

  return (
    <section className="sleeping-arrangements">

      <h2>
        Місце для сну
      </h2>

      <div className="sleeping-card">

        {bedroomImage && (
          <img
            src={bedroomImage}
            alt="Спальня"
            className="sleeping-image"
          />
        )}

        <h3>
          Спальня
        </h3>

        <p>
          {listing.beds || 0} ліжка
        </p>

      </div>

    </section>
  )
}

export default SleepingArrangements