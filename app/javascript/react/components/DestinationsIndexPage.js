import React, { useState, useEffect } from 'react'
import { Link } from "react-router-dom"
import FetchDestinations from './services/FetchDestinations'
import NewDestinationForm from './NewDestinationForm'
import DestinationResultTile from './DestinationResultTile'
import TravelTile from './TravelTile'
import FlightPriceForm from './FlightPriceForm'
import FlightPriceResult from './FlightPriceResult'

const DestinationsIndexPage = (props) => {
  const [clickDestinationForm, setClickDestinationForm] = useState(false)
  const [noMatchMessage, setNoMatchMessage] = useState(null)
  const [getTravels, setTravels] = useState([])
  const [destinationResults, setDestinationResults] = useState([])

  const handleIconClick = (event) => {
    event.preventDefault()
    setClickDestinationForm(!clickDestinationForm)
  }

  const searchNewDestination = async(userSearchData) => {
      setNoMatchMessage(null)
      setDestinationResults([])
      const response = await FetchDestinations.getDestinations(userSearchData.city_name)
      if (response){
        setDestinationResults(response)
      } else {
        setNoMatchMessage(<div><p>No matches were found. Try another destination.</p></div>)
      }
  }

  let showDestinationForm
  let icon = "fa fa-plus-square icon"
  if (clickDestinationForm) {
    icon = "fa fa-minus-square icon"
    showDestinationForm = <NewDestinationForm 
      searchNewDestination={searchNewDestination}
    />
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
  if (destinationResults.length > 0 || noMatchMessage) {
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

  const updateTravelTiles = (travelData) => {
    const updatedState = getTravels.map((travel) => {
      if (travel.id === travelData.id) {
        return travelData
      } else {
        return travel
      }
    })
    setTravels(updatedState)
  }

  const travelTiles = getTravels.map((travel) => {
    return (
        <TravelTile
          key={travel.id}
          travel={travel}
          updateTravelTiles={updateTravelTiles}
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
          <i className={icon} aria-hidden="true" onClick={handleIconClick}></i>
          {showDestinationForm}
        </div>
        <div className={`${appearance} grid-container cell medium-6`}>
          {noMatchMessage}
          {resultTiles}
        </div>
      </div>
      <div className="grid-x grid-margin-x">
        <div className="grid-container cell medium-6">
          <FlightPriceForm 
            searchPriceAnalysis={searchPriceAnalysis}
          />
        </div>
        <div className={`grid-container cell medium-6`}>
          <FlightPriceResult />
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