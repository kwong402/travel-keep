import React, {useState} from 'react'
import ReactModal from 'react-modal'
import Modal from 'react-modal'
import TravelModal from './TravelModal'

const TravelTile = (props) => {
  const destinationName = props.travel.destination.city_name
  const travelNotes = props.travel.body

  Modal.setAppElement('#app')
  const [modalStatus, setModalStatus] = useState(false)

  const handleOpen = () => {
    setModalStatus(true)
  }

  const handleClose = () => {
    setModalStatus(false)
  }

  return (
      <div className="box">
        <h3>{destinationName}</h3>
        <p>{travelNotes}</p>
        <button onClick={handleOpen} className="button">
          Edit
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
            travel={props.travel}
            updateTravel={props.updateTravel}
          />
        </ReactModal>
      </div>
  )
}

export default TravelTile