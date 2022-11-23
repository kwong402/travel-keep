import React, { useState } from 'react'
import ErrorList from "./ErrorList"
import _ from "lodash"

const FlightPriceForm = (props) => {
  const [errors, setErrors] = useState({})
  const [flightInfoRecord, setFlightInfoRecord] = useState({
    departure_date: ""
  })

  const validForSubmission = () => {
    let submitErrors = {}
    const requiredFields = ["departure_date"]
    requiredFields.forEach(field => {
      if (flightInfoRecord[field].trim() === '') {
        submitErrors = {
          ...submitErrors,
          [field]: "is blank"
        }
      }
    })
    setErrors(submitErrors)
    return _.isEmpty(submitErrors)
  }

  const handleFlightFormChange = async(event) => {
    setFlightInfoRecord({
      ...flightInfoRecord,
      [event.currentTarget.name]: event.currentTarget.value
    })
  }

  const handleSubmit = async(event) => {
    event.preventDefault()
    if (validForSubmission()) {
      props.searchPriceAnalysis(flightInfoRecord)
    }
  }

  return (
    <form className="box" onSubmit={handleSubmit}>
      <h3>FLIGHT PRICE FORM</h3>
      <p>Let's see which flight has the best deals for your trip!</p>
      <ErrorList errors={errors} />
      <label>
        Departure Date:
        <input
          type="date"
          name="departure_date"
          onChange={handleFlightFormChange}
        />
      </label>
      <div>
          <input
            className="button"
            type="submit"
            value="Analyze My Travel Ideas"
          />
        </div>
    </form>
  )
}

export default FlightPriceForm