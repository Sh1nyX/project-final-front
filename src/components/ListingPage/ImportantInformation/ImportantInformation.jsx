import './ImportantInformation.css'

function ImportantInformation({ listing }) {
  const rules =
    listing.rules && typeof listing.rules === 'object'
      ? listing.rules
      : {}

  const houseRules = Array.isArray(rules.house)
    ? rules.house
    : []

  const safetyRules = Array.isArray(rules.safety)
    ? rules.safety
    : []

  const cancellation =
    rules.cancellation && typeof rules.cancellation === 'object'
      ? rules.cancellation
      : {}

  return (
    <section className="important-information">
      <h2>Важлива інформація</h2>

      <div className="important-information-grid">

        <div className="important-information-column">
          <h3>Правила дому</h3>

          {houseRules.length > 0 ? (
            houseRules.map((rule, index) => (
              <p key={index}>{rule}</p>
            ))
          ) : (
            <p>Спеціальних правил дому не вказано.</p>
          )}
        </div>

        <div className="important-information-column">
          <h3>Правила безпеки в помешканні</h3>

          {safetyRules.length > 0 ? (
            safetyRules.map((rule, index) => (
              <p key={index}>{rule}</p>
            ))
          ) : (
            <p>Інформація про безпеку не вказана.</p>
          )}
        </div>

        <div className="important-information-column">
          <h3>Правила скасування бронювання</h3>

          {cancellation.summary && (
            <p>{cancellation.summary}</p>
          )}

          {cancellation.details && (
            <p className="important-information-cancellation">
              {cancellation.details}
            </p>
          )}
        </div>

      </div>
    </section>
  )
}

export default ImportantInformation