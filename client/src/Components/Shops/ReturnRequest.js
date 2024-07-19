import React, { useEffect, useState } from 'react'
import Showdropdown from './Shopdropdown'
import Shopnav from '../Navbar/Shopnav'
import img from '../../Assets/comp.png'
import axiosInstance from '../Constants/Baseurl';
import axiosMultipartInstance from '../Constants/FormDataUrl';

function ReturnRequest() {
  const [data, setData] = useState([]);
  const url = axiosInstance.defaults.url;
  const shopId = localStorage.getItem("shopid")

  useEffect(() => {
    axiosMultipartInstance.post(`/viewReturnByShopId/${shopId}`)
      .then(response => {
        console.log(response);
        if (response.data.status === 200) {
          setData(response.data.data);
        } else {
          console.log('No data obtained');
        }
      })
      .catch(error => {
        console.error('Error fetching furniture data:', error);
      });
  }, []);

  return (
    <div>
      <Shopnav /><Showdropdown />
      {data.length >0 ?(
        data.map(furniture=>(

        
      <div className="back_ground ms-5 mb-2 mt-3 container">
        <div className="col">
          <div className="row">
            <div className="col">
              <img
                className="mt-5 ms-3 img-fluid product_img"
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
                      {furniture?.furnitureId?.category}
                    </div>
                  </div>
                  <div className="row">
                    <div className="col Furniture_details_text">
                      <p>Quantity:</p>
                    </div>
                    <div className="col Furniture_details_text2">
                    {furniture?.orderId?.count}
                    </div>
                  </div>
                  <div className="row">
                    <div className="col Furniture_details_text">
                      <p>Dimension :</p>
                    </div>
                    <div className="col Furniture_details_text2">
                    {furniture?.furnitureId?.dimension}
                    </div>
                  </div>
                </div>
                <div className="col mt-5">
                  <p className="Customer_text">Customer information</p>
                  <div className="row mt-4">
                    <div className="col Furniture_details_text">
                      <p>Name:</p>
                    </div>
                    <div className="col Furniture_details_text2">
                    {furniture?.customerId?.name}
                    </div>
                  </div>
                  <div className="row">
                    <div className="col Furniture_details_text">
                      <p>Email:</p>
                    </div>
                    <div className="col Furniture_details_text2">
                    {furniture?.customerId?.email}
                    </div>
                  </div>
                  <div className="row">
                    <div className="col Furniture_details_text">
                      <p>Phone number :</p>
                    </div>
                    <div className="col Furniture_details_text2">
                    {furniture?.customerId?.phone}
                    </div>
                  </div>
                  <div className="row">
                    <div className="col Furniture_details_text">
                      <p>Address :</p>
                    </div>
                    <div className="col Furniture_details_text2">
                    {furniture?.customerId?.address}
                    </div>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="assign-delv-main">
                </div>
                <div
                  className="row mt-5 col"
                  style={{ paddingLeft: "100px" }}
                >
                  <div className="col">
                    <button
                      className="Accept_bg Accept_text ri-checkbox-line"
                      type="button"
                    >
                      Approve
                    </button>
                  </div>
                  <div className="col">
                    <button
                      className="Reject_bg Reject_text ri-close-circle-line"
                    >
                      Reject
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      ))
      ):(
        <div className="viewcounsellor-lottiereqq">No request found</div>

      )}
    </div>
  )
}

export default ReturnRequest