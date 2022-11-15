import React from 'react'

const NewDestinationForm = (props) => {

  return (
    <div className="component-page">
      <h1>Search New Destination</h1>
      <form>
        <label>
          Destination:
          <input
            type="text"
            placeholder="Ex: Boston"
            name="city_name"
          />
        </label>

        <div>
          <input
            className="form-button"
            type="submit"
          />
        </div>
      </form>
    </div>
  )
}

export default NewDestinationForm