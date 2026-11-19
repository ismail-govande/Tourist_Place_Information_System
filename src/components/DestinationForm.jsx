import { useState } from 'react'

// DestinationForm: collects Place Name, City Name and Entry Fee.
// Props:
//   onAddDestination - function from App.jsx that adds the new destination to state
function DestinationForm({ onAddDestination }) {
  // useState for each input (controlled inputs: React holds the current value)
  const [placeName, setPlaceName] = useState('')
  const [cityName, setCityName] = useState('')
  const [entryFee, setEntryFee] = useState('')

  // useState for validation error messages, e.g. { placeName: 'Place name is required' }
  const [errors, setErrors] = useState({})

  // Check the inputs and return an object of error messages (empty object = valid)
  function validate() {
    const newErrors = {}

    if (placeName.trim() === '') {
      newErrors.placeName = 'Place name is required.'
    }
    if (cityName.trim() === '') {
      newErrors.cityName = 'City name is required.'
    }

    const fee = Number(entryFee)
    if (entryFee.trim() === '') {
      newErrors.entryFee = 'Entry fee is required.'
    } else if (isNaN(fee) || fee < 0) {
      newErrors.entryFee = 'Entry fee must be a valid number of 0 or more.'
    }

    return newErrors
  }

  function handleSubmit(event) {
    // Stop the browser from reloading the page on form submit
    event.preventDefault()

    const validationErrors = validate()
    setErrors(validationErrors)

    // If there are any errors, do not add the destination
    if (Object.keys(validationErrors).length > 0) {
      return
    }

    // Send the data up to App.jsx through the prop function
    onAddDestination({
      placeName: placeName.trim(),
      cityName: cityName.trim(),
      entryFee: Number(entryFee),
    })

    // Reset the form after a successful submission
    setPlaceName('')
    setCityName('')
    setEntryFee('')
  }

  return (
    <div className="form-card">
      {/* noValidate: we show our own validation messages instead of the browser's */}
      <form onSubmit={handleSubmit} noValidate>
        <div className={`form-field ${errors.placeName ? 'has-error' : ''}`}>
          <label htmlFor="placeName">Place Name</label>
          <input
            id="placeName"
            type="text"
            placeholder="e.g. Gateway of India"
            value={placeName}
            onChange={(event) => setPlaceName(event.target.value)}
            aria-invalid={errors.placeName ? 'true' : 'false'}
            aria-describedby={errors.placeName ? 'placeName-error' : undefined}
          />
          {errors.placeName && <p id="placeName-error" className="error-text">{errors.placeName}</p>}
        </div>

        <div className={`form-field ${errors.cityName ? 'has-error' : ''}`}>
          <label htmlFor="cityName">City Name</label>
          <input
            id="cityName"
            type="text"
            placeholder="e.g. Mumbai"
            value={cityName}
            onChange={(event) => setCityName(event.target.value)}
            aria-invalid={errors.cityName ? 'true' : 'false'}
            aria-describedby={errors.cityName ? 'cityName-error' : undefined}
          />
          {errors.cityName && <p id="cityName-error" className="error-text">{errors.cityName}</p>}
        </div>

        <div className={`form-field ${errors.entryFee ? 'has-error' : ''}`}>
          <label htmlFor="entryFee">Entry Fee (₹)</label>
          <div className="fee-input">
            <span className="fee-prefix" aria-hidden="true">₹</span>
            <input
              id="entryFee"
              type="number"
              min="0"
              step="any"
              inputMode="decimal"
              placeholder="e.g. 50"
              value={entryFee}
              onChange={(event) => setEntryFee(event.target.value)}
              aria-invalid={errors.entryFee ? 'true' : 'false'}
              aria-describedby={errors.entryFee ? 'entryFee-error' : undefined}
            />
          </div>
          {errors.entryFee && <p id="entryFee-error" className="error-text">{errors.entryFee}</p>}
        </div>

        <button type="submit" className="btn-primary">
          <span>Add Destination</span>
          <svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true">
            <path d="M4 12h15M13 6l6 6-6 6" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      </form>
    </div>
  )
}

export default DestinationForm
