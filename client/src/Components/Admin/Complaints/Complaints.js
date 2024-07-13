import React, { useState } from 'react'
import '../Complaints/Complaints.css'
import Search from '../../../Assets/search-line.png';
function Complaints() {
  const [complaint,setComplaint]=useState([])
  return (
    <div>
      <div className=' mt-5 px-5 col-sm-6 col-md-6 col-lg-3  d-flex float-end'>
        <input type='search' className='form-control rounded-5 float-end ' placeholder='search here'></input>
      </div>
      
      <div className='col-sm-11 d-flex  justify-content-end  mt-5 ms-5 '>
        <div className='border col-sm-12 col-md-12 col-lg-12 ms-5 mt-5 rounded-2 shadow-lg'>
          <div className='table-responsive-md'>
          <table className="table table table-borderless">
            <thead>
              <tr >
                <th scope="col"><p className='Complain_head_text'>SI No</p></th>
                <th scope="col"><p className='Complain_head_text'>Furnitures</p></th>
                <th scope="col"><p className='Complain_head_text'>Customer Name</p></th>
                <th scope="col"><p className='Complain_head_text'>Address</p></th>
                <th scope="col"><p className='Complain_head_text'>Date</p></th>
                <th scope="col"><p className='Complain_head_text'>Order Status</p></th>
                <th scope="col"><p className='Complain_head_text'>View Details</p></th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th scope="row"><p className='Complain_body_number'>1</p></th>
                <td><p className='Complain_body_text'>Single seat sofa</p></td>
                <td><p className='Complain_body_text'>Richard</p></td>
                <td><p className='Complain_body_text'>22/10, Kazhakuttom,Trivandrum, 584896.</p></td>
                <td><p className='Complain_body_text'>28/06/2024</p></td>
                <td><p className='Complain_body_text'>Delivered</p></td>
                <td><button className='Complain_body_btn Complain_body_btn_text'>View Details</button></td>
              </tr>
              <tr>
                <th scope="row"><p className='Complain_body_number'>2</p></th>
                <td><p className='Complain_body_text'>Single seat sofa</p></td>
                <td><p className='Complain_body_text'>Richard</p></td>
                <td><p className='Complain_body_text'>22/10, Kazhakuttom,Trivandrum, 584896.</p></td>
                <td><p className='Complain_body_text'>28/06/2024</p></td>
                <td><p className='Complain_body_text'>Delivered</p></td>
                <td><button className='Complain_body_btn Complain_body_btn_text'>View Details</button></td>
              </tr>
              <tr>
                <th scope="row"><p className='Complain_body_number'>3</p></th>
                <td><p className='Complain_body_text'>Single seat sofa</p></td>
                <td><p className='Complain_body_text'>Richard</p></td>
                <td><p className='Complain_body_text'>22/10, Kazhakuttom,Trivandrum, 584896.</p></td>
                <td><p className='Complain_body_text'>28/06/2024</p></td>
                <td><p className='Complain_body_text'>Delivered</p></td>
                <td><button className='Complain_body_btn Complain_body_btn_text'>View Details</button></td>
              </tr>
              <tr>
                <th scope="row"><p className='Complain_body_number'>4</p></th>
                <td><p className='Complain_body_text'>Single seat sofa</p></td>
                <td><p className='Complain_body_text'>Richard</p></td>
                <td><p className='Complain_body_text'>22/10, Kazhakuttom,Trivandrum, 584896.</p></td>
                <td><p className='Complain_body_text'>28/06/2024</p></td>
                <td><p className='Complain_body_text'>Delivered</p></td>
                <td><button className='Complain_body_btn Complain_body_btn_text'>View Details</button></td>
              </tr>
              <tr>
                <th scope="row"><p className='Complain_body_number'>5</p></th>
                <td><p className='Complain_body_text'>Single seat sofa</p></td>
                <td><p className='Complain_body_text'>Richard</p></td>
                <td><p className='Complain_body_text'>22/10, Kazhakuttom,Trivandrum, 584896.</p></td>
                <td><p className='Complain_body_text'>28/06/2024</p></td>
                <td><p className='Complain_body_text'>Delivered</p></td>
                <td><button className='Complain_body_btn Complain_body_btn_text'>View Details</button></td>
              </tr>
              <tr>
                <th scope="row"><p className='Complain_body_number'>6</p></th>
                <td><p className='Complain_body_text'>Single seat sofa</p></td>
                <td><p className='Complain_body_text'>Richard</p></td>
                <td><p className='Complain_body_text'>22/10, Kazhakuttom,Trivandrum, 584896.</p></td>
                <td><p className='Complain_body_text'>28/06/2024</p></td>
                <td><p className='Complain_body_text'>Delivered</p></td>
                <td><button className='Complain_body_btn Complain_body_btn_text'>View Details</button></td>
              </tr>
            </tbody>
          </table>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Complaints