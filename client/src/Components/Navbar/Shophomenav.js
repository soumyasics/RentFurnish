import React, { useEffect, useState } from 'react'
import "./Shophomenav.css"
import admin from "../../Assets/logo1.png";
import admin1 from "../../Assets/admin.jpg";
import "../Navbar/Adminloginnav.css"
import { Link, useNavigate } from 'react-router-dom';
import axiosInstance from '../Constants/Baseurl';
import Modal from './Confirmmodal';


function Shophomenav() {
  const navigate=useNavigate()
  const url = axiosInstance.defaults.url;

  const [showProfileModal, setShowProfileModal] = useState(false);

  const toggleProfileModal = () => {
    setShowProfileModal(!showProfileModal);
  };

  const shopid=localStorage.getItem("shopid")
  console.log(shopid);

  if(shopid===null){
    navigate("/shoplogin")
  }

  const[shop,setShop]=useState({})

  useEffect(()=>{
    axiosInstance.post(`/viewshopbyid/${shopid}`)
    .then((res)=>{
      console.log(res);
      setShop(res.data.data)
    })
    .catch((err)=>{
      console.log(err);
    })
  },[])

  const[readerid,setReaderid]=useState(null);
  const [showModal, setShowModal] = useState(false);

  const handleLogout = () => {
    setShowModal(true);
  };

  const confirmLogout = () => {
    localStorage.removeItem("shopid");
    setReaderid(null);
    setShowModal(false);
    navigate("/shoplogin");
  };
  const closeModal = () => {
    setShowModal(false);
  };


  return (
    <>
      <nav class="navbar bg-body-tertiary adminloginnavmain">
    <div class="container-fluid">
      <div class="row justify-content-center w-100">
        <div style={{marginBottom:"-70px",marginTop:"40px"}} className='shopnavpro' >
          <p className='ri-user-line' onClick={toggleProfileModal}>Profile</p>
        </div>
                <div class="col-auto adminloginnavtext">
            <img src={admin} alt='imag' width="30px" height="30px" style={{marginLeft:"100px"}}/>
          <h5>Rental Furniture</h5>
          <p >Rent A Furniture Online Today</p>
        </div>
      </div>
      <div class="adminloginnavlogout row justify-content-end  w-100 " style={{marginTop:"-70px"}}>
        <button type="submit" onClick={handleLogout} >Logout</button>
        <Modal show={showModal} onClose={closeModal} onConfirm={confirmLogout} />
      </div>
    </div>
  </nav>



  {/* <React.Fragment>
  <div className='container'>
    <div className='userprofilehead'>
      <h3 className='ri-arrow-left-line'>Profile</h3>
    </div>
    <div className='row'>
      <div className='col-12 text-center'>
        <div className='userprofileimg'>
          <img src={admin1} alt='Profile image' width="250px" height="250px" />
          <h4>Ashok.N</h4>
        </div>
      </div>
      <div className='col-12 text-center'>
        <div className='userprofiletable'>
          <table>
            <tbody>
              <tr>
                <td id='td1'>Shop Name</td>
                <td id='td2'>: Akash</td>
              </tr>
              <tr>
                <td id='td1'>Building Name</td>
                <td id='td2'>: Akash</td>
              </tr>
              <tr>
                <td id='td1'>Email</td>
                <td id='td2'>: Akash</td>
              </tr>
              <tr>
                <td id='td1'>Phone</td>
                <td id='td2'>: Akash</td>
              </tr>
              <tr>
                <td id='td1'>Address:</td>
                <td id='td2'>: Akash</td>
              </tr>
              <tr>
                <td id='td1'>Shop Liscence</td>
                <td id='td2'>: Akash</td>
              </tr>

            </tbody>
          </table>
          <button type='submit' >Edit Profile</button>
        </div>
      </div>
    </div>
  </div>
</React.Fragment> */}
{showProfileModal && (
  <div className="modal-container">
    <div className="modal-content">
      <React.Fragment>
        <div className='container'>
          <div className='userprofilehead'>
          <Link to="/shopdashboard"  style={{textDecoration:"none"}}> <h3 className='ri-arrow-left-line' onClick={toggleProfileModal}>Profile</h3></Link> 
          </div>
          <div className='row'>
            <div className='col-12 text-center'>
              <div className='userprofileimg'>
                <img src={`${url}/${shop?.image?.filename}`} alt='Profile image' width="250px" height="250px" />
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
                      <td id='td2'>{shop?.city},{shop?.street},{shop?.sate},{shop?.pincode}</td>
                    </tr>
                    <tr>
                      <td id='td1'>Shop License</td>
                      <td id='td2'> {shop?.regno}</td>
                    </tr>
                  </tbody>
                </table>
              <Link to="/editprofileshop"> <button type='submit'>Edit Profile</button></Link> 
              </div>
            </div>
          </div>
        </div>
      </React.Fragment>
    </div>
  </div>
)}    </>
  )
}

export default Shophomenav