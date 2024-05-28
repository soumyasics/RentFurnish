import React, { useEffect, useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import './../Shops/Shopsidebar.css';
import profile from '../../Assets/image 27.jpg';

function Shopsidebar() {
  const location = useLocation();
  const [activeButton, setActiveButton] = useState('');

  useEffect(() => {
    const path = location.pathname.split('/')[1];
    setActiveButton(path);
  }, [location]);

  return (
    <div className='row-4'>
      <div className='sidebar'>
        <div className="profile-section">
          <img src={profile} alt="Profile" className="profile-image" />
          <h2 className="profile-name">Ashok N K</h2>
          <p className="profile-email">ashok23@gmail.com</p>
        </div>
        <div className="menu">
          <Link className='menu-item' to="/shop-dashboard">
            <button
              className={` button-style ${activeButton === 'shop-dashboard' ? 'active' : ''}`}
            >
              Dashboard
            </button>
          </Link>
          <Link className='menu-item' to="/shop-returnrequest">
            <button
              className={` button-style ${activeButton === 'shop-returnrequest' ? 'active' : ''}`}
            >
              Return Request
            </button>
          </Link>
          <Link className='menu-item' to="/shop-inspection">
            <button
              className={`button-style ${activeButton === 'shop-inspections' ? 'active' : ''}`}
            >
              Inspections
            </button>
          </Link>
          <Link className='menu-item' to="/shop-reviewfeedback">
            <button
              className={`button-style ${activeButton === 'shop-reviewfeedback' ? 'active' : ''}`}
            >
              Review and Feedback
            </button>
          </Link>
          <Link className='menu-item' to="/shop-complaints">
            <button
              className={` button-style ${activeButton === 'shop-complaints' ? 'active' : ''}`}
            >
              Complaints
            </button>
          </Link>
          <br /><br />
          <div className="logout-section">
            <button className="logout-button">Logout</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Shopsidebar;
