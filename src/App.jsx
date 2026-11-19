import { useState } from 'react'
import DestinationForm from './components/DestinationForm.jsx'
import DestinationCard from './components/DestinationCard.jsx'
import './App.css'

// Turns 3 into "03" for the small editorial counters
function twoDigits(number) {
  return String(number).padStart(2, '0')
}

function App() {
  // useState: the list of destination records. It starts empty (no destinations).
  const [destinations, setDestinations] = useState([])

  // Add Destination: called by DestinationForm (passed down as a prop).
  // We create a NEW array with the spread operator instead of changing the old one
  // (immutable update), so React knows the state changed and re-renders.
  function handleAddDestination(newDestination) {
    const destinationWithId = { ...newDestination, id: Date.now() }
    setDestinations([...destinations, destinationWithId])
  }

  // Delete Destination: called by DestinationCard (passed down as a prop).
  // filter() returns a new array that keeps every destination except the selected one.
  function handleDeleteDestination(idToDelete) {
    setDestinations(destinations.filter((destination) => destination.id !== idToDelete))
  }

  const count = destinations.length
  const countLabel = `${twoDigits(count)} ${count === 1 ? 'destination' : 'destinations'}`

  return (
    <div className="app">
      {/* Landscape photograph with a forest-green overlay (decorative background) */}
      <div className="scenery" aria-hidden="true" />

      {/* ---------- Navigation ---------- */}
      <header className="nav">
        <div className="container nav-inner">
          <div className="brand">
            <BrandMark />
            <span className="brand-word">Wanderlust</span>
            <span className="nav-divider" aria-hidden="true" />
            <span className="brand-sub">Destination Studio</span>
          </div>
          <p className="nav-count" aria-live="polite">{countLabel}</p>
        </div>
      </header>

      {/* ---------- Editorial hero ---------- */}
      <section className="hero container" aria-labelledby="hero-title">
        <div className="hero-main">
          <p className="eyebrow">Destination Studio / Travel Collection</p>
          <h1 id="hero-title" className="hero-title">
            A world of places,
            <br />
            <em>waiting to be discovered.</em>
          </h1>
        </div>
        <p className="hero-text">
          A thoughtfully curated collection of destinations, places and experiences.
        </p>
      </section>

      {/* ---------- Workspace: form (left) + collection (right) ---------- */}
      <main className="workspace container">
        <section className="panel panel-form" aria-labelledby="form-heading">
          <div className="panel-head">
            <p className="panel-label">01 — New entry</p>
            <h2 id="form-heading" className="panel-title">Add a destination</h2>
          </div>
          {/* Props: we pass the add handler function down to the form */}
          <DestinationForm onAddDestination={handleAddDestination} />
        </section>

        <section className="panel panel-collection" aria-labelledby="collection-heading">
          <div className="panel-head panel-head-row">
            <div>
              <p className="panel-label">02 — Collection</p>
              <h2 id="collection-heading" className="panel-title">Your destinations</h2>
            </div>
            <span className="count-badge">{countLabel}</span>
          </div>

          {/* Conditional rendering: show the empty state OR the list of cards */}
          {destinations.length === 0 ? (
            <div className="empty-state">
              <RouteMark />
              <h3 className="empty-title">No destinations yet.</h3>
              <p className="empty-text">Add a place to begin building your collection.</p>
            </div>
          ) : (
            <div className="card-list">
              {/* map(): turn each destination object into a DestinationCard.
                  The "key" prop helps React track each card in the list. */}
              {destinations.map((destination, index) => (
                <DestinationCard
                  key={destination.id}
                  id={destination.id}
                  number={index + 1}
                  placeName={destination.placeName}
                  cityName={destination.cityName}
                  entryFee={destination.entryFee}
                  onDelete={handleDeleteDestination}
                />
              ))}
            </div>
          )}
        </section>
      </main>

      <footer className="footer container">
        <span>Wanderlust — Destination Studio</span>
        <span>Tourist Place Information System · React JS</span>
      </footer>
    </div>
  )
}

// Small location-inspired symbol for the wordmark (inline SVG, no icon library)
function BrandMark() {
  return (
    <svg className="brand-mark" viewBox="0 0 20 20" width="16" height="16" aria-hidden="true">
      <path d="M10 1.5 17 10l-7 8.5L3 10Z" fill="none" stroke="currentColor" strokeWidth="1.1" />
      <circle cx="10" cy="10" r="1.8" fill="currentColor" />
    </svg>
  )
}

// Restrained detail for the empty state: a short dotted route ending in a point
function RouteMark() {
  return (
    <svg className="route-mark" viewBox="0 0 120 24" aria-hidden="true">
      <circle cx="6" cy="16" r="3" fill="none" stroke="currentColor" strokeWidth="1" />
      <path d="M12 15 C 40 4, 70 26, 104 10" fill="none" stroke="currentColor" strokeWidth="1" strokeDasharray="1.5 4.5" strokeLinecap="round" />
      <circle cx="112" cy="8" r="2.5" fill="currentColor" />
    </svg>
  )
}

export default App
