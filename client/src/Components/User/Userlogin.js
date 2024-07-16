import React, { useState } from 'react';
import "../User/Userlogin.css";
import img from "../../Assets/renthome.jpg";
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import axiosInstance from '../Constants/Baseurl';
import { toast } from 'react-toastify';

function Userlogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const validate = () => {
    const errors = {};
    if (!email) {
      errors.email = 'Email is required';
    }
    if (!password) {
      errors.password = 'Password is required';
    }
    return errors;
  };
  const navigate=useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errors = validate();
    setErrors(errors);

    if (Object.keys(errors).length === 0) {
      setLoading(true);
      try {
        const response = await axiosInstance.post('logincustomer', {
          email,
          password,
        });
        console.log(response);
        if(response.data.status==200){
          toast.success("Login Successfully")
          console.log(response.data.id);
          localStorage.setItem("userid",response.data.id)
          navigate("/user-home")  
        }
        else{
          toast.error(response.data.msg)
        }
      } catch (error) {
        console.error('Error logging in:', error);
        alert(error.response.data.message)
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div className='userlogin-main'>
      <div className='container'>
        <div className='row'>
          <div className='col-sm-12 col-md-8 col-lg-8 userlogin-main-one'>
            <h5>Welcome to <br />Rental property Management System</h5>
            <p>
              <span>Here, we believe that building a strong professional network begins with your participation<br /></span>
              <span id='sp1'>We are delighted to offer a modern and user-friendly service to ensure you have the best experience.</span>
            </p>
            <h6>Join now!</h6>
            <img src={img} alt='Rental Property' width="600px" height="400px" />
          </div>
          <div className='col-sm-12 col-md-4 col-lg-4 userlogin-main-two'>
            <h4>Sign in</h4>
            <form onSubmit={handleSubmit}>
              <div className='col-6 pb-3'>
                <input
                  type='text'
                  placeholder='Enter Your Email'
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                {errors.email && <p className="error">{errors.email}</p>}
              </div>
              <div className='col-6 pb-3'>
                <input
                  type='password'
                  placeholder='Password'
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                {errors.password && <p className="error">{errors.password}</p>}
              </div>
              <div className='col-6 pb-3'>
                <Link to="/userforgetpswd" style={{ textDecoration: "none", color: "black" }}>
                  <p>Recover Password?</p>
                </Link>
              </div>
              <div className='col-6 pb-3'>
                <button type='submit' className='btn btn-primary' disabled={loading}>
                  {loading ? 'Signing in...' : 'Sign in'}
                </button>
              </div>
              <div className='col-6 pb-3'>
                <h6 className='idd1'>OR</h6>
                <Link to="/usersignin" style={{ textDecoration: "none", color: "black" }}>
                  <h6 className='idd2'>Create One?</h6>
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Userlogin;
