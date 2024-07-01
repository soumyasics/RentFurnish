import React from 'react'
import './UserHome.css'
import logo from '../../../Assets/RFlogo.png'
import { FaRegBell } from "react-icons/fa6";
import { FaRegHeart } from "react-icons/fa";
import { IoPersonOutline } from "react-icons/io5";
import { FiLogOut } from "react-icons/fi";

function UserNav1() {
  return (
    <div>
       <nav className="navbar navbar-expand bg-body-tertiary">
            <div className="container-fluid">
                <a className="navbar-brand" href="#"><img src={logo} className="img-fluid user_home_logo" alt="Logo" /></a>
                <div className="navbar-collapse justify-content-end" id="navbarNavAltMarkup">
                    <div className="navbar-nav p-4 d-flex flex-row">
                        <a className="nav-link active" aria-current="page" href="#"><FaRegBell size={25} className="user_home_icon" /></a>
                        <a className="nav-link" href="#"><FaRegHeart size={25} className="user_home_icon" /></a>
                        <a className="nav-link" href="#"><IoPersonOutline size={25} className="user_home_icon" /></a>
                        <button className="custom-button"><FiLogOut /> Logout</button>
                    </div>
                </div>
            </div>
        </nav>

    </div>
  )
}

export default UserNav1