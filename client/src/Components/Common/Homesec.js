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
                    <p className='ri-checkbox-circle-line'>Your review scores on other travel websites are converted and displayed on your property page until you receive your first Booking.com guest review</p>
                    <p className='ri-checkbox-circle-line'>Stand out in search results with the ‘Rental property.com’ label on your property</p>
                    <p className='ri-checkbox-circle-line'>Our listing strength checklist helps you complete your property setup to attract more guests</p>
                    <p className='ri-checkbox-circle-line'>Get discovered quickly with our innovative Quality rating system</p>
                    <p className='ri-checkbox-circle-line'>Sell up to 30% more nights with the Smart Flex Reservations programme, which adds flexibility to some of your existing cancellation policies to attract more guests. If a guest cancels, we’ll look for a replacement</p>

                </div>
            </div>

        </div>

    </div>
  )
}

export default Homesec