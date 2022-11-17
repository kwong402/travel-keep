import React from 'react'
import ErrorList from "./ErrorList"
import _ from "lodash"

const NewDestinationForm = (props) => {

  return (
    <div className="box">
      <form onSubmit={props.searchNewDestination}>
        <h2>PLAN MY TRAVELS</h2>
        <p>Start by searching a destination!</p>
        <ErrorList 
          errors={props.errors} 
        />
        <label>
          City:
          <input
            type="text"
            placeholder="Ex: Boston"
            name="city_name"
            onChange={props.handleDestinationFormChange}
            value={props.searchRecord.city_name}
          />
        </label>

        <div>
          <input
            className="form-button"
            type="submit"
            value="Search"
          />
        </div>
      </form>
    </div>
  )
}

export default NewDestinationForm