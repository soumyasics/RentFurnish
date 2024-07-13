import React, { useEffect, useState } from 'react'
import '../Complaints/Complaints.css'
import Search from '../../../Assets/search-line.png';
import axiosInstance from '../../Constants/Baseurl';
import { Link } from 'react-router-dom';
import Adminloginnav from '../../Navbar/Adminloginnav';
function Complaints() {
  const [complaint,setComplaint]=useState([])

  useEffect(()=>{
    axiosInstance.post(`viewAllcomplaints`)
    .then((res)=>{
      console.log(res);
      setComplaint(res.data.data)
    })
    .catch((err)=>{
      console.log(err);
    })
  },[])

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  }
  return (
    <div>
      <Adminloginnav/>
      <div className='viewcomplaints-head'>
    <Link to="/admindashboard" style={{textDecoration:"none"}}>  <h1 className='ri-arrow-left-line'>View Complaints</h1></Link>
      </div>
      {/* <div className=' mt-5 px-5 col-sm-6 col-md-6 col-lg-3  d-flex float-end'> */}
        {/* <div className=''>
        <input type='search' className='form-control rounded-5 float-end ' placeholder='search here'></input> */}

        {/* </div> */}
      {/* </div> */}
      
      <div className='col-sm-11 d-flex  justify-content-end  mt-5 ms-5 '>
        <div className='border col-sm-12 col-md-12 col-lg-12 ms-5 mt-5 rounded-2 shadow-lg'>
          <div className='table-responsive-md'>
          <table className="table table table-borderless">
            <thead>
              
              <tr >
                <th scope="col"><p className='Complain_head_text'>SI No</p></th>
                <th scope="col"><p className='Complain_head_text'>Customer Name</p></th>
                <th scope="col"><p className='Complain_head_text'>Shop Name</p></th>
                <th scope="col"><p className='Complain_head_text'>Complaint Description</p></th>
                <th scope="col"><p className='Complain_head_text'>Date</p></th>
                <th scope="col"><p className='Complain_head_text'>View Details</p></th>
              </tr>
            </thead>
            <tbody>

            {complaint && complaint.length ? (
                    complaint.map((complaint,index) => (

              <tr>
                <th scope="row"><p className='Complain_body_number'>{index+1}</p></th>
                <td><p className='Complain_body_text'>{complaint?.shopId?.shopname}</p></td>
                <td><p className='Complain_body_text'>{complaint?.userId?.name}</p></td>
                <td><p className='Complain_body_text'>{complaint?.complaint}</p></td>
                <td><p className='Complain_body_text'>{formatDate(complaint?.date)}</p></td>
                <td><button className='Complain_body_btn Complain_body_btn_text'>View Details</button></td>
              </tr>
                    ))
                  ) : (
                      <div className="text-center">
                          <p>No furniture available.</p>
                      </div>
                  )}
  

            </tbody>
          </table>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Complaints