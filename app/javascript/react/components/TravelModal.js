import React, { useState } from "react";

const TravelModal = (props) => {
  const [travelRecord, setTravelRecord] = useState({
    body: props.travelNotes
  })

  const handleTravelFormChange = (event) => {
    setTravelRecord({
      ...travelRecord,
      [event.currentTarget.name]: event.currentTarget.value
    })
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    debugger
    const travelId = props.travelId
    try {
      const response = await fetch(`api/v1/travels/${travelId}`, {
        method: "PATCH",
        credentials: "same-origin",
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ travel: travelRecord })
      })
      debugger
      if (!response.ok) {
        const errorMessage = `${response.status} (${response.statusText})`
        throw new Error(errorMessage)
      }
      const responseBody = await response.json().travel.body
      debugger
      // need to do something to trigger change on the front end
      setTravelRecord(responseBody)
    } catch (error) {
      console.error(`Error in fetch: ${error.message}`)
    }
      debugger
      props.handleClose
      //how to make Destination Index re-render, redirect?
  }

  return (
    <form onSubmit={handleSubmit}>
      <h2>{props.destinationName}</h2>
      <label>
        Notes:
        <input
          type="text"
          name="body"
          value={travelRecord.body}
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