import React, { useEffect, useState } from 'react'
import Shopnav from '../../Navbar/Shopnav'
import Showdropdown from '../Shopdropdown'
import "./OrderStatus.css"
import axiosInstance from '../../Constants/Baseurl'

function OrderStatus() {
  const shopId = localStorage.getItem("shopid");
  const [data,setData]=useState([])
  const url = axiosInstance.defaults.url;

  useEffect(()=>{
    axiosInstance.post(`viewassignedOrdersForDelivery/${shopId}`)
    .then((result)=>{
      console.log(result);
      const sortedData = result.data.data.sort((a, b) => {
        const dateA = new Date(a.deliveryDate).setHours(0, 0, 0, 0);
        const dateB = new Date(b.deliveryDate).setHours(0, 0, 0, 0);
        return dateA - dateB;
      });
      setData(result.data.data)
    })
    .catch((err)=>{
      console.log(err);
    })
  },[])
  return (
    <div>
        <Shopnav/><Showdropdown/>
        <div>
        {data && data.length ? (
        data.map((order) => {
          return (

        <div  className="order_status_main ms-5 mb-2 mt-3 container">
              <div className="col">
                <div className="row ">
                  <div className="col">
                    <img
                      className="mt-5 ms-3 img-fluid product_img"
                      src={`${url}/${order?.furnitureId?.image1?.filename}`}
                      alt="Product"
                    />
                  </div>
                  <div className="col-8">
                    <div className="row">
                      <div className="col-6 mt-5">
                        <p className="Furniture_text">Furniture details</p>
                        <div className="row mt-4">
                          <div className="col Furniture_details_text">
                            <p>Furniture Type :</p>
                          </div>
                          <div className="col Furniture_details_text2">
                            <p>{order?.furnitureId?.category}</p>
                          </div>
                        </div>
                        <div className="row">
                          <div className="col Furniture_details_text">
                            <p>Quantity:</p>
                          </div>
                          <div className="col Furniture_details_text2">
                            <p>{order?.count}</p>
                          </div>
                        </div>
                        <div className="row">
                          <div className="col Furniture_details_text">
                            <p>No Of Days:</p>
                          </div>
                          <div className="col Furniture_details_text2">
                            <p>{order?.noOfDays}</p>
                          </div>
                        </div>

                        <div className="row">
                          <div className="col Furniture_details_text">
                            <p>Dimension :</p>
                          </div>
                          <div className="col Furniture_details_text2">
                            <p>{order?.furnitureId?.dimension}</p>
                          </div>
                        </div>
                        <div className="row">
                          <div className="col Furniture_details_text">
                            <p>price :</p>
                          </div>
                          <div className="col Furniture_details_text2">
                            <p>{order?.amount}</p>
                          </div>
                        </div>
                      </div>
                      <div className="col-6 mt-5">
                        <p className="Customer_text">Customer information</p>
                        <div className="row mt-4">
                          <div className="col Furniture_details_text">
                            <p>Name:</p>
                          </div>
                          <div className="col Furniture_details_text2">
                          <p>{order?.name?order.name:order?.customerId?.name}</p>
                          </div>
                        </div>
                        <div className="row">
                          <div className="col Furniture_details_text">
                            <p>Email:</p>
                          </div>
                          <div className="col Furniture_details_text2">
                          <p>{order?.email?order.email: order?.customerId?.email}</p>
                          </div>
                        </div>
                        <div className="row">
                          <div className="col Furniture_details_text">
                            <p>Phone number :</p>
                          </div>
                          <div className="col Furniture_details_text2">
                          <p>{order?.contact?order.contact: order?.customerId?.phone}</p>
                          </div>
                        </div>
                        <div className="row">
                          <div className="col Furniture_details_text">
                            <p>Address :</p>
                          </div>
                          <div className="col Furniture_details_text2">
                          <p>{order?.address?order.address:order?.customerId?.address}</p>
                          </div>
                        </div>
                      </div>
                      
                    </div>
                    <div className='row'>
                    <div className="col-6 mt-5">
                        <p className="Customer_text">Delivery Agent</p>
                        <div className="row mt-4">
                          <div className="col Furniture_details_text">
                            <p>Name:</p>
                          </div>
                          <div className="col Furniture_details_text2">
                            <p>{order?.deliveryId?.name}</p>
                          </div>
                        </div>
                        <div className="row">
                          <div className="col Furniture_details_text">
                            <p>Phone:</p>
                          </div>
                          <div className="col Furniture_details_text2">
                            <p>{order?.deliveryId?.email}</p>
                          </div>
                        </div>
                        <div className="row">
                          <div className="col Furniture_details_text">
                            <p>Vehicle Type :</p>
                          </div>
                          <div className="col Furniture_details_text2">
                            <p>{order?.deliveryId?.vehicleType}</p>
                          </div>
                        </div>
                        <div className="row">
                          <div className="col Furniture_details_text">
                            <p>Vehicle Number :</p>
                          </div>
                          <div className="col Furniture_details_text2">
                            <p>{order?.deliveryId?.vehicleNumber}</p>
                          </div>
                        </div>
                      </div>
                      <div className='col-6 mt-5'>
                        <h6 className='Customer_text'>Expected Delivery Date</h6>
                        <p className='Furniture_details_text'>{new Date(order?.deliveryDate).toLocaleDateString()}</p>
                      </div>

                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })
      ) : (
        <div className="viewcounsellor-lottiereqq" style={{textAlign:"center"}}>No request found</div>
      )}

        </div>
        
    </div>
  )
}

export default OrderStatus