import React, { useState} from 'react'

const NewTravelForm = (props) => {
  const [newTravelRecord, setNewTravelRecord] = useState({
    body: ""
  })

  const postNewTravel = async(event) => {
    try{
      event.preventDefault()
      debugger
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
    } catch(error) {
      console.error(`Error in fetch: ${error.message}`)
    }
    setNewTravelRecord({
      body: ""
    })
  }

  const handleTravelFormChange = (event) => {
    setNewTravelRecord({
      ...newTravelRecord,
      [event.currentTarget.name]: event.currentTarget.value
    })
  }

  return (
    <form className="box" onSubmit={postNewTravel}>
      <h2>Destination Title UPDATE LATER</h2>
      <label>
        Notes:
        <input
          type="text"
          name="body"
          value={newTravelRecord.body}
          onChange={handleTravelFormChange}
        />
      </label>

      <div>
        <input
          className="form-button"
          type="submit"
          value="Add"
        />
      </div>

    </form>
  )
}

export default NewTravelForm