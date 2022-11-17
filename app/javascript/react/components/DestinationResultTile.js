import React from 'react'

const DestinationResultTile = (props) => {
  return (
    <div>
      <ul className="unordered-list">
        <li>{props.city}, {props.state} ({props.country})</li>
      </ul>
    </div>
  )
}

export default DestinationResultTile