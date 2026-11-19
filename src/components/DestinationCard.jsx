import { useState } from 'react'

// DestinationCard: a reusable component that displays ONE destination.
// All data comes in through props, so the same component works for every destination.
// Props:
//   id, placeName, cityName, entryFee - the destination details
//   number   - position in the collection (1, 2, 3 ...)
//   onDelete - function from App.jsx that removes this destination
function DestinationCard({ id, number, placeName, cityName, entryFee, onDelete }) {
  // Local state: true while the card plays its short "leaving" animation
  const [isLeaving, setIsLeaving] = useState(false)

  // Show "Free entry" when the entry fee is 0, otherwise show the amount in rupees
  const feeLabel = entryFee === 0 ? 'Free entry' : `₹${entryFee.toLocaleString('en-IN')}`

  // When the leave animation finishes, ask App.jsx to remove this destination
  function handleAnimationEnd(event) {
    if (event.animationName === 'card-leave') {
      onDelete(id)
    }
  }

  return (
    <article
      className={`destination-card ${isLeaving ? 'is-leaving' : ''}`}
      onAnimationEnd={handleAnimationEnd}
    >
      <span className="card-no">{String(number).padStart(2, '0')}</span>

      <div className="card-place">
        <h3 className="card-title">{placeName}</h3>
        <p className="card-city">{cityName}</p>
      </div>

      <div className="card-fee">
        <span className="fee-label">Entry fee</span>
        <span className="fee-value">{feeLabel}</span>
      </div>

      {/* Start the leave animation; onAnimationEnd above then calls onDelete(id) */}
      <button
        type="button"
        className="btn-delete"
        onClick={() => setIsLeaving(true)}
        disabled={isLeaving}
        aria-label={`Delete ${placeName}`}
      >
        Delete
      </button>
    </article>
  )
}

export default DestinationCard
