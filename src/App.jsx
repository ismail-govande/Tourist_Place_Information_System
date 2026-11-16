import { useState } from 'react'
import DestinationForm from './components/DestinationForm.jsx'
import DestinationCard from './components/DestinationCard.jsx'
import './App.css'

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

  return (
    <div className="app">
      <header className="navbar">
        <div className="navbar-inner">
          <div className="brand">
            <span className="brand-logo" aria-hidden="true">
              <PinIcon />
            </span>
            <span className="brand-name">Wanderlust Travels</span>
          </div>
          <span className="navbar-tag">Travel Agency Dashboard</span>
        </div>
      </header>

      <main className="container">
        <section className="hero">
          <p className="hero-eyebrow">Destination Manager</p>
          <h1>Tourist Place Information System</h1>
          <p className="hero-description">
            Maintain information about the tourist destinations offered by the agency.
            Add new places with their city and entry fee, and remove the ones you no longer offer.
          </p>
        </section>

        <div className="layout">
          {/* Props: we pass the add handler function down to the form */}
          <DestinationForm onAddDestination={handleAddDestination} />

          <section className="destinations-panel" aria-labelledby="destinations-heading">
            <div className="panel-header">
              <h2 id="destinations-heading">All Destinations</h2>
              <span className="count-badge">
                {destinations.length} {destinations.length === 1 ? 'place' : 'places'}
              </span>
            </div>

            {/* Conditional rendering: show the empty state OR the grid of cards */}
            {destinations.length === 0 ? (
              <div className="empty-state">
                <div className="empty-icon" aria-hidden="true">
                  <CompassIcon />
                </div>
                <h3>No destinations available</h3>
                <p>Use the form to add your first tourist destination.</p>
              </div>
            ) : (
              <div className="card-grid">
                {/* map(): turn each destination object into a DestinationCard.
                    The "key" prop helps React track each card in the list. */}
                {destinations.map((destination) => (
                  <DestinationCard
                    key={destination.id}
                    id={destination.id}
                    placeName={destination.placeName}
                    cityName={destination.cityName}
                    entryFee={destination.entryFee}
                    onDelete={handleDeleteDestination}
                  />
                ))}
              </div>
            )}
          </section>
        </div>
      </main>

      <footer className="footer">
        Tourist Place Information System · React JS Case Study
      </footer>
    </div>
  )
}

// Small inline SVG icons (no external icon library needed)
function PinIcon() {
  return (
    <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 21s-7-6.1-7-11.5A7 7 0 0 1 19 9.5C19 14.9 12 21 12 21z" />
      <circle cx="12" cy="9.5" r="2.5" />
    </svg>
  )
}

function CompassIcon() {
  return (
    <svg viewBox="0 0 24 24" width="36" height="36" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="9" />
      <path d="M15.5 8.5l-2 5-5 2 2-5 5-2z" />
    </svg>
  )
}

export default App
