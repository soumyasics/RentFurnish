import React, { useEffect } from 'react'
import "./Shopdashboard.css"
import customer from "../../Assets/deliveryicon.png";
import delivery from "../../Assets/orders.png";
import "../Admin/Admindashboard.css"
import Shophomenav from '../Navbar/Shophomenav';
import { useNavigate } from 'react-router-dom';
import Footer from '../Footer/Footer';
import Shopnav from '../Navbar/Shopnav';
import Showdropdown from './Shopdropdown';

function Shopdashboard() {
  const navigate=useNavigate()
  const shopid=localStorage.getItem("shopid")
  console.log(shopid);

  useEffect(()=>{
    if(shopid===null){
      navigate("/shoplogin")
    }
  
  
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
                <h5>12</h5>
                <p>Total Customers</p>
              </div>
            </div>
            <div className="col-sm-4 col-md-4 col-lg-4 pb-4  d-flex boxmain2">
              <div className="col-2 boxinside1">
                <img
                  src={customer}
                  alt="customer"
                  style={{ borderRadius: "20px", paddingLeft: "8px" }}
                />
              </div>
              <div className="col-8 boxcontent">
                <h5>10</h5>
                <p>Total Delivery Agents</p>
              </div>
            </div>
            <div className="col-sm-4 col-md-4 col-lg-4 pb-4 d-flex boxmain3">
              <div className="col-2 boxinside1">
                <img
                  src={delivery}
                  alt="customer"
                  style={{
                    borderRadius: "20px",
                    paddingLeft: "8px",
                    paddingTop: "5px",
                  }}
                />
              </div>
              <div className="col-8 boxcontent">
                <h5>10</h5>
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