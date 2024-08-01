import React, { useState } from 'react'
import "./Adminloginnav.css"
import admin from "../../Assets/rentlogo1.png";
import { useNavigate } from 'react-router-dom';
import { Modal } from 'bootstrap';
import Modals from './Confirmmodal';


function Adminloginnav() {
  const navigate=useNavigate()



  const[readerid,setReaderid]=useState(null);
  const [showModal, setShowModal] = useState(false);

  const handleLogout = () => {
    setShowModal(true);
  };

  const confirmLogout = () => {
    localStorage.removeItem("adminid");
    setReaderid(null);
    setShowModal(false);
    navigate("/adminlogin")
  };

  const closeModal = () => {
    setShowModal(false);
  };

  
  const adminid=localStorage.getItem("adminid")
  console.log(adminid);

  if(adminid ===null){
    navigate("/adminlogin")
  }

  return (
<>
  <nav class="navbar bg-body-tertiary adminloginnavmain">
    <div class="container-fluid">
      <div class="row justify-content-center w-100">
        <div class="col-auto adminloginnavtext">
            <img src={admin} alt='imag' height="100px" style={{marginLeft:"100px"}}/>
          {/* <h5>Rental Furniture</h5> */}
          {/* <p >Rent A Furniture Online Today</p> */}
        </div>
      </div>
      <div class="adminloginnavlogout row justify-content-end  w-100 ">
        <button type="submit" onClick={handleLogout}>Logout</button>
        <Modals show={showModal} onClose={closeModal} onConfirm={confirmLogout} />

      </div>
    </div>
  </nav>
</>
  )
}

export default Adminloginnav