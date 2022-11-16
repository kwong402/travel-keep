import React from 'react'

const TravelTile = (props) => {

  return (
    <div className="box">
      <h3>Boston, MA</h3>
      <p>{props.description}</p>
    </div>
  )
}

export default TravelTile