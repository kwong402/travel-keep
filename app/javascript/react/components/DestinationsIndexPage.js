import React, { useState, useEffect } from 'react'
import { Link } from "react-router-dom"
import FetchDestinations from './services/FetchDestinations'
import FetchTravels from './services/FetchTravels'
import NewDestinationForm from './NewDestinationForm'
import DestinationResultTile from './DestinationResultTile'
import TravelTile from './TravelTile'
import FlightPriceForm from './FlightPriceForm'
import FlightPriceResult from './FlightPriceResult'

const DestinationsIndexPage = (props) => {
  const [clickDestinationForm, setClickDestinationForm] = useState(false)
  const [clickFlightPriceForm, setClickFlightPriceForm] = useState(false)
  const [getTravels, setTravels] = useState([])
  const [noMatchMessage, setNoMatchMessage] = useState(null)
  const [destinationResults, setDestinationResults] = useState([])
  const [flightErrorMessage, setFlightErrorMessage] = useState(null)
  const [flightPriceResults, setFlightPriceResults] = useState([])
  const [loadingStatus, setLoadingStatus] = useState(null)

  const handleDestinationIconClick = (event) => {
    event.preventDefault()
    setClickDestinationForm(!clickDestinationForm)
    setDestinationResults([])
    setNoMatchMessage(null)
  }

  const searchNewDestination = async(userSearchData) => {
      setNoMatchMessage(null)
      setDestinationResults([])
      setLoadingStatus(<i class="fa fa-spinner fa-pulse fa-3x fa-fw"></i>)
      const response = await FetchDestinations.getDestinations(userSearchData.city_name)
      setLoadingStatus(null)
      if (response){
        setDestinationResults(response)
      } else {
        setNoMatchMessage(<div><p>No matches were found. Try another destination.</p></div>)
      }
  }

  let resultTiles
  let showDestinationForm
  let destinationIcon = "fa fa-plus-square icon"
  if (clickDestinationForm) {
    destinationIcon = "fa fa-minus-square icon"
    showDestinationForm = <NewDestinationForm 
      searchNewDestination={searchNewDestination}
    />
  }

  resultTiles = destinationResults.map((result) => {
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

  let destinationAppearance = ""
  if (destinationResults.length > 0 || noMatchMessage) {
    destinationAppearance = "box"
  }

  const handleFlightIconClick = (event) => {
    event.preventDefault()
    setClickFlightPriceForm(!clickFlightPriceForm)
    setFlightPriceResults([])
    setFlightErrorMessage(null)
  }

  const searchPriceAnalysis = async (date) => {
    setFlightErrorMessage(null)
    setFlightPriceResults([])
    setLoadingStatus(<i class="fa fa-spinner fa-pulse fa-3x fa-fw"></i>)
    const response = await FetchTravels.getCheapestTravel(date)
    setLoadingStatus(null)
    if (response){
      setFlightPriceResults(response)
    } else {
      setFlightErrorMessage(<div><p>An error occurred while searching. Try again in a few minutes</p></div>)
    }
  }

  let showFlightPriceForm
  let flightPriceIcon = "fa fa-paper-plane"
  if (clickFlightPriceForm) {
    flightPriceIcon = "fa fa-paper-plane-o"
    showFlightPriceForm = <FlightPriceForm
      searchPriceAnalysis={searchPriceAnalysis}
    />
  }

  let flightPriceResultTile
  if (Object.keys(flightPriceResults).length > 0) {
    flightPriceResultTile = <FlightPriceResult
    flightPriceResults = {flightPriceResults}
    />
  }

  let flightAppearance = ""
  if (flightPriceResults.length > 0 || flightErrorMessage) {
    flightAppearance = "box"
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

  const confirmTravelDelete = async (selectedTravel) => {
    const travelId = selectedTravel.id
    const response = await FetchTravels.deleteTravel(travelId)
    setTravels(response)
  }

  const travelTiles = getTravels.map((travel) => {
    return (
        <TravelTile
          key={travel.id}
          travel={travel}
          updateTravelTiles={updateTravelTiles}
          confirmTravelDelete={confirmTravelDelete}
        />
    )
  })

  useEffect(() => {
    fetchTravels()
  }, [])

  return (
    <div>
      <div className="sidebar">
        <a href="#top"><i className={destinationIcon} aria-hidden="true" title="Search Destination" onClick={handleDestinationIconClick}></i></a><br/>
        <a href="#top"><i className={flightPriceIcon} aria-hidden="true" title="Find Affordable Flight" onClick={handleFlightIconClick}></i></a>
      </div>
      <div className="grid-container">
        <div className="grid-x grid-margin-x">
          <div className="grid-container cell medium-6">
            {showDestinationForm}
          </div>
          <div className={`${destinationAppearance} grid-container cell medium-6`}>
            {loadingStatus}
            {noMatchMessage}
            {resultTiles}
          </div>
        </div>
        <div className="grid-x grid-margin-x">
          <div className="grid-container cell medium-6">
            {showFlightPriceForm}
          </div>
          <div className={`${flightAppearance} grid-container cell medium-6`}>
            {flightErrorMessage}
            {flightPriceResultTile}
          </div>
        </div>
        <h2 className="grid-header">MY TRAVEL IDEAS</h2>
        <div className="grid-container">
          <div className="grid-x grid-margin-x small-up-2 medium-up-3 large-up-4">
            {travelTiles}
          </div>
        </div>
      </div>
    </div>
  )
}

export default DestinationsIndexPage