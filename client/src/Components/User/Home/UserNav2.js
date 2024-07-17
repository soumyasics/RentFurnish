import React from 'react'
import './UserHome.css'
import { Link } from 'react-router-dom'

function UserNav2() {
  return (
    <div>
        <nav class="navbar  container ">
        <div class="container-fluid user_home_secnav">
        <Link to="/user-home" style={{textDecoration:"none"}}> <a class="navbar-brand">Home</a></Link>
            <a class="navbar-brand">About Us</a>
           <Link to="/user-services" style={{textDecoration:"none"}}> <a class="navbar-brand">Services</a></Link>
           <Link to="/user-viewmyorder" style={{textDecoration:"none"}}><a class="navbar-brand">My Orders</a></Link> 
           <Link to="/user-contactus" style={{textDecoration:"none"}}><a class="navbar-brand">Contact</a></Link>
            <a class="navbar-brand"></a>
            <a class="navbar-brand"></a>
            <form class="d-flex" role="search">
            <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search"/>
            <button class="btn btn-outline-success" type="submit">Search</button>
            </form>
        </div>
        </nav>
    </div>
  )
}

export default UserNav2