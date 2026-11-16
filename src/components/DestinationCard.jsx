// DestinationCard: a reusable component that displays ONE destination.
// All data comes in through props, so the same component works for every destination.
// Props:
//   id, placeName, cityName, entryFee - the destination details
//   onDelete - function from App.jsx that removes this destination
function DestinationCard({ id, placeName, cityName, entryFee, onDelete }) {
  // Show "Free" when the entry fee is 0, otherwise show the amount in rupees
  const feeLabel = entryFee === 0 ? 'Free entry' : `₹${entryFee.toLocaleString('en-IN')}`

  return (
    <article className="destination-card">
      <div className="card-banner" aria-hidden="true">
        <span className="card-initial">{placeName.charAt(0).toUpperCase()}</span>
      </div>

      <div className="card-body">
        <h3 className="card-title">{placeName}</h3>

        <p className="card-city">
          <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M12 21s-7-6.1-7-11.5A7 7 0 0 1 19 9.5C19 14.9 12 21 12 21z" />
            <circle cx="12" cy="9.5" r="2.5" />
          </svg>
          {cityName}
        </p>

        <div className="card-footer">
          <div>
            <span className="fee-label">Entry Fee</span>
            <span className="fee-value">{feeLabel}</span>
          </div>

          {/* Pass this card's id back up to App.jsx when Delete is clicked */}
          <button
            type="button"
            className="btn-delete"
            onClick={() => onDelete(id)}
            aria-label={`Delete ${placeName}`}
          >
            Delete
          </button>
        </div>
      </div>
    </article>
  )
}

export default DestinationCard
