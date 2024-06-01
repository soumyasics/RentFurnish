import React, { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import profile from '../../Assets/image 27.jpg';
import { Modal } from 'react-bootstrap';
import Deliveryprofile from './Deliveryprofile';



function Deliverysidebar() {
    const location = useLocation();
    const [activeButton, setActiveButton] = useState('');
    const [showProfileModal, setShowProfileModal] = useState(false);


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
  return (
    <div className='row-4' >
      <div className='sidebar'>
        <div className="profile-section">
          <img
          src={profile} 
        //   src={`${url}/${shop?.image?.filename}`}
           width="200px" height="200px" alt="Profile" className="profile-image" onClick={handleProfileImageClick}/>
          <h2 className="profile-name">Name</h2>
          <p className="profile-email">kjscnkjbd@gmail.com</p>
        </div>
        <div className="menu">
          <Link className='menu-item' to="/delivery-dashboard">
            <button
              className={` button-style ${activeButton === 'shop-dashboard' ? 'active' : ''}`}
            >
              Dashboard
            </button>
          </Link>
          <Link className='menu-item' to="">
            <button
              className={` button-style ${activeButton === 'shop-returnrequest' ? 'active' : ''}`}
            >
              New Orders
            </button>
          </Link>
          <Link className='menu-item' to="">
            <button
              className={`button-style ${activeButton === 'shop-inspections' ? 'active' : ''}`}
            >
              Pending Orders
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
            <button className="logout-button" >Logout</button>
            {/* <Confirmmodal show={showModal} onClose={closeModal} onConfirm={confirmLogout} /> */}

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