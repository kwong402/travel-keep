import React from 'react'
import NewDestinationForm from './NewDestinationForm'
import TravelsCollection from './TravelsCollection'

const DestinationsIndexPage = (props) => {

  return (
    <div>
      <h1>We got to Destinations Index Page</h1>
      <NewDestinationForm />
      <TravelsCollection />
    </div>
  )
}

export default DestinationsIndexPage