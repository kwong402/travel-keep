import React, { useEffect, useState} from 'react'
import { Redirect } from "react-router-dom"
import FetchDestinations from './services/FetchDestinations'

const NewTravelForm = (props) => {
  const [shouldRedirect, setShouldRedirect] = useState(false)
  const [selectedDestination, setSelectedDestination] = useState({})
  const [newTravelRecord, setNewTravelRecord] = useState({
    body: ""
  })

  useEffect(() => {
    fetchDestination()
  }, [])

  const fetchDestination = async() => {
    const destinationId = props.match.params.destination_id
    const destination = await FetchDestinations.getSelectedDestination(destinationId)
    setSelectedDestination(destination)
  }

  const postNewTravel = async(event) => {
    try{
      event.preventDefault()

      const destinationId = props.match.params.destination_id
      const response = await fetch(`/api/v1/destinations/${destinationId}/travels`, {
        method: "POST",
        credentials: "same-origin",
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ travel: newTravelRecord })
      })
      if (!response.ok) {
        const errorMessage = `${response.status} (${response.statusText})`
        throw new Error(errorMessage)
      }
      const responseBody = await response.json()
      setNewTravelRecord(responseBody.travel)
      setShouldRedirect(true)
    } catch(error) {
      console.error(`Error in fetch: ${error.message}`)
    }
  }

  const handleTravelFormChange = (event) => {
    setNewTravelRecord({
      ...newTravelRecord,
      [event.currentTarget.name]: event.currentTarget.value
    })
  }

  let showDestinationName = <h1>Loading...</h1>
  if (Object.keys(selectedDestination).length > 0) {
    showDestinationName=<h1>{selectedDestination.address.cityName}, {selectedDestination.address.stateCode} ({selectedDestination.address.countryCode})</h1>
  }

  if (shouldRedirect) {
    return <Redirect to='/destinations' />
  }

  return (
    <form className="form box" onSubmit={postNewTravel}>
      {showDestinationName}
      <label>
        Notes:
        <textarea
          type="text"
          name="body"
          value={newTravelRecord.body}
          onChange={handleTravelFormChange}
        />
      </label>

      <div>
        <input
          className="button"
          type="submit"
          value="Add"
        />
      </div>

    </form>
  )
}

export default NewTravelForm