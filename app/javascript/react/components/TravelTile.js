import React, {useState} from 'react'
import ReactModal from 'react-modal'
import Modal from 'react-modal'
import TravelModal from './TravelModal'

const TravelTile = (props) => {
  const [modalStatus, setModalStatus] = useState(false)
  Modal.setAppElement('#app')

  const destinationName = props.travel.destination.city_name
  const travelNotes = props.travel.body

  const handleOpen = () => {
    setModalStatus(true)
  }

  const handleClose = () => {
    setModalStatus(false)
  }

  const handleDelete = () => {
    props.confirmTravelDelete(props.travel)
  }

  return (
    <div className="box travel-tile">
      <h3>{destinationName}</h3>
      <p>{travelNotes}</p>
      <button onClick={handleOpen} className="button">
        Edit
      </button>
      <button onClick={handleDelete} className="delete button">
        Delete
      </button>
      <ReactModal
        isOpen={modalStatus}
        contentLabel={"Update"}
        onRequestClose={handleClose}
        shouldCloseOnOverlayClick={true}
        shouldCloseOnEsc={true}
      >
        <TravelModal 
          handleClose={handleClose}
          destinationName={destinationName}
          travelNotes={travelNotes}
          travelId={props.travel.id}
          updateTravelTiles={props.updateTravelTiles}
        />
      </ReactModal>
    </div>
  )
}

export default TravelTile