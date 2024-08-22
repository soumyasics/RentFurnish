import React, { useEffect, useState } from 'react'
import "./Adminviewtransactions.css"
import Adminnav from '../../Navbar/Adminnav'
import { Link } from 'react-router-dom'
import axiosInstance from '../../Constants/Baseurl'

function Adminviewtransaction() {
    const [profit,setProfit]=useState([])

    useEffect(()=>{
        axiosInstance.post(`viewInspectionsforAdmin`)
        .then((res)=>{
            console.log(res);
            setProfit(res.data.data)
        })
        .catch((err)=>{
            console.log(err);
        })
    },[])
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
            <h6>Customer Name</h6>
            </div>
            <div className='col-2'>
            <h6>Shop Contact</h6>
            </div>
            <div className='col-2'>
            <h6>Total Amount</h6>
            </div>
            <div className='col-2'>
            <h6>Admin Profit</h6>
            </div>
        </div>

        {profit&&profit?.length ? (
        profit
        .slice()
        .reverse()
        .map((a,index) => {
            return(
        <div className='row view-trans-head'>
            <div className='col-2'>
            <p>{index+1}</p>
            </div>
            <div className='col-2'>
            <p>{a?.shopId?.shopname}</p>
            </div>
            <div className='col-2'>
            <p>{a?.customerId?.name}</p>
            </div>
            <div className='col-2'>
            <p>{a?.shopId?.phone}</p>
            </div>
            <div className='col-2'>
            <p>{a?.finalAmount?.toFixed(2)}/-</p>
            </div>
            <div className='col-2'>
            <h5>{a?.adminProfit?.toFixed(2)}/-</h5>
            </div>
        </div>
          );
        })
      ) : (
        <h1 className='ps-5 pt-5'>No Transactions available</h1>
      )}


    </div>
    </div>
    </div>
        
        </div>
  )
}

export default Adminviewtransaction