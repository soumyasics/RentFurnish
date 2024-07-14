import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import adminimg from "../../Assets/3699591.jpg";
import axiosInstance from '../Constants/Baseurl';


function Deliveryprofile({data}) {
  const deliveryid=localStorage.getItem("deliveryid")
  console.log(deliveryid);
  const[del,setDel]=useState({})
  const url = axiosInstance.defaults.url;


  useEffect(()=>{
    axiosInstance.post(`viewDeliveryAgentbyid/${deliveryid}`)
    .then((res)=>{
      console.log(res);
      setDel(res.data.data)
    })
    .catch((err)=>{
      console.log(err);
    })
  },[])

  return (
    <div className="modal-container">
    <div className="modal-content">
      <React.Fragment>
        <div className='container'>
          <div className='userprofilehead'>
          <Link 
          onClick={data} 
           style={{textDecoration:"none"}}> <h3 className='ri-arrow-left-line'  style={{textAlign:"left"}}>Profile</h3></Link> 
          </div>
          <div className='row'>
            <div className='col-12 text-center'>
              <div className='userprofileimg'>
                <img 
                //  src={`${url}/${shop?.image?.filename}`} 
                 src={`${url}/${del?.image?.filename}`}
                alt='Profile image' width="250px" height="250px" style={{borderRadius:"50%"}}/>
                <h4>{del?.name}</h4>
              </div>
            </div>
            <div className='col-12 text-center'>
              <div className='userprofiletable'>
                <table>
                  <tbody>
                    <tr>
                      <td id='td1'> Phone number</td>
                      <td id='td2'>:{del?.phone}</td>
                    </tr>
                    <tr>
                      <td id='td1'>Liccence</td>
                      <td id='td2'>:{del.licenceNumber}</td>
                    </tr>
                    <tr>
                      <td id='td1'>Vehicle Number</td>
                      <td id='td2'>:{del?.vehicleNumber}</td>
                    </tr>
                    <tr>
                      <td id='td1'>Area name/Land mark</td>
                      <td id='td2'>:{del?.address}</td>
                    </tr>
                    <tr>
                      <td id='td1'>District</td>
                      <td id='td2'>:{del?.deliveryDistrict}</td>
                    </tr>
                    <tr>
                      <td id='td1'>Vehichel Type</td>
                      <td id='td2'>:{del?.vehicleType}</td>
                    </tr>
                  </tbody>
                </table>
              <Link to={`/edit-deliveryprofile/${del?._id}`} onClick={data}> <button type='submit' style={{margin:"30px"}}>Edit Profile</button></Link> 
              </div>
            </div>
          </div>
        </div>
      </React.Fragment>
    </div>
  </div>

  )
}

export default Deliveryprofile