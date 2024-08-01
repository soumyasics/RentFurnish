import React, { useEffect, useState } from 'react'
import "./Shopdashboard.css"
import customer1 from "../../Assets/deliveryicon.png";
import delivery1 from "../../Assets/orders.png";
import "../Admin/Admindashboard.css"
import Shophomenav from '../Navbar/Shophomenav';
import { useNavigate } from 'react-router-dom';
import Footer from '../Footer/Footer';
import Shopnav from '../Navbar/Shopnav';
import Showdropdown from './Shopdropdown';
import axiosInstance from '../Constants/Baseurl';

function Shopdashboard() {
  const navigate=useNavigate()
  const shopid=localStorage.getItem("shopid")
  console.log(shopid);
  const [cust,setCust]=useState([])
  const [delivery,setDelivery]=useState([])
  const [order,setOrder]=useState([])


  useEffect(()=>{
    if(shopid===null){
      navigate("/shoplogin")
    }
    axiosInstance
    .post(`viewallcust`)
    .then((res) => {
      console.log(res);
      setCust(res.data.data);
    })
    .catch((err) => {
      console.log(err);
    });
    axiosInstance
    .post(`viewDeliveryAgentbyShopid/${shopid}`)
    .then((res) => {
      console.log(res);
      setDelivery(res.data.data);
    })
    .catch((err) => {
      console.log(err);
    });
    axiosInstance
    .post(`viewOrdersByShopId/${shopid}`)
    .then((res) => {
      console.log(res);
      setOrder(res.data.data);
    })
    .catch((err) => {
      console.log(err);
    });

  
  },[])
  return (
    <>
    <div className='col-12'><Shopnav/><Showdropdown/>
          <div className="container mainclass " >
        <div className="row">
          {/* <div className="col-10 d-flex justify-content-center buttonmain">
          </div> */}
          <div className="col-10 d-flex boxmain" style={{marginLeft:"-40px"}}>
            <div className="col-sm-4 col-md-4 col-lg-4 d-flex pb-4 boxmain1 ">
              <div className="boxinside1 ">
                <div
                  className="ri-user-line"
                  style={{
                    padding: "5px",
                    color: "blue",
                    fontSize: "2rem",
                    paddingLeft: "15px",
                  }}
                />
              </div>
              <div className="boxcontent">
                <h5>{cust?.length}</h5>
                <p>Total Customers</p>
              </div>
            </div>
            <div className="col-sm-4 col-md-4 col-lg-4 pb-4  d-flex boxmain2">
              <div className="col-2 boxinside1">
                <img
                  src={customer1}
                  alt="customer"
                  style={{ borderRadius: "20px", paddingLeft: "8px" }}
                />
              </div>
              <div className="col-8 boxcontent">
                <h5>{delivery?.length}</h5>
                <p>Total Delivery Agents</p>
              </div>
            </div>
            <div className="col-sm-4 col-md-4 col-lg-4 pb-4 d-flex boxmain3">
              <div className="col-2 boxinside1">
                <img
                  src={delivery1}
                  alt="customer"
                  style={{
                    borderRadius: "20px",
                    paddingLeft: "8px",
                    paddingTop: "5px",
                  }}
                />
              </div>
              <div className="col-8 boxcontent">
                <h5>{order?.length}</h5>
                <p>Total Orders</p>
              </div>
            </div>
          </div>
          {/* margin for gap between footer and inputbox */}
          <div className='col-12' style={{margin:"100px"}}>
                
          </div>
        </div>
        </div>
</div>
    </>
  )
}

export default Shopdashboard