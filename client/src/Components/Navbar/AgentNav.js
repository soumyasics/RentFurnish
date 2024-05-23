import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import logo from '../../Assets/logo1.png'

function AgentNav() {
  return (
    <div>
        <div className='header'>
                <img src={logo}></img><br/>
                <h4 className='h1-header'>RENTAL FURNITURE</h4>
                <p>Rent a Furniture Online Today!</p>
            </div>
    </div>
  )
}

export default AgentNav