import React, { useState } from 'react'
import "./Adminloginnav.css"
import admin from "../../Assets/logo1.png";
import { useNavigate } from 'react-router-dom';


function Adminloginnav() {
  const navigate=useNavigate()
  const[readerid,setReaderid]=useState(null);
  const handleLogout = () => {
    localStorage.removeItem("adminid");
    setReaderid(null);
    navigate("/adminlogin")
  };
  
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
      <div class="adminloginnavlogout row justify-content-end  w-100 ">
        <button type="submit" onClick={handleLogout}>Logout</button>
      </div>
    </div>
  </nav>
</>
  )
}

export default Adminloginnav