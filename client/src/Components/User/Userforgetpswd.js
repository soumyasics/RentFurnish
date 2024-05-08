import React from 'react'
import img from "../../Assets/forgetpswd.jpg"
import { Link } from 'react-router-dom'
import img2 from "../../Assets/rightarrow.png"


function Userforgetpswd() {
  return (
    <div className='userlogin-main'>
    <div className='container'>
    <Link to="/userlogin"><img src={img2} alt="right" width="50px" height="40px"/></Link>

      <div className='row'>
        <div className='col-sm-12 col-md-8 col-lg-8 userlogin-main-one' style={{paddingTop:"10px"}}>
        <h5>Welcome to <br/>Rental property Managememnt System</h5> 
        {/* <p><span>Here,we believe that building a strong professional network begins with your participation<br/></span>
          <span id='sp1'>
        We are,delight  to offer a modern and user-friendly service to ensure you have the best experience.</span>
         </p>
         <h6>Join now !</h6> */}
         <img src={img} alt='image' width="600px" height="500px"/>
        </div>
        <div className='col-sm-12 col-md-4 col-lg-4 userlogin-main-two'>
          <h4>Recover Password</h4>
          <div className='col-6 pb-3"'>
            <input type='text' placeholder='Enter Your Email'/>
          </div>
          <div className='col-6 pb-3"'>
            <input type='password' placeholder='Enter Password'/>
          </div>
          <div className='col-6 pb-3"'>
            <input type='password' placeholder='ReEnter Password'/>
          </div>
          
          <div className='col-6 pb-3 ' style={{paddingTop:"60px"}}>
            <button type='submit' className='btn btn-primary'>Confirm Update</button>
          </div>
          
          
        </div>

      </div>

    </div>
      
  </div>

  )
}

export default Userforgetpswd