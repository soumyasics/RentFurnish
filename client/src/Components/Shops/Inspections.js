import React from 'react'
import Shopnav from '../Navbar/Shopnav'
import Showdropdown from './Shopdropdown'
import img from '../../Assets/comp.png'
import './Inspections.css'
import placeholderimg from '../../Assets/addfurniture_sub.png'

function Inspections() {
  return (
    <div>
      <Shopnav />
      <Showdropdown />
      {/* {data && data.length ? ( */}
      {/* data.map((order) => { */}
      {/* return ( */}
      <div className="inspection_back_ground ms-5 mb-2 mt-3 container">
        <div>
          <div className="row">
            <div className="col">
              <img
                className="mt-5 ms-3 img-fluid product_img"
                // src={`${url}/${order?.furnitureId?.image1?.filename}`}
                src={img}
                alt="Product"
              />
            </div>
            <div className="col-8">
              <div className="row">
                <div className="col mt-5">
                  <p className="Furniture_text">Furniture details</p>
                  <div className="row mt-4">
                    <div className="col Furniture_details_text">
                      <p>Furniture Type :</p>
                    </div>
                    <div className="col Furniture_details_text2">
                      {/* <p>{order?.furnitureId?.category}</p> */}Sofa
                    </div>
                  </div>
                  <div className="row">
                    <div className="col Furniture_details_text">
                      <p>Quantity:</p>
                    </div>
                    <div className="col Furniture_details_text2">
                      {/* <p>{order?.count}</p> */}1
                    </div>
                  </div>
                  <div className="row">
                    <div className="col Furniture_details_text">
                      <p>Dimension :</p>
                    </div>
                    <div className="col Furniture_details_text2">
                      {/* <p>{order?.furnitureId?.dimension}</p> */}  72"L x 36"B x 6"H
                    </div>
                  </div>
                  {/* <div className="row">
                          <div className="col Furniture_details_text">
                            <p>price :</p>
                          </div>
                          <div className="col Furniture_details_text2">
                            <p>{order?.amount}</p>
                          </div>
                        </div> */}
                </div>
                <div className="col mt-5">
                  <p className="Customer_text">Customer information</p>
                  <div className="row mt-4">
                    <div className="col Furniture_details_text">
                      <p>Name:</p>
                    </div>
                    <div className="col Furniture_details_text2">
                      {/* <p>{order?.name ? order.name : order?.customerId?.name}</p> */}Ashok N K
                    </div>
                  </div>
                  <div className="row">
                    <div className="col Furniture_details_text">
                      <p>Email:</p>
                    </div>
                    <div className="col Furniture_details_text2">
                      {/* <p>{order?.email ? order.email : order?.customerId?.email}</p> */}   ashok23@gmail.com
                    </div>
                  </div>
                  <div className="row">
                    <div className="col Furniture_details_text">
                      <p>Phone number :</p>
                    </div>
                    <div className="col Furniture_details_text2">
                      {/* <p>{order?.contact ? order.contact : order?.customerId?.phone}</p> */}  1023456789
                    </div>
                  </div>
                  <div className="row">
                    <div className="col Furniture_details_text">
                      <p>Address :</p>
                    </div>
                    <div className="col Furniture_details_text2">
                      {/* <p>{order?.address ? order.address : order?.customerId?.address}</p> */} 2/12A Near New Bus Stand Marthandam
                    </div>
                  </div>
                </div>
                <div>
                  <textarea className='form-control p-3 mt-4'>The product is not in a good condition and some of the furniture missing.</textarea>
                </div>
              </div>
            </div>
          </div>
          <div className='row m-5'>
                <div className='col-6'> 
                <p className="Customer_text">Photo Uploaded</p>
                <div className='row'>
                  <div className='col-4'>
                    <img src={placeholderimg} className='img-fluid '></img>
                  </div>
                  <div className='col-4'>
                  <img src={placeholderimg} className='img-fluid '></img>
                  </div>
                  <div className='col-4'>
                  <img src={placeholderimg} className='img-fluid '></img>
                  </div>
                </div>
                <div className='row mt-3'>
                  <div className='col-4'>
                    <img src={placeholderimg} className='img-fluid '></img>
                  </div>
                  <div className='col-4'>
                  <img src={placeholderimg} className='img-fluid '></img>
                  </div>
                  <div className='col-4'>
                  <img src={placeholderimg} className='img-fluid '></img>
                  </div>
                </div>
                </div>
                <div className='col-6'> 
                <p className="Customer_text pb-3">Add Fine</p>
                <div className='row'>
                  
                      <div className='col-6'>
                        <p className="inspection_fine_text">Rent Amount </p>
                        <input type='text' className='form-control form-control-lg' value='₹2,499/-'/>
                        </div>

                      <div className='col-6'>
                      <p className="inspection_fine_text">Fine Amount </p>
                      <input type='text' className='form-control form-control-lg' value='₹2,499/-'/>
                      </div>
                </div>
                <div className='row mt-3'>
                  <div className='col-6'>
                    <p className="inspection_fine_text">Deposit Amount </p>
                    <input type='text' className='form-control form-control-lg' value='₹2,499/-'></input>
                    </div>
                  <div className='col-6'></div>
                </div>
                </div>
          </div>
          <div className="text-center m-4">
            <button type="submit" className="btn btn-warning">
              &nbsp;&nbsp; Confirm &nbsp;&nbsp;
            </button>
          </div>
        </div>
      </div>
      {/* ); */}
      {/* }) */}
      {/* ) : (
        <div className="viewcounsellor-lottiereqq">No request found</div>
      )} */}
    </div>
  )
}

export default Inspections