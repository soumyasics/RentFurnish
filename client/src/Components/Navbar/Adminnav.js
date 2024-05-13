import React from 'react'
import "./Adminloginnav.css"
import admin from "../../Assets/logo1.png";
import { useNavigate } from 'react-router-dom';


function Adminnav() {
    const navigate=useNavigate()
    const adminid=localStorage.getItem("adminid")
    console.log(adminid);
  
    if(adminid ===null){
      navigate("/adminlogin")
    }
  
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
    </div>
  </nav>

    </>
  )
}

export default Adminnav