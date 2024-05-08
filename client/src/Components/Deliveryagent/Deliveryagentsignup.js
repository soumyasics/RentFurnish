import React from 'react'
import "../User/Usersignup.css";
import { Link } from "react-router-dom";

function Deliveryagentsignup() {
  return (
    <div className="usersignin-main">
    <div className="container">
    <form>
      <div className="row">
       
        <div className="col-sm-12 col-md-6 col-lg-6 usersignin-main-box1">
          <h4>General Information</h4>
          <div className="row usersignin-input">
            <div className="col-6 pb-3">
              <input type="text" placeholder="Firstname" />
            </div>
            <div className="col-6 pb-3">
              <input type="text" placeholder="Lastname" />
            </div>
            <div className="col-12 pb-3">
              <label for="gender" className="pb-3">
                Gender :{" "}
              </label>
              <label for="male"> &nbsp;Male &nbsp;</label>
              <input type="radio" id="male" />
              <label for="female">&nbsp;Female&nbsp;</label>
              <input type="radio" id="female" />
              <label for="others">&nbsp;Others&nbsp;</label>
              <input type="radio" id="others" />
            </div>
            <div className="col-12 pb-3">
            <input type="number" placeholder="Age"/>
            </div>
            <div className="col-6 pb-3">
            <input type="text" placeholder="Vehicle type"/>
            </div>
            <div className="col-6 pb-3">
            <input type="text" placeholder="Vehicle regno"/>
            </div>
            <div className="col-12 pb-3">
              <label for="image">Upload Image</label>
            <input type="file" placeholder="" id="image"/>
            </div>
            <div className="col-12 pb-3">
            <Link to="/agentlogin" style={{textDecoration:"none", color:"black"}}><p>Already Registered ? Login</p></Link>
            </div>
          </div>
        </div>
        <div className="col-sm-12 col-md-6 col-lg-6 usersignin-main-box2">
          <h4>Contact Details</h4>
          <div className="row usersignin-inputs">
          <div className="col-12 pb-3">
          <input type="text" placeholder="Housename" style={{width:"400px"}}/>
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

export default Deliveryagentsignup