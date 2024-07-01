import React from 'react'
import './UserHome.css'

function UserNav2() {
  return (
    <div>
        <nav class="navbar bg-body-tertiary container ">
        <div class="container-fluid user_home_secnav">
            <a class="navbar-brand">Home</a>
            <a class="navbar-brand">About Us</a>
            <a class="navbar-brand">Services</a>
            <a class="navbar-brand">My Orders</a>
            <a class="navbar-brand">Contact</a>
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