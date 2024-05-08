import React, { useState } from 'react'
import "./Navbar.css"
import { useNavigate} from "react-router-dom"

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
        
    <nav className='navmain'>
        <a href="/">Home</a>
        <a href="#">
            <select style={{backgroundColor:"#8e3333"}}>
                <option>Properties</option>
                <option>House</option>
                <option>Car</option>
                <option>Bike</option>
                {/* <option>HomeApplinces</option> */}
                <option>Home decors</option>
            </select>
        </a>
        <a href="#">About</a>
        <a href="#">Contact</a>
        {/* <a href="#"> */}
            <select style={{width:"70px",backgroundColor:"#8e3333"}}  value={selectedOption} onChange={handleOptionChange}>
                <option >Login</option>
                <option value="userlogin">User</option>
                <option value="shoplogin">Shops</option>
                <option value="agentlogin">Delivery Agent</option>
                {/* <option>HomeApplinces</option> */}
                <option value="adminlogin">Admin</option>
            </select>
        {/* </a> */}
    </nav>

    </div>
  )
}

export default Navbar