import React from 'react'
import "./Adminloginnav.css"
import logo from '../../Assets/logoimg.png'
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
            <img src={logo} alt='imag' width="200px" height="80px" style={{marginLeft:"100px"}}/>
          {/* <p >Rent A Furniture Online Today</p> */}
        </div>
      </div>
    </div>
  </nav>

    </>
  )
}

export default Adminnav