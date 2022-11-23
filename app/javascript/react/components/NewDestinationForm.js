import React, { useState } from 'react'
import ErrorList from "./ErrorList"
import _ from "lodash"

const NewDestinationForm = (props) => {
  const [errors, setErrors] = useState({})
  const [searchRecord, setSearchRecord] = useState({
    city_name: ""
  })

  const handleDestinationFormChange = (event) => {
    setSearchRecord({
      ...searchRecord,
      [event.currentTarget.name]: event.currentTarget.value
    })
  }

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

  const handleSearch = (event) => {
    event.preventDefault()
    if (validForSubmission()){
      props.searchNewDestination(searchRecord)
    }
  }

  return (
    <div className="box">
      <form onSubmit={handleSearch}>
        <h2>PLAN MY TRAVELS</h2>
        <p>Start by searching a destination!</p>
        <ErrorList 
          errors={errors} 
        />
        <label>
          City:
          <input
            type="text"
            placeholder="Ex: Boston"
            name="city_name"
            onChange={handleDestinationFormChange}
            value={searchRecord.city_name}
          />
        </label>

        <div>
          <input
            className="button"
            type="submit"
            value="Search"
          />
        </div>
      </form>
    </div>
  )
}

export default NewDestinationForm