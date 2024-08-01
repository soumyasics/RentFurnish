import React from 'react'
import "./Adminviewtransactions.css"
import Adminnav from '../../Navbar/Adminnav'
import { Link } from 'react-router-dom'

function Adminviewtransaction() {
  return (
    <div><Adminnav/>
      <Link to="/admindashboard" style={{textDecoration:"none"}}>  <div className='backoption ri-arrow-left-line'>Transactions</div></Link>
    <div className='view-transactions'>
    <div className='view-transactions-mainbox'>
    <div className='container'>
        <div className='row view-trans-head'>
            <div className='col-2'>
            <h6>Sl No</h6>
            </div>
            <div className='col-2'>
            <h6>Shop Name</h6>
            </div>
            <div className='col-2'>
            <h6>Owner Name</h6>
            </div>
            <div className='col-2'>
            <h6>Contact</h6>
            </div>
            <div className='col-2'>
            <h6>Total Profit</h6>
            </div>
            <div className='col-2'>
            <h6>Admin Profit</h6>
            </div>
        </div>
        <div className='row view-trans-head'>
            <div className='col-2'>
            <p>1</p>
            </div>
            <div className='col-2'>
            <p>Shop Namessssssssssssssssssssssssssssssssssss</p>
            </div>
            <div className='col-2'>
            <p>Shop Namessssssssssssssssssssssssssssssssss</p>
            </div>
            <div className='col-2'>
            <p>Shop Name</p>
            </div>
            <div className='col-2'>
            <p>200/-</p>
            </div>
            <div className='col-2'>
            <h5>1000/-</h5>
            </div>
        </div>
        <div className='row view-trans-head'>
            <div className='col-2'>
            <p>1</p>
            </div>
            <div className='col-2'>
            <p>Shop Namessssssssssssssssssssssssssssssssssss</p>
            </div>
            <div className='col-2'>
            <p>Shop Namessssssssssssssssssssssssssssssssss</p>
            </div>
            <div className='col-2'>
            <p>Shop Name</p>
            </div>
            <div className='col-2'>
            <p>200/-</p>
            </div>
            <div className='col-2'>
            <h5>1000/-</h5>
            </div>
        </div>


    </div>
    </div>
    </div>
        
        </div>
  )
}

export default Adminviewtransaction