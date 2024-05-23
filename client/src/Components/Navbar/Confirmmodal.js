import React from 'react'
import "./Modal.css"

 const Confirmmodal = ({ show, onClose, onConfirm }) => {
    if (!show) {
        return null;
      }
  return (
    <div className="modal-overlay">
      <div className="modal-content modalhead">
        <h2>Confirm Logout</h2>
        <p>Are you sure you want to logout?</p>
        <div className="modal-actions modalbutton">
          <button className="btn" onClick={onConfirm}>Yes</button>
          <button className="btn" onClick={onClose}>No</button>
        </div>
      </div>
    </div>
  )
}

export default Confirmmodal