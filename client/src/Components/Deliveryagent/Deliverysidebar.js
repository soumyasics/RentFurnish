import React, { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import profile from '../../Assets/image 27.jpg';
import { Modal } from 'react-bootstrap';
import Deliveryprofile from './Deliveryprofile';
import Confirmmodal from '../Navbar/Confirmmodal';
import axiosInstance from '../Constants/Baseurl';
import adminimg from "../../Assets/3699591.jpg";



function Deliverysidebar() {
    const location = useLocation();
    const [activeButton, setActiveButton] = useState('');
    const [showProfileModal, setShowProfileModal] = useState(false);
    const [delivery, setDelivery]=useState({})
    const url = axiosInstance.defaults.url;
    const deliveryid=localStorage.getItem("deliveryid")

    const navigate=useNavigate()

    useEffect(() => {
        const path = location.pathname.split('/')[1];
        setActiveButton(path);
      }, [location]);
    
      //modal function
      const handleProfileImageClick = () => {
        setShowProfileModal(true);
      };
    
      const handleProfileModalClose = () => {
        setShowProfileModal(false);
      };
    
      //logout functionality

const[readerid,setShopid]=useState(null);
const [showModal, setShowModal] = useState(false);

const handleLogout = () => {
  setShowModal(true);
};

const confirmLogout = () => {
  localStorage.removeItem("deliveryid");
  setShopid(null);
  setShowModal(false);
  navigate("/agentlogin");
};
const closeModal = () => {
  setShowModal(false);
}

useEffect(()=>{
    axiosInstance.post(`viewDeliveryAgentbyid/${deliveryid}`)
    .then((res)=>{
      console.log(res);
      setDelivery(res.data.data)
    })
    .catch((err)=>{
      console.log(err);
    })
},[])


  return (
    <div className='row-4' >
      <div className='sidebar'>
        <div className="profile-section">
          <img
          // src={adminimg} 
          src={`${url}/${delivery?.image?.filename}`}
           width="200px" height="200px" alt="Profile" className="profile-image" onClick={handleProfileImageClick}/>
          <h2 className="profile-name">{delivery?.name}</h2>
          <p className="profile-email">{delivery?.email}</p>
        </div>
        <div className="menu">
          <Link className='menu-item' to="/delivery-dashboard">
            <button
              className={` button-style ${activeButton === 'shop-dashboard' ? 'active' : ''}`}
            >
              Dashboard
            </button>
          </Link>
          {/* <Link className='menu-item' to="">
            <button
              className={` button-style ${activeButton === 'shop-returnrequest' ? 'active' : ''}`}
            >
              New Orders
            </button>
          </Link> */}
          <Link className='menu-item' to="/del-pending">
            <button
              className={`button-style ${activeButton === 'shop-inspections' ? 'active' : ''}`}
            >
              Pending Orders
            </button>
          </Link>
          <Link className='menu-item' to="/pending-returns">
            <button
              className={`button-style ${activeButton === 'shop-inspections' ? 'active' : ''}`}
            >
              Inspections
            </button>
          </Link>
          <Link className='menu-item' to="">
            <button
              className={`button-style ${activeButton === 'shop-reviewfeedback' ? 'active' : ''}`}
            >
              Total Deliveries
            </button>
          </Link>
          {/* <Link className='menu-item' to="">
            <button
              className={` button-style ${activeButton === 'shop-complaints' ? 'active' : ''}`}
            >
              Complaints
            </button>
          </Link> */}
          <br /><br />
          <div className="logout-section">
            <button className="logout-button" onClick={handleLogout} >Logout</button>
            <Confirmmodal show={showModal} onClose={closeModal} onConfirm={confirmLogout} />

          </div>
        </div>
      </div>
       <Modal show={showProfileModal} onHide={handleProfileModalClose} dialogClassName="custom-modal" centered > 
        {/* <Modal.Header closeButton> */}
          {/* <Modal.Title>Profile</Modal.Title> */}
        {/* </Modal.Header> */}
         <Modal.Body >
          <Deliveryprofile data={handleProfileModalClose}/>
        </Modal.Body>
      </Modal> 
          </div>
  )
}

export default Deliverysidebar