import React from 'react'
import './UserHome.css'
import img from '../../../Assets/contactimg.png'
import { FaArrowLeft } from "react-icons/fa";
import img2 from '../../../Assets/contact1.png'
import { FaPhoneAlt } from "react-icons/fa";
import { MdOutlineEmail } from "react-icons/md";
import { FaLocationDot } from "react-icons/fa6";
import { FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa';
import { GoDotFill } from "react-icons/go";
import { Link } from 'react-router-dom';

function ContactUs() {
  return (
    <div >
      <div className='contact_main_div_img'>
        <div className='contactus_div1'>
          <h1 className='contactus_h1'><Link to="/user-home" className='contactus_link'><FaArrowLeft className='contact_arrow' /></Link>Contact Us</h1>
          <p className='contactus_sub_text'><GoDotFill />     Contact Us Today For A Stress-Free Furniture Rental Experience</p>
          <p className='contactus_sub_text'><GoDotFill />   Ready To Furnish Your Space With Ease? Browse Our Website</p>
          <p className='contactus_sub_text'><GoDotFill />   If You Have Any Problem Please Contact With Us</p>
        </div>
        <div className='row  contactus_row_container'>
          <div className='col-7 mt-5'>
            <div className='contactus_col_div'>
              <div className='contactus_items_style' >
                <FaPhoneAlt className='contactus_icon_style' size={30}/>
                <span className='contactus_details'>Phone Number 1: 1820401999</span>
              </div>
              <div className='contactus_items_style'>
                <FaPhoneAlt className='contactus_icon_style' size={30}/>
                <span className='contactus_details'>Phone Number 2: 1820401999</span>
              </div>
              <div className='contactus_items_style'>
                <FaEnvelope className='contactus_icon_style' size={30}/>
                <span className='contactus_details'>Email: rentalfurniture@gmail.com</span>
              </div>
              <div className='contactus_items_style'>
                <FaMapMarkerAlt className='contactus_icon_style' size={30}/>
                <span className='contactus_details'>
                  Office No. 1, Waha Mall, Al Dajeej, Farwaniya. ( pin : 656735 )
                </span>
              </div>
            </div>
          </div>
          <div className='col-5'>
            <img src={img2} className='img-fluid' width={500} />
          </div>
        </div><br />
      </div>

    </div>
  )
}

export default ContactUs