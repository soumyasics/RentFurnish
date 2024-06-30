import React, { useState } from 'react'
import img from "../../Assets/forgetpswd.jpg"
import { Link, useNavigate } from 'react-router-dom'
import img2 from "../../Assets/rightarrow.png"
import axiosInstance from '../Constants/Baseurl'
import { toast } from 'react-toastify'


function Userforgetpswd() {
  const navigate=useNavigate()

  const [password, setPassword] = useState({
    email: "",
    password: "",
    confirmpassword: ""
  })
  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");

  const changehandleSubmit = (e) => {
    setPassword({ ...password, [e.target.name]: e.target.value });
  };
  console.log(password);
  const validatePassword = (password) => {

    if (password.length < 8) {
      return 'Password must be at least 8 characters long';
    }
    return '';
  };

  const handlesubmit = (e) => {
    e.preventDefault()
    const passwordError = validatePassword(password.password);
    const confirmPasswordError = password.password !== password.confirmpassword ? 'Passwords do not match' : '';

    setPasswordError(passwordError);
    setConfirmPasswordError(confirmPasswordError);

    if (!passwordError && !confirmPasswordError) {

      axiosInstance.post(`/forgotPwdcustomer`, password)
        .then((result) => {
          console.log(result);

          if (result.data.status == 200) {
            toast.success("updated sucessfully")
            navigate("/shoplogin")

          }
          else if (result.data.status == 500) {
            toast.error("usernot found")
          }
        })
        .catch((err) => {
          console.log("error", err);
        })
    }
  }


  return (
    <div className='userlogin-main'>
    <div className='container'>
    <Link to="/userlogin"><img src={img2} alt="right" width="30px" height="30px"/></Link>

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
          <form onSubmit={handlesubmit}>
          <h4>Recover Password</h4>
          <div className='col-6 pb-3"'>
          <input type='text' placeholder='Enter Your Email' name='email' value={password.email} onChange={changehandleSubmit}/>
          </div>
          <div className='col-6 pb-3"'>
          <input type='password' placeholder='Enter Password'
             name='password' value={password.password} onChange={changehandleSubmit} 
            />
                            {passwordError && <p className='error-message'>{passwordError}</p>}
          </div>
          <div className='col-6 pb-3"'>
          <input type='password' placeholder='ReEnter Password' name='confirmpassword' value={password.confirmpassword} onChange={changehandleSubmit} />
            {confirmPasswordError && <p className='error-message'>{confirmPasswordError}</p>}
          </div>
          
          <div className='col-6 pb-3 ' style={{paddingTop:"60px"}}>
            <button type='submit' className='btn btn-primary'>Confirm Update</button>
          </div>
          </form>
          
        </div>

      </div>

    </div>
      
  </div>

  )
}

export default Userforgetpswd