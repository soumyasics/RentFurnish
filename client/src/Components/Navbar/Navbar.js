import React, { useState } from 'react'
import "./Navbar.css"
import { Link, useNavigate} from "react-router-dom"
import admin from "../../Assets/logo1.png";


function Navbar() {
  const navigate = useNavigate();
  const [selectedOption, setSelectedOption] = useState('');

  const handleOptionChange = (event) => {
    const selectedValue = event.target.value;
    setSelectedOption(selectedValue);
    if (selectedValue === 'userlogin') {
      navigate ('/userlogin'); // Navigate to the UserLogin page
    }
    else if(selectedValue === 'shoplogin'){
      navigate('/shoplogin')
    }
    else if(selectedValue === 'agentlogin'){
      navigate('/agentlogin')
    }
    else if(selectedValue === 'adminlogin'){
      navigate('/adminlogin')
    }
  }
  return (
    <div>
        
    <nav className='navmain d-flex'>
      <div className='col-3' style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", textAlign: "center" }}>
      <img src={admin} alt='imag' width="30px" height="30px"/>
          <h5>Rent Furniture</h5>
          <p >Rent A Furniture Online Today</p>

      </div>
      <div
      className='col-9'
       style={{paddingTop:"20px"}}
      >

        <Link to="/">Home</Link>
        {/* <Link to="#">
            <select style={{backgroundColor:"#8e3333"}}>
                <option>Properties</option>
                <option>House</option>
                <option>Car</option>
                <option>Bike</option>
                <option>Home decors</option>
            </select>
        </Link> */}
        <Link to="/about">About</Link>
        <Link to="/user-contactus">Contact</Link>
        {/* <a href="#"> */}
            <select style={{width:"70px",backgroundColor:"#8e3333"}}  value={selectedOption} onChange={handleOptionChange}>
              <option hidden>Login</option>
            <option value="adminlogin"  >Admin</option>
            <option value="shoplogin">Shops</option>     
                <option value="userlogin">User</option>
                <option value="agentlogin">Delivery Agent</option>
                {/* <option>HomeApplinces</option> */}
            </select>
        {/* </a> */}
        </div>

    </nav>

    </div>
  )
}

export default Navbar