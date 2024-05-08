import React from 'react'
import "../User/Userlogin.css"
import img from "../../Assets/renthome.jpg"
import { Link } from 'react-router-dom'


function Deliverylogin() {
  return (
    <div className='userlogin-main'>
    <div className='container'>
      <div className='row'>
        <div className='col-sm-12 col-md-8 col-lg-8 userlogin-main-one'>
        <h5>Welcome to <br/>Rental property Management System</h5> 
        <p><span>Here,we believe that building a strong professional network begins with your participation<br/></span>
          <span id='sp1'>
        We are,delight  to offer a modern and user-friendly service to ensure you have the best experience.</span>
         </p>
         <h6>Join now !</h6>
         <img src={img} alt='image' width="600px" height="400px"/>
        </div>
        <div className='col-sm-12 col-md-4 col-lg-4 userlogin-main-two'>
          <h4>Deliveryagent Sign in</h4>
          <div className='col-6 pb-3"'>
            <input type='text' placeholder='Enter Your Email'/>
          </div>
          <div className='col-6 pb-3"'>
            <input type='password' placeholder='Password'/>
          </div>
          <div className='col-6 pb-3'>
           <Link to="/agentrecoverpswd" style={{textDecoration:"none", color:"black"}}><p>Recover Password ?</p></Link>
          </div>
          <div className='col-6 pb-3"'>
            <button type='submit' className='btn btn-primary'>Sign in</button>
          </div>
          <div className='col-6 pb-3"'>
            <h6 className='idd1'>OR</h6>
            <Link to="/agentsignup" style={{textDecoration:"none", color:"black"}}><h6 className='idd2' >Create One ?</h6></Link>
          </div>
          
        </div>

      </div>

    </div>
      
  </div>

  )
}

export default Deliverylogin