import React from 'react'
import "./Shophomenav.css"
import admin from "../../Assets/logo.jpg";
import "../Navbar/Adminloginnav.css"

function Shophomenav() {
  return (
    <>
      <nav class="navbar bg-body-tertiary adminloginnavmain">
    <div class="container-fluid">
      <div class="row justify-content-center w-100">
                <div class="col-auto adminloginnavtext">
            <img src={admin} alt='imag' width="30px" height="30px" style={{marginLeft:"100px"}}/>
          <h5>Rental Furniture</h5>
          <p >Rent A Furniture Online Today</p>
        </div>
      </div>
      <div class="adminloginnavlogout row justify-content-end  w-100 ">
        <button type="submit" onClick={""}>Logout</button>
      </div>
    </div>
  </nav>

    </>
  )
}

export default Shophomenav