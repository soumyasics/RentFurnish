import React from 'react'
import Showdropdown from './Shopdropdown'
import Shopnav from '../Navbar/Shopnav'
import img from '../../Assets/comp.png'

function ReturnRequest() {
  return (
    <div>
      <Shopnav /><Showdropdown />
      {/* {data && data.length ? ( */}
        {/* data.map((order) => { */}
          {/* return ( */}
            <div className="back_ground ms-5 mb-2 mt-3 container">
              <div className="col">
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
                            {/* <p>{order?.furnitureId?.dimension}</p> */}:   72"L x 36"B x 6"H
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
                    </div>
                    <div className="row">
                      {/* {approvalStatus[order._id] ? ( */}
                        <div className="assign-delv-main">
                          {/* <div></div> */}
                        </div>
                      {/* ) : ( */}
                        <div
                          className="row mt-5 col"
                          style={{ paddingLeft: "100px" }}
                        >
                          <div className="col">
                            <button
                              className="Accept_bg Accept_text ri-checkbox-line"
                              type="button"
                              // onClick={() => handleApprove(order._id)}
                            >
                              Approve
                            </button>
                          </div>
                          <div className="col">
                            <button
                              className="Reject_bg Reject_text ri-close-circle-line"
                              // onClick={() => handleReject(order._id)}
                            >
                              Reject
                            </button>
                          </div>
                        </div>
                      {/* )} */}
                    </div>
                  </div>
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

export default ReturnRequest