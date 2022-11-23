import React, { useState, useEffect } from 'react'
import { Link } from "react-router-dom"
import FetchDestinations from './services/FetchDestinations'
import NewDestinationForm from './NewDestinationForm'
import DestinationResultTile from './DestinationResultTile'
import TravelTile from './TravelTile'
import FlightPriceForm from './FlightPriceForm'
import FlightPriceResult from './FlightPriceResult'

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

  const handleDestinationFormChange = (event) => {
    setSearchRecord({
      ...searchRecord,
      [event.currentTarget.name]: event.currentTarget.value
    })
  }

  const searchNewDestination = async(event) => {
    event.preventDefault()
    if (validForSubmission()){
      setFetchError(null)
      setDestinationResults([])

      const response = await FetchDestinations.getDestinations(searchRecord.city_name)

      if (response){
        setDestinationResults(response)
      } else {
        setFetchError(<div><p>No matches were found. Try another destination.</p></div>)
      }
    }
  }

  const resultTiles = destinationResults.map((result) => {
    return (
      <Link to={`travels/${result.id}/new`} key={result.id}>
        <DestinationResultTile
          key={result.id}
          city={result.address.cityName}
          state={result.address.stateCode}
          country={result.address.countryName}
        />
      </Link>
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
      const travelsData = responseBody.travels
      setTravels(travelsData)
    } catch (error) {
      console.error(`Error in fetch: ${error.message}`)
    }
  }

  const travelTiles = getTravels.map((travel) => {
    return (
      <TravelTile
        key={travel.id}
        travel={travel}
      />
      )
  })

  const searchPriceAnalysis = async (date) => {

  }

  useEffect(() => {
    fetchTravels()
  }, [])

  return (
    <div className="grid-container">
      <div className="grid-x grid-margin-x">
        <div className="grid-container cell medium-6">
          <NewDestinationForm 
            handleDestinationFormChange={handleDestinationFormChange}
            searchNewDestination={searchNewDestination}
            searchRecord={searchRecord}
            errors={errors}
          />
          <FlightPriceForm 
            searchPriceAnalysis={searchPriceAnalysis}
          />
        </div>
        <div className={`grid-container cell medium-6`}>
          <div className={`${appearance}`}>
            {fetchError}
            {resultTiles}
          </div>
          <div>
            <FlightPriceResult />
          </div>
        </div>
      </div>
      <h2>MY TRAVEL IDEAS</h2>
      <div className="grid-container">
        <div className="grid-x grid-margin-x small-up-2 medium-up-3 large-up-4">
          {travelTiles}
        </div>
      </div>
    </div>
  )
}

export default DestinationsIndexPage