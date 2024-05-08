import React from 'react'
import "../Shops/Shopsignin.css"
import { Link } from "react-router-dom";


function Shopsignin() {
  return (
    <div className="usersignin-main">
    <div className="container">
    <form>
      <div className="row">
       
        <div className="col-sm-12 col-md-6 col-lg-6 usersignin-main-box1">
          <h4>General Information</h4>
          <div className="row usersignin-input">
            <div className="col-12 pb-3" >
              <input type="text" placeholder="Shopname" style={{width:"400px"}}/>
            </div>
            {/* <div className="col-6 pb-3">
              <input type="text" placeholder="Lastname" />
            </div> */}
            <div className="col-12 pb-3">
            <input type="text" placeholder="Reg no"/>
            </div>
            <div className="col-6 pb-3">
              <input type="text" placeholder="Bussiness Type" />
            </div>
            <div className="col-6 pb-3">
              <input type="text" placeholder="Business Category" />
            </div>
            <div className="col-6 pb-3">
            <label for="image">Upload Image</label>
              <input type="file" placeholder="" id="image"/>
            </div>
            <div className="col-12 pb-3">
            <Link to="/shoplogin" style={{textDecoration:"none", color:"black"}}><p>Already Registered ? Login</p></Link>
            </div>
          </div>
        </div>
        <div className="col-sm-12 col-md-6 col-lg-6 usersignin-main-box2">
          <h4>Contact Details</h4>
          <div className="row usersignin-inputs">
          <div className="col-12 pb-3">
          <input type="text" placeholder="Buildingname" style={{width:"400px"}}/>
            </div>
            <div className="col-12 pb-3">
          <input type="text" placeholder="Street" style={{width:"400px"}}/>
            </div>
            <div className="col-6 pb-3" >
          <input type="text" placeholder="City" />
            </div> 
            <div className="col-6 pb-3" >
          <input type="text" placeholder="State" />
            </div>
            <div className='col-12 pb-3 '>
              <select  style={{width:"190px"}}>
                <option>Nationality</option>
                <option>Indian</option>
                <option>America</option>
                <option>London</option>
                <option>Japan</option>
                <option>Uk</option>
                <option>Australia</option>
                <option>England</option>
              </select>
            </div>
            <div className="col-6 pb-3" >
          <input type="number" placeholder="Phone Number" />
            </div> 
            <div className="col-6 pb-3" >
          <input type="email" placeholder="Your Email" />
            </div> 
            <div className="col-6 pb-3" >
            <input type="password" placeholder="Password" />
              </div> 
              <div className="col-6 pb-3" >
            <input type="password" placeholder="Confirm password" />
              </div> 
          </div>
          <button type="submit" className="usersignup-regbtn">Register Now !</button>
        </div>
        
      </div>
      </form>
    </div>
  </div>

  )
}

export default Shopsignin