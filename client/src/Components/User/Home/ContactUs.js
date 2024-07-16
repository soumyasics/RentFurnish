import React from 'react'
import './UserHome.css'
import img from '../../../Assets/contactimg.png'
import { FaArrowLeft } from "react-icons/fa";
import img2 from '../../../Assets/contact1.png'
import { FaPhoneAlt } from "react-icons/fa";
import { MdOutlineEmail } from "react-icons/md";
import { FaLocationDot } from "react-icons/fa6";

function ContactUs() {
  return (
    <div className='user_contactus'>
        <div>
            <div className='contactus_img_style'><img src={img} className='img-fluid'/> </div>
            <div className='contactus_main_heading'>
            <FaArrowLeft /> Contact Us
            </div>
        </div>
        <div>
            <div className='row container'>
                <div className='col-8'>
                <FaPhoneAlt className='contact_icon_style' size={30}/>
                <FaPhoneAlt className='contact_icon_style' size={30}/>
                <MdOutlineEmail className='contact_icon_style' size={35}/>
                <FaLocationDot className='contact_icon_style' size={30}/>
                </div>
                <div className='col-4'> 
                    <img src={img2} className='img-fluid'></img>
                </div>
            </div>
        </div>
    </div>
  )
}

export default ContactUs