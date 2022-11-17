import React from 'react'

const TravelTile = (props) => {
  return (
    <div className="box">
      <h3>{props.travel.destination.city_name}</h3>
      <p>{props.travel.body}</p>
    </div>
  )
}

export default TravelTile