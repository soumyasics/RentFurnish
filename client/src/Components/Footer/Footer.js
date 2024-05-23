import React from 'react'
import "./Footer.css"
import admin from "../../Assets/logo1.png";


function Footer() {
  return (
    <div className='footermain row '>
        <div className='row d-flex'>
        <div className='col-4 sm-4 md-4 footerhead1'>
        <img src={admin} alt='logo'/>
        <p>Rental Furniture</p>
        <h6>Rent a furniture online today!</h6>
        </div>
        <div className='col-4 sm-4 md-4 footerhead12'>
        <h5>Terms & Policies</h5>
        <p style={{fontSize:"15px"}}>Terms of services</p>
        <p style={{fontSize:"15px"}}>Privacy policy</p>

        </div>
        <div className='col-4 sm-4 md-4 footerhead13'>
        <h5>Contact</h5>
        <p style={{fontSize:"15px"}}>8778877887</p>
        <p style={{fontSize:"15px"}}>srishticampus@gmail.com</p>
        </div>
        </div>
    </div>
  )
}

export default Footer