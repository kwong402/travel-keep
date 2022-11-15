import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import DestinationsIndexPage from "./DestinationsIndexPage"

export const App = (props) => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={DestinationsIndexPage} />
        <Route exact path="/destinations" component={DestinationsIndexPage} />
      </Switch>
    </BrowserRouter>
  )
}

export default App