import React from 'react'
import "./Homesec.css"
import img from "../../Assets/sechomegrl.jpg"

function Homesec() {
  return (
    <div className='sechome'>
        <div className='container'>
            <div className='row'>
                <div className='col-sm-12 col-md-6 col-lg-6 sechome-left '>
                    <img src={img} alt='image' width="550px" height="580px"></img>

                </div>
                <div className='col-sm-12 col-md-6 col-lg-6 sechome-right '>
                    <h3>Get quality bookings quickly</h3>
                    <p className='ri-checkbox-circle-line'>Your review scores on other travel websites are converted<br/>
                    <span style={{paddingLeft:"23px"}}>and displayed on your property page until you receive</span> 
                     <br/><span style={{paddingLeft:"23px"}}>your first Booking.com guest review</span></p>
                    <p className='ri-checkbox-circle-line'>Stand out in search results with the ‘Rental property.com’ <br/>
                    <span style={{paddingLeft:"23px"}}>label on your property</span></p>
                    <p className='ri-checkbox-circle-line'>Our listing strength checklist helps you complete your <br/>
                    <span style={{paddingLeft:"23px"}}>property setup to attract more guests</span></p>
                    <p className='ri-checkbox-circle-line'>Get discovered quickly with our  Quality rating system</p>
                    <p className='ri-checkbox-circle-line'>Sell up to 30% more nights with the Smart Flex<br/>
                    <span style={{paddingLeft:"23px"}}>Reservations programme, which adds flexibility to some</span> <span style={{paddingLeft:"23px"}}>of your existing cancellation policies to attract more </span><span style={{paddingLeft:"23px"}}>guests.</span></p>

                </div>
            </div>

        </div>

    </div>
  )
}

export default Homesec