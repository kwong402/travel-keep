import React from 'react'

const DestinationResultTile = (props) => {
  return (
    <div>
      <li>{props.city}, {props.state} ({props.country})</li>
    </div>
  )
}

export default DestinationResultTile