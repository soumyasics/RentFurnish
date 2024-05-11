import React from 'react'
import "./Admindashboard.css"
import { prepareDataForValidation } from 'formik'

function Admindashbboard() {
  return (
    <>
<div className='container mainclass'>
  <div className='row'>
    <div className='col-12 d-flex justify-content-center buttonmain'>
      <div className='col-sm-3 col-md-3 col-lg-3 pb-3'>
        <button type='submit' className='btn btn-primary btn-block'>View Customer</button>
      </div>
      <div className='col-sm-3 col-md-3 col-lg-3 pb-3'>
        <button type='submit' className='btn btn-primary btn-block'>View Delivery Agent</button>
      </div>
      <div className='col-sm-3 col-md-3 col-lg-3 pb-3'>
        <button type='submit' className='btn btn-primary btn-block'>View Delivery Details</button>
      </div>
      <div className='col-sm-3 col-md-3 col-lg-3 pb-3'>
        <button type='submit' className='btn btn-primary btn-block'>View Transaction</button>
      </div>
    </div>
    <div className='col-12 d-flex boxmain'>
    <div className='col-sm-4 col-md-4 col-lg-4 d-flex pb-4 boxmain1 '>
        <div className='boxinside1 '>
        <div className='ri-store-2-line' style={{padding:"10px",color:"blue", fontSize: "2rem"}}/>
        </div>
        <div className='boxcontent'>
        <h5>10</h5>
        <p>Shop Owners</p>

        </div>
</div>
<div className='col-sm-4 col-md-4 col-lg-4 pb-4 boxmain2'>
        
</div>
<div className='col-sm-4 col-md-4 col-lg-4 pb-4 boxmain3'>
        
</div>


    </div>
  </div>
</div>
    </>
  )
}

export default Admindashbboard