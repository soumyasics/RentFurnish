import React, { useState } from 'react';
import './Showdropdown.css';
import { Link } from 'react-router-dom';

const Showdropdown = () => {
  const [openDropdown, setOpenDropdown] = useState(null);

  const toggleDropdown = (dropdown) => {
    setOpenDropdown(openDropdown === dropdown ? null : dropdown);
  };

  return (
    <div className="dropdown">
      <br />
      <div className="dropdown-container padding-1">
        <button
          className={`dropdown-button ${openDropdown === 'dropdown1' ? 'active' : ''}`}
          onClick={() => toggleDropdown('dropdown1')}
        >
          My furniture <i className={`ri-arrow-${openDropdown === 'dropdown1' ? 'up' : 'down'}-s-line`}></i>
        </button>
        {openDropdown === 'dropdown1' && (
          <div className="dropdown-content">
            <button className="dropdown-item">Add furniture</button>
            <button className="dropdown-item">View furniture</button>
          </div>
        )}
      </div>

      <div className="dropdown-container padding-2">
        <button
          className={`dropdown-button ${openDropdown === 'dropdown2' ? 'active' : ''}`}
          onClick={() => toggleDropdown('dropdown2')}
        >
          Orders <i className={`ri-arrow-${openDropdown === 'dropdown2' ? 'up' : 'down'}-s-line`}></i>
        </button>
        {openDropdown === 'dropdown2' && (
          <div className="dropdown-content">
            <button className="dropdown-item">Order request</button>
            <button className="dropdown-item">Order status</button>
          </div>
        )}
      </div>

      <div className="dropdown-container padding-3">
        <button
          className={`dropdown-button ${openDropdown === 'dropdown3' ? 'active' : ''}`}
          onClick={() => toggleDropdown('dropdown3')}
        >
          Delivery Agent <i className={`ri-arrow-${openDropdown === 'dropdown3' ? 'up' : 'down'}-s-line`}></i>
        </button>
        {openDropdown === 'dropdown3' && (
          <div className="dropdown-content">
          <Link to="/add-deliveryagent" style={{textDecoration:"none",color:"black"}}> <button className="dropdown-item">Add delivery Agent</button></Link>
          <Link to="/view-deliveryagentbyshop" style={{textDecoration:"none",color:"black"}}> <button className="dropdown-item">Delivery Agent details</button></Link> 
          </div>
        )}
      </div>
      <br />
      <br />
    </div>
  );
};

export default Showdropdown;
