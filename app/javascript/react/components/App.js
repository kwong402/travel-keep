import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import DestinationsIndexPage from "./DestinationsIndexPage"
import NewDestinationForm from './NewDestinationForm'

export const App = (props) => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={DestinationsIndexPage} />
        <Route exact path="/destinations" component={DestinationsIndexPage} />
        <Route exact path="/destinations/new" component={NewDestinationForm} />
      </Switch>
    </BrowserRouter>
  )
}

export default App