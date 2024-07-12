import React from 'react'
import '../Complaints/Complaints.css'
function Complaints() {
  return (
    <div>
        <div className='col-9'>
        <div className='border col ms-5 rounded-2'>
            <div className='row'>
                <div className='col'><p className='Complain_head_text'>SI No</p></div> 
                <div className='col'><p className='Complain_head_text'>Furnitures</p></div> 
                <div className='col'><p className='Complain_head_text'>Customer Name</p></div> 
                <div className='col'><p className='Complain_head_text'>Address</p></div> 
                <div className='col'><p className='Complain_head_text'>Date</p></div> 
                <div className='col'><p className='Complain_head_text'>Order Status</p></div> 
                <div className='col'><p className='Complain_head_text'>View Details</p></div> 
            </div>
            <div className='row'>
                <div className='col'><p className='Complain_body_number'>1</p></div> 
                <div className='col'><p className='Complain_body_text'>Single seat sofa</p></div> 
                <div className='col'><p className='Complain_body_text'>Richard</p></div> 
                <div className='col'><p className='text_break'>22/10, Kazhakuttom,Trivandrum, 584896.</p></div> 
                <div className='col'><p className='Complain_body_text'>Single seat sofa</p></div> 
                <div className='col'><p className='Complain_body_text'>Single seat sofa</p></div> 
                <div className='col'><p className='Complain_body_text'>Single seat sofa</p></div> 
            </div>
        </div>
        </div>
    </div>
  )
}

export default Complaints