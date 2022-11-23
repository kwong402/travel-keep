import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import DestinationsIndexPage from "./DestinationsIndexPage"
import NewTravelForm from './NewTravelForm'
import TravelModal from './TravelModal'

export const App = (props) => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={DestinationsIndexPage} />
        <Route exact path="/destinations" component={DestinationsIndexPage} />
        <Route exact path="/travels/:destination_id/new" component={NewTravelForm} />
        <Route exact path="/travels/:travel_id" component={TravelModal} />
      </Switch>
    </BrowserRouter>
  )
}

export default App