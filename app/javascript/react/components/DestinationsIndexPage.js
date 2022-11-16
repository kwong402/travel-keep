import React, { useState, useEffect } from 'react'
import FetchDestinations from './services/FetchDestinations'
import NewDestinationForm from './NewDestinationForm'
import DestinationResultTile from './DestinationResultTile'
import TravelTile from './TravelTile'

const DestinationsIndexPage = (props) => {
  const [fetchError, setFetchError] = useState(null)
  const [errors, setErrors] = useState({})
  const [getTravels, setTravels] = useState([])
  const [destinationResults, setDestinationResults] = useState([])
  const [searchRecord, setSearchRecord] = useState({
    city_name: ""
  })

  const validForSubmission = () => {
    let submitErrors = {}
    const requiredFields = ["city_name"]
    requiredFields.forEach(field => {
      if (searchRecord[field].trim() === '') {
        submitErrors = {
          ...submitErrors,
          [field]: "is blank"
        }
      }
    })
    setErrors(submitErrors)
    return _.isEmpty(submitErrors)
  }

  const handleFormChange = (event) => {
    setSearchRecord({
      ...searchRecord,
      [event.currentTarget.name]: event.currentTarget.value
    })
  }

  const handleFormSubmit = async(event) => {
    event.preventDefault()
    if (validForSubmission()){
      setFetchError(null)
      setDestinationResults([])

      const response = await FetchDestinations.getDestinations(searchRecord.city_name)

      if (response){
        setDestinationResults(response)
      } else {
        setFetchError(<div><p>No matches were found. Try another Destination.</p></div>)
      }
    }
  }

  const resultTiles = destinationResults.map((result) => {
    return (
      <DestinationResultTile
        key={result.id}
        city={result.address.cityName}
        state={result.address.stateCode}
        country={result.address.countryName}
      />
      )
  })

  let appearance = ""
  if (destinationResults.length > 0 || fetchError) {
    appearance = "box"
  }

  const fetchTravels = async () => {
    try {
      const response = await fetch("/api/v1/travels")
      if (!response.ok) {
        const errorMessage = `${response.status} (${response.statusText})`
        throw new Error(errorMessage)
      }
      const responseBody = await response.json()
      setTravels(responseBody)
    } catch (error) {
      console.error(`Error in fetch: ${error.message}`)
    }
  }

  const travelTiles = getTravels.map((travel) => {
    return (
      <TravelTile
        key={travel.id}
        description={travel.body}
      />
      )
  })

  useEffect(() => {
    fetchTravels()
  }, [])

  return (
    <div className="grid-container">
      <div className="grid-x grid-margin-x">
        <div className="grid-container cell medium-6">
          <NewDestinationForm 
            handleFormChange={handleFormChange}
            handleFormSubmit={handleFormSubmit}
            searchRecord={searchRecord}
            errors={errors}
          />
        </div>
        <div className={`${appearance} grid-container cell medium-6`}>
          {fetchError}
          {resultTiles}
        </div>
      </div>
      <h2>MY TRAVEL IDEAS</h2>
      {travelTiles}
    </div>
  )
}

export default DestinationsIndexPage