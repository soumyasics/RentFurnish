import React from 'react'
import "./Modal.css"
import logout from "../../Assets/logouticon.json"
import Lottie from 'lottie-react'

 const Confirmmodal = ({ show, onClose, onConfirm }) => {
    if (!show) {
        return null;
      }
  return (
    <div className="modal-overlay">
      <div className="modal-content modalhead" style={{color:"black"}}>
       {/* <div className='modalhead-lottie'> <Lottie animationData={logout}/></div> */}
        <h2>Confirm Logout</h2>
        <p>Are you sure you want to logout?</p>
        <div className="modal-actions modalbutton">
          <button className="btn btn-primary" onClick={onConfirm} style={{width:"100px"}}>Yes</button>
          <button className="btn btn-success" onClick={onClose} style={{width:"100px"}}>No</button>
        </div>
      </div>
    </div>
  )
}

export default Confirmmodal