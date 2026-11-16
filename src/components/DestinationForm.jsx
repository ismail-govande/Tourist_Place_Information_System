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
    <section className="form-card" aria-labelledby="form-heading">
      <h2 id="form-heading">Add Destination</h2>
      <p className="form-subtitle">Enter the details of a new tourist place.</p>

      {/* noValidate: we show our own validation messages instead of the browser's */}
      <form onSubmit={handleSubmit} noValidate>
        <div className="form-field">
          <label htmlFor="placeName">Place Name</label>
          <input
            id="placeName"
            type="text"
            placeholder="e.g. Gateway of India"
            value={placeName}
            onChange={(event) => setPlaceName(event.target.value)}
            className={errors.placeName ? 'input-error' : ''}
          />
          {errors.placeName && <p className="error-text">{errors.placeName}</p>}
        </div>

        <div className="form-field">
          <label htmlFor="cityName">City Name</label>
          <input
            id="cityName"
            type="text"
            placeholder="e.g. Mumbai"
            value={cityName}
            onChange={(event) => setCityName(event.target.value)}
            className={errors.cityName ? 'input-error' : ''}
          />
          {errors.cityName && <p className="error-text">{errors.cityName}</p>}
        </div>

        <div className="form-field">
          <label htmlFor="entryFee">Entry Fee (₹)</label>
          <input
            id="entryFee"
            type="number"
            min="0"
            step="any"
            placeholder="e.g. 50"
            value={entryFee}
            onChange={(event) => setEntryFee(event.target.value)}
            className={errors.entryFee ? 'input-error' : ''}
          />
          {errors.entryFee && <p className="error-text">{errors.entryFee}</p>}
        </div>

        <button type="submit" className="btn-primary">
          Add Destination
        </button>
      </form>
    </section>
  )
}

export default DestinationForm
