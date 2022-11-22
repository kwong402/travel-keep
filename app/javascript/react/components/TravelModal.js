import React, { useState } from "react"
import FetchTravels from "./services/FetchTravels"

const TravelModal = (props) => {
  const [updatedTravelRecord, setUpdatedTravelRecord] = useState({
    body: props.travelNotes
  })

  const handleTravelFormChange = (event) => {
    setUpdatedTravelRecord({
      ...updatedTravelRecord,
      [event.currentTarget.name]: event.currentTarget.value
    })
  }

  const handleUpdate = async (event) => {
    event.preventDefault()
    const travelId = props.travelId
    const travelData = await FetchTravels.updateTravel(travelId, updatedTravelRecord)
    props.updateTravelTiles(travelData)
    debugger
    props.handleClose
  }

  return (
    <form onSubmit={handleUpdate}>
      <h2>{props.destinationName}</h2>
      <label>
        Notes:
        <input
          type="text"
          name="body"
          value={updatedTravelRecord.body}
          onChange={handleTravelFormChange}
        />
      </label>
      <div>
        <input 
          className="button"
          value="Update"
          type="submit"
        />
      </div>
    </form>
  )
}

export default TravelModal