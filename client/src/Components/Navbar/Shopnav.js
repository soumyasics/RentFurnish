import React from 'react'
import "./Adminloginnav.css"
import admin from "../../Assets/rentlogo1.png";


function Shopnav() {
  return (
    <div>      <nav class="navbar bg-body-tertiary adminloginnavmain">
    <div class="container-fluid">
      <div class="row justify-content-center w-100">
        <div class="col-auto adminloginnavtext">
            <img src={admin} alt='imag'  height="100px" style={{marginLeft:"100px"}}/>
          {/* <h5>Rent Furniture</h5> */}
          {/* <p >Rent A Furniture Online Today</p> */}
        </div>
      </div>
    </div>
  </nav>
</div>
  )
}

export default Shopnav