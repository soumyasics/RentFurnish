import React, { useState } from 'react'
import "../User/Userlogin.css"
import img from "../../Assets/renthome.jpg"
import { Link, useNavigate } from 'react-router-dom'
import axiosInstance from '../Constants/Baseurl'
import { toast } from 'react-toastify'


function Shoplogin() {
  const [login, setlogin] = useState("")

  const changehandleSubmit = (a) => {
    setlogin({ ...login, [a.target.name]: a.target.value });
  };

  const navigate=useNavigate()
  const submitfn = (e) => {
    e.preventDefault()
    axiosInstance.post(`/shoplogin`, login)
      .then((result) => {
        console.log("data entered", result);
        if (result.data.status==403) {
          // localStorage.setItem("advertiserid", result.data.data._id);
          toast.warn(result.data.msg);
        }
        else if(result.data.status==200){
          localStorage.setItem("shopid", result.data.id)
          toast.success("Login Successfully")
           navigate("/shopdashboard")
        }
         else if (result.data.status == 500) {
          // alert(result.data.msg);
          toast.error(result.data.message)
        }
      })
      .catch((error) => {
        console.log("error", error);
        toast.error(error.response.data.message)
      });
    }


  return (
    <div className='userlogin-main'>
    <div className='container'>
      <div className='row'>
        <div className='col-sm-12 col-md-8 col-lg-8 userlogin-main-one'>
        <h5>Welcome to <br/>Rental  Management System</h5> 
        <p><span>Here,we believe that building a strong professional network begins with your participation<br/></span>
          <span id='sp1'>
        We are,delight  to offer a modern and user-friendly service to ensure you have the best experience.</span>
         </p>
         <h6>Join now !</h6>
         <img src={img} alt='image' width="600px" height="400px"/>
        </div>

        <div className='col-sm-12 col-md-4 col-lg-4 userlogin-main-two'>
          <h4>Shops Sign in</h4>
          <form onSubmit={submitfn}>
       
          <div className='col-6 pb-3"'>
            <input type='text' placeholder='Enter Your Email'
             name='email' value={login.email} onChange={changehandleSubmit}
             required
            />
          </div>
          <div className='col-6 pb-3"'>
            <input type='password' placeholder='Password'
             name='password' value={login.password} onChange={changehandleSubmit} 
             required
            />
          </div>
          <div className='col-6 pb-3'>
           <Link to="/shopforgetpswd" style={{textDecoration:"none", color:"black"}}><p>Recover Password ?</p></Link>
          </div>
          <div className='col-6 pb-3"'>
            <button type='submit' className='btn btn-primary'>Sign in</button>
          </div>
               
          </form>
          <div className='col-8 pb-3"'>
            <h6 className='idd1'>OR</h6>
            <Link to="/shopsignin" style={{textDecoration:"none", color:"black"}}><h6 className='idd2' >Create One ?</h6></Link>
          </div>
          
        </div>

      </div>

    </div>
      
  </div>

  )
}

export default Shoplogin