import React from 'react'

const FlightPriceResult = (props) => {
  return (
    <div className="box">
      <h4>YOU SHOULD TRAVEL TO:</h4>
      <h2>{props.flightPriceResults.name}</h2>
      <h3>({props.flightPriceResults.iata_code} Airport)</h3>
      <p>The best deal is ${props.flightPriceResults.price.toFixed(2)} around this time.</p>
    </div>
  )
}

export default FlightPriceResult