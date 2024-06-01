import React, { useEffect, useState } from 'react'
import admin1 from "../../Assets/admin.jpg";
import "../Navbar/Shophomenav.css"
import { Link, useNavigate } from 'react-router-dom';
import axiosInstance from '../Constants/Baseurl';


function Shopprofile({data}) {
    const shopid=localStorage.getItem("shopid")
    console.log(shopid);
    const navigate=useNavigate()
    const url = axiosInstance.defaults.url;
    const [shop,setShop]=useState({})
  
  useEffect(()=>{
    if(shopid==null){
        navigate("/shoplogin")
    }
    else{
      axiosInstance.post(`viewshopbyid/${shopid}`)
      .then((res)=>{
        console.log(res);
       setShop(res.data.data)
      })
      .catch((err)=>{
        console.log(err);
      })
    }
  },[])


  return (
    <div className="modal-container">
    <div className="modal-content">
      <React.Fragment>
        <div className='container'>
          <div className='userprofilehead'>
          <Link onClick={data}  style={{textDecoration:"none"}}> <h3 className='ri-arrow-left-line'  style={{textAlign:"left"}}></h3></Link> 
          </div>
          <div className='row'>
            <div className='col-12 text-center'>
              <div className='userprofileimg'>
                <img 
                 src={`${url}/${shop?.image?.filename}`} 
                // src={admin1}
                alt='Profile image' width="250px" height="250px" style={{borderRadius:"50%"}}/>
                <h4>{shop?.shopname}</h4>
              </div>
            </div>
            <div className='col-12 text-center'>
              <div className='userprofiletable'>
                <table>
                  <tbody>
                    <tr>
                      <td id='td1'>Shop Name</td>
                      <td id='td2'>{shop?.shopname}</td>
                    </tr>
                    <tr>
                      <td id='td1'>Building Name</td>
                      <td id='td2'>{shop?.buildingname}</td>
                    </tr>
                    <tr>
                      <td id='td1'>Email</td>
                      <td id='td2'>{shop?.email}</td>
                    </tr>
                    <tr>
                      <td id='td1'>Phone</td>
                      <td id='td2'>{shop?.phone}</td>
                    </tr>
                    <tr>
                      <td id='td1'>Address:</td>
                      <td id='td2'>{shop?.street}<br/>{shop?.city}<br/>{shop?.state}<br/>{shop?.pincode}</td>
                    </tr>
                    <tr>
                      <td id='td1'>Shop License</td>
                      <td id='td2'> {shop?.regno}</td>
                    </tr>
                  </tbody>
                </table>
              <Link to="/editprofileshop"> <button type='submit' style={{margin:"30px"}}>Edit Profile</button></Link> 
              </div>
            </div>
          </div>
        </div>
      </React.Fragment>
    </div>
  </div>

  )
}

export default Shopprofile