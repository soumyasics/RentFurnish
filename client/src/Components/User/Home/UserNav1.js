import React, { useEffect, useState } from 'react'
import './UserHome.css'
import logo from '../../../Assets/RFlogo.png'
import { FaRegBell } from "react-icons/fa6";
import { FaRegHeart } from "react-icons/fa";
import { IoPersonOutline } from "react-icons/io5";
import { FiLogOut } from "react-icons/fi";
import { Link, useNavigate } from 'react-router-dom';
import Confirmmodal from '../../Navbar/Confirmmodal';
import CustViewProfile from '../Profile/CustViewProfile';

function UserNav1() {
  const [readerid, setShopid] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [showProfileModal, setShowProfileModal] = useState(false);
  const navigate = useNavigate();
  const userid = localStorage.getItem("userid");

  useEffect(() => {
    if (userid === null) {
      navigate("/");
    }
  }, [userid, navigate]);

  const handleLogout = () => {
    setShowModal(true);
  };

  const confirmLogout = () => {
    localStorage.removeItem("userid");
    setShopid(null);
    setShowModal(false);
    navigate("/");
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const handleOpenProfile = () => {
    setShowProfileModal(true);
  };

  const handleCloseProfile = () => {
    setShowProfileModal(false);
  };

  return (
    <div>
      <nav className="navbar navbar-expand bg-body-tertiary">
        <div className="container-fluid">
          <a className="navbar-brand" href="#"><img src={logo} className="img-fluid user_home_logo" alt="Logo" /></a>
          <div className="navbar-collapse justify-content-end" id="navbarNavAltMarkup">
            <div className="navbar-nav p-4 d-flex flex-row">
              <Link to="/user-home"><a className="nav-link active" aria-current="page" href="#"><FaRegBell size={25} className="user_home_icon" /></a></Link>
              <Link to="/user-home"><a className="nav-link" href="#"><FaRegHeart size={25} className="user_home_icon" /></a></Link>
              <a className="nav-link" href="#" onClick={handleOpenProfile}><IoPersonOutline size={25} className="user_home_icon" /></a>
              <button className="custom-button" onClick={handleLogout}><FiLogOut /> Logout</button>
              <Confirmmodal show={showModal} onClose={closeModal} onConfirm={confirmLogout} />
            </div>
          </div>
        </div>
      </nav>
      {showProfileModal && <CustViewProfile show={showProfileModal} handleClose={handleCloseProfile} />}
    </div>
  )
}

export default UserNav1;
