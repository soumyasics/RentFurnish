import React, { useEffect, useState } from 'react';
import { useLocation, Link, useNavigate } from 'react-router-dom';
import './../Shops/Shopsidebar.css';
import profile from '../../Assets/image 27.jpg';
import Shopprofile from './Shopprofile';
import { Modal } from 'react-bootstrap';
import axiosInstance from '../Constants/Baseurl';
import Confirmmodal from '../Navbar/Confirmmodal';

function Shopsidebar() {
  const location = useLocation();
  const [activeButton, setActiveButton] = useState('');
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [shop,setShop]=useState({})
  const url = axiosInstance.defaults.url;


  const shopid=localStorage.getItem("shopid")
  console.log(shopid);
  const navigate=useNavigate()

  useEffect(() => {
    const path = location.pathname.split('/')[1];
    setActiveButton(path);
  }, [location]);

  const handleProfileImageClick = () => {
    setShowProfileModal(true);
  };

  const handleProfileModalClose = () => {
    setShowProfileModal(false);
  };

//viewprofile functionality
  useEffect(()=>{
    axiosInstance.post(`viewshopbyid/${shopid}`)
    .then((res)=>{
      console.log(res);
      setShop(res.data.data)
    })
    .catch((err)=>{
      console.log(err);
    })
  },[])

//logout functionality
const[readerid,setShopid]=useState(null);
const [showModal, setShowModal] = useState(false);

const handleLogout = () => {
  setShowModal(true);
};

const confirmLogout = () => {
  localStorage.removeItem("shopid");
  setShopid(null);
  setShowModal(false);
  navigate("/shoplogin");
};
const closeModal = () => {
  setShowModal(false);
};

  return (
    <div className='row-4' >
      <div className='sidebar'>
        <div className="profile-section">
          <img src={`${url}/${shop?.image?.filename}`} width="200px" height="200px" alt="Profile" className="profile-image" onClick={handleProfileImageClick}/>
          <h2 className="profile-name">{shop?.shopname}</h2>
          <p className="profile-email">{shop?.email}</p>
        </div>
        <div className="menu">
          <Link className='menu-item' to="/shop-dashboard">
            <button
              className={` button-style ${activeButton === 'shop-dashboard' ? 'active' : ''}`}
            >
              Dashboard
            </button>
          </Link>
          <Link className='menu-item' to="/shop-returnrequest">
            <button
              className={` button-style ${activeButton === 'shop-returnrequest' ? 'active' : ''}`}
            >
              Return Request
            </button>
          </Link>
          <Link className='menu-item' to="/shop-inspection">
            <button
              className={`button-style ${activeButton === 'shop-inspections' ? 'active' : ''}`}
            >
              Inspections
            </button>
          </Link>
          <Link className='menu-item' to="/shop-reviewfeedback">
            <button
              className={`button-style ${activeButton === 'shop-reviewfeedback' ? 'active' : ''}`}
            >
              Review and Feedback
            </button>
          </Link>
          <Link className='menu-item' to="/shop-viewcomplaint">
            <button
              className={` button-style ${activeButton === 'shop-complaints' ? 'active' : ''}`}
            >
              Complaints
            </button>
          </Link>
          <br /><br />
          <div className="logout-section">
            <button className="logout-button" onClick={handleLogout}>Logout</button>
            <Confirmmodal show={showModal} onClose={closeModal} onConfirm={confirmLogout} />

          </div>
        </div>
      </div>
      <Modal show={showProfileModal} onHide={handleProfileModalClose} dialogClassName="custom-modal" centered >
        {/* <Modal.Header closeButton> */}
          {/* <Modal.Title>Profile</Modal.Title> */}
        {/* </Modal.Header> */}
        <Modal.Body >
          <Shopprofile data={handleProfileModalClose}/>
        </Modal.Body>
      </Modal>
          </div>
  );
}

export default Shopsidebar;
