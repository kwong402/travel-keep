import React, { useState } from "react";

const TravelModal = (props) => {
  const [travelRecord, setTravelRecord] = useState(props.travel)

  const handleTravelFormChange = (event) => {
    setTravelRecord({
      ...travelRecord,
      [event.currentTarget.name]: event.currentTarget.value
    })
  }

  return (
    <form onSubmit={props.updateTravel}>
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
      <button onClick={props.handleClose} className="button">
        Update
      </button>
    </form>
  )
}

export default TravelModal